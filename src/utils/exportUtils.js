/**
 * KRAFT UNIVERSAL EXPORTER
 * 📥 High-fidelity designs to Production-ready assets.
 */

/**
 * 💿 DATA EXPORT: JSON
 * Downloads the current canvas state as a .kraft file.
 */
export const exportToJSON = (elements, projectName = 'kraft-design') => {
  const data = JSON.stringify({
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    elements
  }, null, 2);
  
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${projectName.toLowerCase().replace(/\s+/g, '-')}.kraft`;
  link.click();
  URL.revokeObjectURL(url);
};

/**
 * 🎨 IMAGE EXPORT: SVG/PNG
 * Generates high-fidelity visual representations.
 */
export const exportToImage = async (elements, format = 'png', scale = 2) => {
  // 1. Determine bounds
  if (elements.length === 0) return;
  
  const minX = Math.min(...elements.map(el => el.x));
  const minY = Math.min(...elements.map(el => el.y));
  const maxX = Math.max(...elements.map(el => el.x + el.w));
  const maxY = Math.max(...elements.map(el => el.y + el.h));
  
  const padding = 20;
  const width = (maxX - minX) + (padding * 2);
  const height = (maxY - minY) + (padding * 2);

  // 2. Create SVG String
  let svgContent = elements.map(el => {
    const rx = el.x - minX + padding;
    const ry = el.y - minY + padding;
    const rotation = el.rotation || 0;
    const fx = el.flipX ? -1 : 1;
    const fy = el.flipY ? -1 : 1;
    
    // Transform wrapper for rotation and flip
    // Note: flipping around center requires translating to center, scaling, then translating back
    const centerX = rx + el.w / 2;
    const centerY = ry + el.h / 2;
    const transform = `rotate(${rotation}, ${centerX}, ${centerY}) translate(${centerX}, ${centerY}) scale(${fx}, ${fy}) translate(${-centerX}, ${-centerY})`;

    if (el.type === 'text') {
      const textAlign = el.textAlign || 'left';
      let textAnchor = 'start';
      let tx = rx;
      
      if (textAlign === 'center') {
        textAnchor = 'middle';
        tx = rx + (el.w / 2);
      } else if (textAlign === 'right') {
        textAnchor = 'end';
        tx = rx + el.w;
      }
      
      return `
        <text 
          x="${tx}" 
          y="${ry}"
          font-family="${el.fontFamily || 'Inter'}"
          font-size="${el.fontSize || 24}"
          font-weight="${el.fontWeight || '400'}"
          fill="${el.color || '#000000'}"
          text-anchor="${textAnchor}"
          dominant-baseline="hanging"
          style="white-space: pre-wrap;"
          transform="${transform}"
        >${el.content}</text>
      `;
    }
    
    // Geometric Path for independent corner radius
    let geometricMarkup = '';
    if (el.independentRadius) {
      const { borderRadiusTL: tl = 0, borderRadiusTR: tr = 0, borderRadiusBR: br = 0, borderRadiusBL: bl = 0 } = el;
      const d = `
        M ${rx + tl},${ry} 
        L ${rx + el.w - tr},${ry} Q ${rx + el.w},${ry} ${rx + el.w},${ry + tr} 
        L ${rx + el.w},${ry + el.h - br} Q ${rx + el.w},${ry + el.h} ${rx + el.w - br},${ry + el.h}
        L ${rx + bl},${ry + el.h} Q ${rx},${ry + el.h} ${rx},${ry + el.h - bl}
        L ${rx},${ry + tl} Q ${rx},${ry} ${rx + tl},${ry}
        Z
      `;
      geometricMarkup = `<path d="${d.replace(/\s+/g, ' ')}" fill="${el.fill || '#ddd'}" opacity="${el.opacity || 1}" />`;
    } else {
      geometricMarkup = `
        <rect 
          x="${rx}" 
          y="${ry}" 
          width="${el.w}" 
          height="${el.h}" 
          fill="${el.fill || '#ddd'}" 
          rx="${el.borderRadius || 0}"
          opacity="${el.opacity || 1}"
        />`;
    }

    return `<g transform="${transform}">${geometricMarkup}</g>`;
  }).join('');

  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="transparent" />
      ${svgContent}
    </svg>
  `;

  if (format === 'svg') {
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'kraft-export.svg';
    link.click();
    URL.revokeObjectURL(url);
    return;
  }

  // 3. Convert to PNG (via Canvas)
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = width * scale;
  canvas.height = height * scale;
  ctx.scale(scale, scale);

  const img = new Image();
  const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  return new Promise((resolve) => {
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = pngUrl;
      link.download = 'kraft-export.png';
      link.click();
      URL.revokeObjectURL(url);
      resolve();
    };
    img.src = url;
  });
};

