import React, { useEffect } from 'react';
import useEditorStore from '../../store/useEditorStore';

/**
 * FontLoader
 * Detects all unique font families used in the current project's elements
 * and dynamically injects Google Fonts <link> tags into the document head.
 */
const FontLoader = () => {
  const pages = useEditorStore(state => state.pages);

  useEffect(() => {
    // 1. Collect all unique font families from elements AND projectFonts
    const uniqueFonts = new Set();
    const projectFonts = useEditorStore.getState().projectFonts || [];
    
    projectFonts.forEach(font => uniqueFonts.add(font));

    (pages || []).forEach(page => {
      (page?.elements || []).forEach(el => {
        if (el?.type === 'text' && typeof el?.fontFamily === 'string') {
          uniqueFonts.add(el.fontFamily);
        }
      });
    });

    // 2. Add 'Inter' as a default if not present
    uniqueFonts.add('Inter');

    if (uniqueFonts.size === 0) return;

    // 3. Create the Google Fonts URL
    const fontFamilies = Array.from(uniqueFonts)
      .filter(font => typeof font === 'string' && font.length > 0)
      .map(font => {
        const formattedName = font.replace(/\s+/g, '+');
        return `family=${formattedName}:wght@400;500;600;700;800;900`;
      }).join('&');

    const fontsUrl = `https://fonts.googleapis.com/css2?${fontFamilies}&display=swap`;

    // 4. Inject or update the link tag
    let linkTag = document.getElementById('dynamic-google-fonts');
    
    if (!linkTag) {
      linkTag = document.createElement('link');
      linkTag.id = 'dynamic-google-fonts';
      linkTag.rel = 'stylesheet';
      document.head.appendChild(linkTag);
    }

    if (linkTag.href !== fontsUrl) {
      linkTag.href = fontsUrl;
    }

    // Cleanup isn't strictly necessary as we want the fonts to stay if they are still needed,
    // and the useEffect will re-run and update the href if they change.
  }, [pages]);

  return null; // This component doesn't render anything UI-wise
};

export default FontLoader;
