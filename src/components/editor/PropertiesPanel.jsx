import React, { useState } from 'react';
import useEditorStore from '../../store/useEditorStore';
import { SlidersHorizontal, ChevronDown, ChevronRight, AlignLeft, AlignCenter, AlignRight, Type, Square, Lock, Unlock, Hash, LayoutList } from 'lucide-react';
import { THEMES } from '../../utils/themes';

const Section = ({ title, children, defaultOpen = true, theme, isLight }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className={`border-b ${theme.border} last:border-0`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between py-4 px-4 hover:${isLight ? 'bg-gray-100' : 'bg-white/5'} transition-all`}
      >
        <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme.title}`}>{title}</span>
        {isOpen ? <ChevronDown size={14} className={theme.title} /> : <ChevronRight size={14} className={theme.title} />}
      </button>
      {isOpen && <div className="px-5 pb-5 space-y-5">{children}</div>}
    </div>
  );
};

const PropertiesPanel = () => {
  const { elements, selectedElementIds, updateElement, uiTheme } = useEditorStore();
  const theme = THEMES[uiTheme];
  const isLight = uiTheme === 'light' || uiTheme === 'gray';
  
  const selectedElement = elements.find(el => el.id === selectedElementIds[0]);

  if (!selectedElement) {
    return (
      <div className={`w-[320px] ${theme.sidebar} border-l ${theme.border} flex flex-col h-full shrink-0 justify-center items-center text-center p-8 transition-colors duration-500`}>
        <div className={`w-16 h-16 rounded-3xl ${isLight ? 'bg-gray-200' : 'bg-white/5'} flex items-center justify-center mb-6`}>
          <SlidersHorizontal size={24} className={theme.title} />
        </div>
        <h3 className={`${isLight ? 'text-gray-900' : 'text-white/80'} font-bold mb-2 uppercase tracking-widest text-[13px]`}>Inspector</h3>
        <p className={`text-[11px] ${isLight ? 'text-gray-500' : 'text-gray-500'} leading-relaxed max-w-[180px]`}>Select an element to view and manipulate its properties.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    let { name, value, type, checked } = e.target;
    let parsedValue = value;
    if (type === 'checkbox') parsedValue = checked;
    else if (type === 'number' || type === 'range') {
      parsedValue = parseFloat(value);
      if (isNaN(parsedValue)) return;
    }
    let updates = { [name]: parsedValue };
    if (selectedElement.aspectRatioLocked) {
      const ratio = selectedElement.w / selectedElement.h;
      if (name === 'w') updates.h = parsedValue / ratio;
      if (name === 'h') updates.w = parsedValue * ratio;
    }
    updateElement(selectedElement.id, updates);
  };

  const InputBox = ({ label, name, value, onChange, type = "number", suffix = "" }) => (
    <div className={`flex ${isLight ? 'bg-white border-gray-200' : 'bg-white/5 border-white/5'} border focus-within:border-blue-500 rounded-xl overflow-hidden group transition-all`}>
      <span className={`text-[10px] uppercase font-black ${isLight ? 'text-gray-400 bg-gray-50' : 'text-white/30 bg-white/[0.02]'} w-8 flex items-center justify-center select-none border-r ${theme.border}`}>{label}</span>
      <input 
        type={type} 
        name={name} 
        value={value} 
        onChange={onChange}
        className={`w-full text-[12px] bg-transparent p-2.5 outline-none font-bold placeholder-gray-600 ${isLight ? 'text-gray-900' : 'text-white'}`} 
      />
      {suffix && <span className={`text-[10px] pr-2 flex items-center ${theme.title}`}>{suffix}</span>}
    </div>
  );

  return (
    <div className={`w-[320px] ${theme.sidebar} border-l ${theme.border} flex flex-col h-full shrink-0 relative z-10 transition-colors duration-500`}>
      <div className={`h-14 border-b ${theme.border} flex items-center px-4 justify-between ${isLight ? 'bg-gray-50' : 'bg-black/20'} shrink-0`}>
        <div className="flex items-center">
            <Hash size={15} className="mr-2 text-blue-500" strokeWidth={3} />
            <span className={`font-editorial font-black text-[14px] uppercase tracking-widest ${isLight ? 'text-gray-900' : 'text-white/90'}`}>Inspector</span>
        </div>
        <div className="flex items-center space-x-1">
            <div className={`p-1 rounded ${isLight ? 'bg-gray-200 text-gray-400' : 'bg-white/5 text-white/40'}`}><ChevronDown size={12} /></div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-transparent">
        
        {/* LAYOUT */}
        <Section title="Layout & Pos" theme={theme} isLight={isLight}>
          <div className="grid grid-cols-2 gap-3 relative">
            <InputBox label="X" name="x" value={Math.round(selectedElement.x)} onChange={handleChange} />
            <InputBox label="Y" name="y" value={Math.round(selectedElement.y)} onChange={handleChange} />
            <InputBox label="W" name="w" value={Math.round(selectedElement.w)} onChange={handleChange} />
            <InputBox label="H" name="h" value={Math.round(selectedElement.h)} onChange={handleChange} />
            
            <button 
              className={`absolute top-[48px] left-[calc(50%-12px)] z-20 w-6 h-6 rounded-full flex items-center justify-center border transition-all ${selectedElement.aspectRatioLocked ? 'bg-blue-600 border-blue-400 text-white shadow-lg' : (isLight ? 'bg-white border-gray-200 text-gray-400' : 'bg-[#1a1a1a] border-white/10 text-white/30 hover:text-white/60')}`}
              onClick={() => updateElement(selectedElement.id, { aspectRatioLocked: !selectedElement.aspectRatioLocked })}
            >
              <LayoutList size={10} />
            </button>
            
            <div className="col-span-2">
                <InputBox label="R" name="rotation" value={Math.round(selectedElement.rotation || 0)} onChange={handleChange} suffix="°" />
            </div>
          </div>
        </Section>

        {/* APPEARANCE */}
        <Section title="Appearance" theme={theme} isLight={isLight}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-bold uppercase tracking-widest ${theme.title}`}>Base Color</span>
              <div className={`flex items-center space-x-2 ${isLight ? 'bg-white border-gray-200 shadow-sm' : 'bg-white/5 border-white/5'} border p-1 rounded-xl`}>
                 <input type="color" name="fill" value={selectedElement.fill === 'transparent' ? '#ffffff' : selectedElement.fill} onChange={handleChange} className="w-6 h-6 rounded-lg cursor-pointer bg-transparent border-none p-0" />
                 <span className={`text-[11px] font-mono pr-2 uppercase ${isLight ? 'text-gray-900' : 'text-white/80'}`}>{selectedElement.fill}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-bold uppercase tracking-widest ${theme.title}`}>Opacity</span>
                <span className="text-[11px] font-mono text-blue-500 font-bold">{Math.round((selectedElement.opacity ?? 1) * 100)}%</span>
              </div>
              <input type="range" name="opacity" min="0" max="1" step="0.01" value={selectedElement.opacity ?? 1} onChange={handleChange} className={`w-full accent-blue-600 h-1 ${isLight ? 'bg-gray-200' : 'bg-white/5'} rounded-full appearance-none cursor-pointer`} />
            </div>

            <InputBox label="R" name="borderRadius" value={selectedElement.borderRadius || 0} onChange={handleChange} suffix="PX" />
          </div>
        </Section>

        {/* STROKE */}
        <Section title="Stroke / Borders" defaultOpen={false} theme={theme} isLight={isLight}>
          <div className="space-y-4">
            <div className="grid grid-cols-[1fr_80px] gap-3">
              <div className={`flex items-center ${isLight ? 'bg-white border-gray-200 shadow-sm' : 'bg-white/5 border-white/5'} border p-1 rounded-xl`}>
                 <input type="color" name="strokeColor" value={selectedElement.strokeColor || '#000000'} onChange={handleChange} className="w-6 h-6 rounded-lg cursor-pointer bg-transparent border-none p-0" />
                 <span className={`text-[11px] font-mono px-2 uppercase truncate ${isLight ? 'text-gray-900' : 'text-white/80'}`}>{selectedElement.strokeColor}</span>
              </div>
              <InputBox label="S" name="strokeWidth" value={selectedElement.strokeWidth || 0} onChange={handleChange} />
            </div>
            
            <div className={`flex ${isLight ? 'bg-gray-100' : 'bg-white/5'} p-1 rounded-xl`}>
              {['solid', 'dashed'].map(style => (
                <button 
                  key={style}
                  onClick={() => updateElement(selectedElement.id, { strokeStyle: style })}
                  className={`flex-1 py-1.5 text-[10px] uppercase font-black tracking-widest transition-all rounded-lg ${selectedElement.strokeStyle === style ? 'bg-blue-600 text-white shadow-lg' : `${theme.title} hover:text-white hover:bg-white/5`}`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </Section>

        {/* SHADOW */}
        <Section title="Effects / Shadow" defaultOpen={false} theme={theme} isLight={isLight}>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-bold uppercase tracking-widest ${theme.title}`}>Enable Shadow</span>
                <button 
                  onClick={() => updateElement(selectedElement.id, { shadowEnabled: !selectedElement.shadowEnabled })}
                  className={`w-10 h-5 rounded-full relative transition-all ${selectedElement.shadowEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${selectedElement.shadowEnabled ? 'right-1' : 'left-1'}`} />
                </button>
              </div>

              {selectedElement.shadowEnabled && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-2 gap-3">
                    <InputBox label="X" name="shadowOffsetX" value={selectedElement.shadowOffsetX} onChange={handleChange} />
                    <InputBox label="Y" name="shadowOffsetY" value={selectedElement.shadowOffsetY} onChange={handleChange} />
                    <InputBox label="B" name="shadowBlur" value={selectedElement.shadowBlur} onChange={handleChange} />
                    <div className={`flex items-center ${isLight ? 'bg-white border-gray-200 shadow-sm' : 'bg-white/5 border-white/5'} border p-1 rounded-xl`}>
                      <input type="color" name="shadowColor" value={selectedElement.shadowColor?.startsWith('rgba') ? '#000000' : selectedElement.shadowColor} onChange={handleChange} className="w-6 h-6 rounded-lg cursor-pointer bg-transparent border-none p-0" />
                      <span className={`text-[11px] font-mono px-2 uppercase truncate ${isLight ? 'text-gray-900' : 'text-white/80'}`}>Color</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
        </Section>

        {/* TYPOGRAPHY */}
        {selectedElement.type === 'text' && (
          <Section title="Text & Type" theme={theme} isLight={isLight}>
            <div className="space-y-5">
              <select 
                name="fontFamily"
                value={selectedElement.fontFamily || 'Inter'}
                onChange={handleChange}
                className={`w-full text-xs font-bold border rounded-xl px-3 py-2.5 outline-none cursor-pointer transition-colors appearance-none ${isLight ? 'bg-white border-gray-200 text-gray-900 shadow-sm' : 'bg-white/5 border-white/5 text-white/90 hover:bg-white/10'}`}
              >
                {[
                  "Inter", "Satoshi", "Clash Display", "Cabinet Grotesk", "Space Grotesk", "Urbanist", "General Sans", "Syne", "Epilogue"
                ].sort().map(font => <option key={font} value={font} className={isLight ? 'bg-white' : 'bg-[#0c0c0c]'}>{font}</option>)}
              </select>

              <div className="grid grid-cols-[1fr_80px] gap-3">
                <select name="fontWeight" value={selectedElement.fontWeight || '400'} onChange={handleChange} className={`w-full text-xs font-bold border rounded-xl px-3 py-2.5 outline-none cursor-pointer transition-colors appearance-none ${isLight ? 'bg-white border-gray-200 text-gray-900 shadow-sm' : 'bg-white/5 border-white/5 text-white/90 hover:bg-white/10'}`}>
                  <option value="400" className={isLight ? 'bg-white' : 'bg-[#0c0c0c]'}>Regular</option>
                  <option value="500" className={isLight ? 'bg-white' : 'bg-[#0c0c0c]'}>Medium</option>
                  <option value="700" className={isLight ? 'bg-white' : 'bg-[#0c0c0c]'}>Bold</option>
                  <option value="900" className={isLight ? 'bg-white' : 'bg-[#0c0c0c]'}>Black</option>
                </select>
                <InputBox label="S" name="fontSize" value={selectedElement.fontSize || 24} onChange={handleChange} />
              </div>
              
              <div className={`flex items-center justify-between border rounded-xl overflow-hidden p-1 ${isLight ? 'bg-gray-100 border-gray-200' : 'bg-white/5 border-white/5'}`}>
                {['left', 'center', 'right'].map(align => (
                  <button 
                    key={align}
                    onClick={() => updateElement(selectedElement.id, { textAlign: align })}
                    className={`flex-1 py-2 flex justify-center transition-all rounded-lg ${selectedElement.textAlign === align ? (isLight ? 'bg-white text-blue-600 shadow-md ring-1 ring-gray-200' : 'bg-white/10 text-blue-500 shadow-md ring-1 ring-white/10') : theme.title}`}
                  >
                    {align === 'left' && <AlignLeft size={14} />}
                    {align === 'center' && <AlignCenter size={14} />}
                    {align === 'right' && <AlignRight size={14} />}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                 <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-1 ${theme.title}`}>Raw Content</span>
                 <textarea 
                  name="content"
                  value={selectedElement.content || ''}
                  onChange={handleChange}
                  className={`w-full text-[12px] font-medium border rounded-xl p-3 outline-none min-h-[100px] transition-all ${isLight ? 'bg-white border-gray-200 text-gray-900 shadow-sm' : 'bg-white/5 border-white/5 text-white/80 focus:bg-white/10'}`}
                  placeholder="Enter text..."
                />
              </div>
            </div>
          </Section>
        )}
      </div>
    </div>
  );
};

export default PropertiesPanel;