/**
 * ⚡ WEB EXPORT: STANDALONE HTML/CSS
 * Transforms the canvas into a production-ready single-file website.
 */
export const exportToHTML = (pages, projectName = 'kraft-design') => {
  if (!pages || pages.length === 0) return;

  // 1. Identify used fonts for Google Fonts injection
  const fonts = new Set(['Inter']); // Default
  pages.forEach(page => {
    page.elements.forEach(el => {
      if (el.fontFamily) fonts.add(el.fontFamily);
    });
  });
  const fontLink = Array.from(fonts).map(f => `family=${f.replace(/\s+/g, '+')}:wght@400;500;700;900`).join('&');

  // 2. Map elements to HTML/CSS by page
  const pagesHTML = pages.map((page, index) => {
    const htmlItems = page.elements.map(el => {
      const isText = el.type === 'text';
      const isInteractive = el.action?.type === 'navigate';
      
      // Core Positioning & Sizing
      let baseStyles = `
        position: absolute;
        left: ${el.x}px;
        top: ${el.y}px;
        width: ${el.w}px;
        height: ${el.h}px;
        opacity: ${el.opacity || 1};
        transform: rotate(${el.rotation || 0}deg) scale(${el.flipX ? -1 : 1}, ${el.flipY ? -1 : 1});
        z-index: ${page.elements.indexOf(el)};
        ${isInteractive ? 'cursor: pointer; transition: transform 0.2s;' : ''}
      `;

      // Decoration Styles
      if (!isText) {
        baseStyles += `background: ${el.fill || '#ddd'};`;
        if (el.independentRadius) {
          baseStyles += `border-radius: ${el.borderRadiusTL || 0}px ${el.borderRadiusTR || 0}px ${el.borderRadiusBR || 0}px ${el.borderRadiusBL || 0}px;`;
        } else {
          baseStyles += `border-radius: ${el.borderRadius || 0}px;`;
        }
      }

      // Border & Shadow
      if (el.strokeWidth) {
        baseStyles += `border: ${el.strokeWidth}px ${el.strokeStyle || 'solid'} ${el.strokeColor || '#000'};`;
      }
      if (el.shadowEnabled) {
        baseStyles += `box-shadow: ${el.shadowOffsetX || 0}px ${el.shadowOffsetY || 4}px ${el.shadowBlur || 10}px ${el.shadowColor || 'rgba(0,0,0,0.15)'};`;
      }

      // Typography
      if (isText) {
        baseStyles += `
          font-family: '${el.fontFamily || 'Inter'}', sans-serif;
          font-size: ${el.fontSize}px;
          font-weight: ${el.fontWeight};
          color: ${el.color || '#000'};
          text-align: ${el.textAlign || 'left'};
          line-height: ${el.lineHeight || 1.5};
          white-space: pre-wrap;
          display: flex;
          align-items: center;
          justify-content: ${el.textAlign === 'center' ? 'center' : (el.textAlign === 'right' ? 'flex-end' : 'flex-start')};
        `;
      }

      const onClickAttr = isInteractive ? `onclick="navigateTo('${el.action.targetPageId}')"` : '';
      const hoverAttr = isInteractive ? `onmouseover="this.style.transform='rotate(${el.rotation || 0}deg) scale(${el.flipX ? -1 : 1}, ${el.flipY ? -1 : 1}) scale(1.02)'" onmouseout="this.style.transform='rotate(${el.rotation || 0}deg) scale(${el.flipX ? -1 : 1}, ${el.flipY ? -1 : 1})'"` : '';

      return `<div style="${baseStyles.replace(/\s+/g, ' ')}" ${onClickAttr} ${hoverAttr}>${isText ? el.content : ''}</div>`;
    }).join('\n      ');

    return `
    <div id="page-${page.id}" class="artboard" style="display: ${index === 0 ? 'block' : 'none'};">
      ${htmlItems}
    </div>`;
  }).join('\n');

  // 3. Assemble full document
  const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?${fontLink}&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          background-color: #f5f5f7; 
          display: flex; 
          justify-content: center; 
          align-items: flex-start;
          padding: 80px 20px;
          min-height: 100vh;
        }
        .artboard {
          position: relative;
          background-color: white;
          width: 1000px;
          height: 700px;
          box-shadow: 0 40px 100px rgba(0,0,0,0.1);
          overflow: hidden;
          flex-shrink: 0;
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        /* Small screen handling */
        @media (max-width: 1040px) {
          body { padding: 40px 10px; }
          .artboard { transform: scale(0.85); transform-origin: top center; }
        }
        @media (max-width: 800px) {
          .artboard { transform: scale(0.6); }
        }
        @media (max-width: 500px) {
          .artboard { transform: scale(0.35); }
        }
    </style>
</head>
<body>
    ${pagesHTML}
    
    <script>
      function navigateTo(targetPageId) {
        document.querySelectorAll('.artboard').forEach(el => {
          el.style.display = 'none';
        });
        const target = document.getElementById('page-' + targetPageId);
        if (target) {
          target.style.display = 'block';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    </script>
</body>
</html>
  `.trim();

  // 4. Trigger Download
  const blob = new Blob([fullHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${projectName.toLowerCase().replace(/\s+/g, '-')}.html`;
  link.click();
  URL.revokeObjectURL(url);
};

export const convertToReact = (elements) => {
  if (elements.length === 0) return '/* No elements selected */';

  const minX = Math.min(...elements.map(el => el.x));
  const minY = Math.min(...elements.map(el => el.y));

  const jsxElements = elements.map(el => {
    const x = el.x - minX;
    const y = el.y - minY;
    
    // Simple property mapping
    const styles = [
      `position: 'absolute'`,
      `left: '${x}px'`,
      `top: '${y}px'`,
      `width: '${el.w}px'`,
      `height: '${el.h}px'`,
      el.borderRadius ? `borderRadius: '${el.borderRadius}px'` : null,
      el.opacity !== 1 ? `opacity: ${el.opacity}` : null,
      el.type === 'rectangle' ? `backgroundColor: '${el.fill}'` : null,
    ].filter(Boolean).join(', ');

    if (el.type === 'text') {
      const textStyles = [
        ...styles.split(', '),
        `fontSize: '${el.fontSize}px'`,
        `fontWeight: '${el.fontWeight}'`,
        `color: '${el.color || '#000'}'`,
        `fontFamily: '${el.fontFamily || 'Inter'}'`,
        `textAlign: '${el.textAlign || 'left'}'`,
      ].join(', ');

      return `      <div style={{ ${textStyles} }}>\n        ${el.content}\n      </div>`;
    }

    return `      <div style={{ ${styles} }} />`;
  }).join('\n');

  return `
import React from 'react';

const KraftComponent = () => {
  return (
    <div className="relative w-full h-full min-h-[500px]">
${jsxElements}
    </div>
  );
};

export default KraftComponent;
  `.trim();
};
