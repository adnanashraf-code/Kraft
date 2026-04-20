import React, { useState } from 'react';
import useEditorStore from '../../store/useEditorStore';
import { Plus, Eye, EyeOff, Trash2, SlidersHorizontal, ChevronDown, ChevronRight, AlignLeft, AlignCenter, AlignRight, Type, Square, Lock, Unlock, Hash, LayoutList, FlipHorizontal, FlipVertical, RotateCw, LayoutGrid, Zap, Box } from 'lucide-react';
import { THEMES } from '../../utils/themes';

const Section = ({ title, children, defaultOpen = true, theme, isLight }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b-2 border-black last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between py-4 px-4 transition-all ${isLight ? 'hover:bg-gray-50' : 'hover:bg-white/5'}`}
      >
        <span className="text-[12px] font-black uppercase tracking-[0.3em] font-editorial text-black">{title}</span>
        {isOpen ? <ChevronDown size={14} strokeWidth={3} /> : <ChevronRight size={14} strokeWidth={3} />}
      </button>
      {isOpen && <div className="px-5 pb-5 space-y-5 animate-in fade-in slide-in-from-top-1 duration-200">{children}</div>}
    </div>
  );
};

const ArtboardProperties = ({ theme, isLight, activePage }) => {
  const { updatePage } = useEditorStore();
  
  const addGrid = () => {
    const newGrids = [...(activePage.layoutGrids || []), { id: Date.now().toString(), type: 'columns', count: 12, gutter: 20, margin: 0, color: 'rgba(255, 0, 0, 0.1)', visible: true }];
    updatePage(activePage.id, { layoutGrids: newGrids });
  };

  const updateGrid = (id, updates) => {
    const newGrids = (activePage.layoutGrids || []).map(g => g.id === id ? { ...g, ...updates } : g);
    updatePage(activePage.id, { layoutGrids: newGrids });
  };

  const removeGrid = (id) => {
    const newGrids = (activePage.layoutGrids || []).filter(g => g.id !== id);
    updatePage(activePage.id, { layoutGrids: newGrids });
  };

  const InputBoxMinimal = ({ label, value, onChange, type = "number" }) => (
    <div className={`flex items-center space-x-2 w-full`}>
      <span className={`text-[10px] uppercase font-bold ${isLight ? 'text-gray-400' : 'text-white/40'} w-10 shrink-0`}>{label}</span>
      <input 
        type={type} 
        value={value} 
        onChange={onChange}
        className={`w-full text-[11px] p-1.5 rounded outline-none font-bold border transition-all ${isLight ? 'bg-gray-100 text-gray-900 border-transparent focus:border-blue-500' : 'bg-black/40 text-white border-white/10 focus:border-blue-500 hover:bg-black/60'} `} 
      />
    </div>
  );

  return (
    <div className={`w-[320px] bg-white border-l-2 border-black flex flex-col h-full shrink-0 relative z-10`}>
      <div className="h-16 border-b-2 border-black flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center">
            <LayoutGrid size={16} className="mr-2 text-black" strokeWidth={3} />
            <span className="font-editorial font-black text-[15px] uppercase tracking-widest text-black">Artboard Setup</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-5 border-b-2 border-black bg-gray-50/50">
            <h3 className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-40">Active Arena</h3>
            <p className="text-[14px] font-black uppercase tracking-tight text-black">{activePage.name}</p>
        </div>

        {/* LAYOUT GRIDS SECTION */}
        <div className="border-b-2 border-black last:border-0">
          <div className="flex items-center justify-between p-5">
            <span className="text-[12px] font-black uppercase tracking-[0.3em] font-editorial text-black">Layout Grids</span>
            <button 
              onClick={addGrid} 
              className="p-1.5 rounded-none border-2 border-black bg-white hover:bg-yellow-400 transition-colors neo-shadow-xs"
            >
              <Plus size={14} strokeWidth={3} />
            </button>
          </div>
          
          <div className="px-5 pb-5 space-y-4">
            {!(activePage.layoutGrids?.length > 0) && (
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-30">No active grid architecture.</p>
            )}
            
            {(activePage.layoutGrids || []).map((grid, idx) => (
              <div key={grid.id} className="p-4 rounded-none border-2 border-black bg-white space-y-4 neo-shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <select 
                    value={grid.type} 
                    onChange={(e) => updateGrid(grid.id, { type: e.target.value })}
                    className="text-[10px] font-black uppercase tracking-widest rounded-none border-2 border-black px-2 py-1 outline-none cursor-pointer bg-white"
                  >
                    <option value="columns">Columns</option>
                    <option value="rows">Rows</option>
                  </select>

                  <div className="flex items-center space-x-1">
                     <button onClick={() => updateGrid(grid.id, { visible: !grid.visible })} className="p-1.5 hover:bg-gray-100 transition-colors">
                        {grid.visible ? <Eye size={12} strokeWidth={3} /> : <EyeOff size={12} strokeWidth={3} />}
                     </button>
                     <button onClick={() => removeGrid(grid.id)} className="p-1.5 text-red-500 hover:bg-red-50 transition-colors">
                        <Trash2 size={12} strokeWidth={3} />
                     </button>
                  </div>
                </div>

                <InputBoxMinimal label="Count" value={grid.count} onChange={(e) => updateGrid(grid.id, { count: parseInt(e.target.value) || 1 })} />
                <InputBoxMinimal label="Gutter" value={grid.gutter} onChange={(e) => updateGrid(grid.id, { gutter: parseInt(e.target.value) || 0 })} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PropertiesPanel = () => {
  const { 
    pages, activePageId, selectedElementIds, updateElement, updateElements, 
    uiTheme, rotate90, flipElement, alignElements, distributeElements, createComponent 
  } = useEditorStore();
  const theme = THEMES[uiTheme];
  const isLight = uiTheme === 'light' || uiTheme === 'gray';
  
  const activePage = pages.find(p => p.id === activePageId) || pages[0];
  const elements = activePage.elements;
  const selectedElement = elements.find(el => el.id === selectedElementIds[0]);

  if (!selectedElement) {
    return <ArtboardProperties theme={theme} isLight={isLight} activePage={activePage} />;
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
    updateElements(selectedElementIds, updates);
  };

  const InputBox = ({ label, name, value, onChange, type = "number", suffix = "" }) => (
    <div className={`flex border-2 border-black focus-within:bg-yellow-50 focus-within:border-black rounded-none overflow-hidden group transition-all neo-shadow-xs`}>
      <span className="text-[10px] uppercase font-black text-black w-8 flex items-center justify-center select-none border-r-2 border-black bg-gray-50 font-editorial">{label}</span>
      <input 
        type={type} 
        name={name} 
        value={value} 
        onChange={onChange}
        className="w-full text-[12px] bg-transparent p-2.5 outline-none font-black uppercase tracking-tight text-black" 
      />
      {suffix && <span className="text-[10px] pr-2 flex items-center font-black uppercase tracking-tighter opacity-40">{suffix}</span>}
    </div>
  );

  const AlignButton = ({ onClick, icon: Icon, title }) => (
    <button 
      onClick={onClick}
      className="p-2.5 rounded-none border-2 border-black bg-white hover:bg-yellow-400 transition-all hover:-translate-y-0.5 hover:neo-shadow-xs text-black"
      title={title}
    >
      <Icon size={16} strokeWidth={3} />
    </button>
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
        
        {/* ALIGNMENT */}
        <div className={`p-4 border-b ${theme.border}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-0.5">
              <AlignButton icon={AlignLeft} title="Align Left" onClick={() => alignElements('left')} />
              <AlignButton icon={AlignCenter} title="Align Horizontal Center" onClick={() => alignElements('centerX')} />
              <AlignButton icon={AlignRight} title="Align Right" onClick={() => alignElements('right')} />
            </div>
            <div className="w-px h-4 bg-gray-200 mx-1 opacity-50" />
            <div className="flex items-center space-x-0.5">
              <AlignButton icon={LayoutList} title="Align Top" onClick={() => alignElements('top')} />
              <AlignButton icon={LayoutList} title="Align Vertical Center" onClick={() => alignElements('centerY')} />
              <AlignButton icon={LayoutList} title="Align Bottom" onClick={() => alignElements('bottom')} />
            </div>
            <div className="w-px h-4 bg-gray-200 mx-1 opacity-50" />
            <div className="flex items-center space-x-0.5">
              <AlignButton icon={SlidersHorizontal} title="Distribute Horizontal" onClick={() => distributeElements('horizontal')} />
              <AlignButton icon={SlidersHorizontal} title="Distribute Vertical" onClick={() => distributeElements('vertical')} />
            </div>
          </div>
        </div>

        {/* LAYOUT */}
        <Section title="Geometry" theme={theme} isLight={isLight}>
          <div className="grid grid-cols-2 gap-4 relative">
            <InputBox label="X" name="x" value={Math.round(selectedElement.x)} onChange={handleChange} />
            <InputBox label="Y" name="y" value={Math.round(selectedElement.y)} onChange={handleChange} />
            <InputBox label="W" name="w" value={Math.round(selectedElement.w)} onChange={handleChange} />
            <InputBox label="H" name="h" value={Math.round(selectedElement.h)} onChange={handleChange} />
            
            <button 
              className={`absolute top-[48px] left-[calc(50%-12px)] z-20 w-8 h-8 rounded-none border-2 border-black flex items-center justify-center transition-all ${selectedElement.aspectRatioLocked ? 'bg-black text-white shadow-md' : 'bg-white text-black hover:bg-gray-100'}`}
              onClick={() => updateElements(selectedElementIds, { aspectRatioLocked: !selectedElement.aspectRatioLocked })}
            >
              <LayoutList size={12} strokeWidth={3} />
            </button>
            
            <div className="col-span-2">
                <InputBox label="R" name="rotation" value={Math.round(selectedElement.rotation || 0)} onChange={handleChange} suffix="DEG" />
            </div>

            {/* TRANSFORM BUTTONS */}
            <div className="col-span-2 grid grid-cols-3 gap-2">
              <button 
                onClick={() => flipElement(selectedElementIds, 'x')}
                className={`py-2 flex justify-center border-2 border-black transition-all ${selectedElement.flipX ? 'bg-yellow-400 text-black shadow-md' : 'bg-white hover:bg-gray-50'}`}
                title="Flip Horizontal"
              >
                <FlipHorizontal size={14} strokeWidth={3} />
              </button>
              <button 
                onClick={() => flipElement(selectedElementIds, 'y')}
                className={`py-2 flex justify-center border-2 border-black transition-all ${selectedElement.flipY ? 'bg-yellow-400 text-black shadow-md' : 'bg-white hover:bg-gray-50'}`}
                title="Flip Vertical"
              >
                <FlipVertical size={14} strokeWidth={3} />
              </button>
              <button 
                onClick={() => rotate90(selectedElementIds)}
                className="py-2 flex justify-center border-2 border-black bg-white hover:bg-yellow-400 transition-all hover:neo-shadow-xs"
                title="Rotate 90°"
              >
                <RotateCw size={14} strokeWidth={3} />
              </button>
            </div>
          </div>
        </Section>

        {/* APPEARANCE */}
        <Section title="Appearance" theme={theme} isLight={isLight}>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-widest text-black/50">Intensity</span>
                <span className="text-[12px] font-black font-editorial text-black">{Math.round((selectedElement.opacity ?? 1) * 100)}%</span>
              </div>
              <input type="range" name="opacity" min="0" max="1" step="0.01" value={selectedElement.opacity ?? 1} onChange={handleChange} className="w-full accent-black h-2 bg-gray-200 rounded-none appearance-none cursor-pointer" />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-widest text-black/50">Aesthetic Fill</span>
              <div className="flex items-center space-x-3 bg-white border-2 border-black p-1.5 rounded-none neo-shadow-xs">
                 <input type="color" name="fill" value={selectedElement.fill === 'transparent' ? '#ffffff' : selectedElement.fill} onChange={handleChange} className="w-8 h-8 rounded-none cursor-pointer bg-transparent border-none p-0" />
                 <span className="text-[12px] font-black font-editorial uppercase pr-2 text-black">{selectedElement.fill}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-bold uppercase tracking-widest ${theme.title}`}>Corner Radius</span>
                <button 
                  onClick={() => updateElements(selectedElementIds, { independentRadius: !selectedElement.independentRadius })}
                  className={`p-1.5 rounded-lg transition-all ${selectedElement.independentRadius ? 'bg-blue-600 text-white shadow-md' : (isLight ? 'text-gray-400 hover:bg-gray-100' : 'text-white/30 hover:bg-white/10')}`}
                  title="Independent Corners"
                >
                  <LayoutGrid size={12} />
                </button>
              </div>

              {!selectedElement.independentRadius ? (
                <InputBox label="R" name="borderRadius" value={selectedElement.borderRadius || 0} onChange={handleChange} suffix="PX" />
              ) : (
                <div className="grid grid-cols-2 gap-2 animate-in fade-in zoom-in-95 duration-200">
                  <InputBox label="TL" name="borderRadiusTL" value={selectedElement.borderRadiusTL || 0} onChange={handleChange} />
                  <InputBox label="TR" name="borderRadiusTR" value={selectedElement.borderRadiusTR || 0} onChange={handleChange} />
                  <InputBox label="BR" name="borderRadiusBR" value={selectedElement.borderRadiusBR || 0} onChange={handleChange} />
                  <InputBox label="BL" name="borderRadiusBL" value={selectedElement.borderRadiusBL || 0} onChange={handleChange} />
                </div>
              )}
            </div>
          </div>
        </Section>

        {/* STROKE */}
        <Section title="Tactile Borders" defaultOpen={false} theme={theme} isLight={isLight}>
          <div className="space-y-5">
            <div className="grid grid-cols-[1fr_80px] gap-3">
              <div className="flex items-center bg-white border-2 border-black p-1.5 rounded-none neo-shadow-xs">
                <input type="color" name="strokeColor" value={selectedElement.strokeColor || '#000000'} onChange={handleChange} className="w-8 h-8 rounded-none cursor-pointer bg-transparent border-none p-0" />
                <span className="text-[11px] font-black px-2 uppercase truncate font-editorial">{selectedElement.strokeColor}</span>
              </div>
              <InputBox label="W" name="strokeWidth" value={selectedElement.strokeWidth || 0} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-bold uppercase tracking-widest ${theme.title}`}>Weight</span>
                <span className="text-[11px] font-mono text-blue-500 font-bold">{selectedElement.strokeWidth || 0}px</span>
              </div>
              <input type="range" name="strokeWidth" min="0" max="20" step="1" value={selectedElement.strokeWidth || 0} onChange={handleChange} className={`w-full accent-blue-600 h-1 ${isLight ? 'bg-gray-200' : 'bg-white/5'} rounded-full appearance-none cursor-pointer`} />
            </div>
            
            <div className="flex border-2 border-black overflow-hidden bg-gray-50">
              {['solid', 'dashed'].map(style => (
                <button 
                  key={style}
                  onClick={() => updateElements(selectedElementIds, { strokeStyle: style })}
                  className={`flex-1 py-2 text-[11px] uppercase font-black tracking-widest transition-all 
                    ${selectedElement.strokeStyle === style 
                      ? 'bg-black text-white' 
                      : 'text-black/40 hover:bg-black/5 hover:text-black'}`}
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
                  onClick={() => updateElements(selectedElementIds, { shadowEnabled: !selectedElement.shadowEnabled })}
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
          <Section title="Typography" theme={theme} isLight={isLight}>
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-black/50">Font Family</span>
                <select 
                  name="fontFamily"
                  value={selectedElement.fontFamily || 'Inter'}
                  onChange={handleChange}
                  className="w-full text-[12px] font-black uppercase border-2 border-black px-4 py-3 outline-none cursor-pointer bg-white neo-shadow-xs appearance-none font-editorial"
                >
                  {[
                    "Inter", "Satoshi", "Clash Display", "Cabinet Grotesk", "Space Grotesk", "Urbanist", "General Sans", "Syne", "Epilogue"
                  ].sort().map(font => <option key={font} value={font} className="bg-white">{font}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-[1fr_80px] gap-3">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-black/50">Weight</span>
                  <select name="fontWeight" value={selectedElement.fontWeight || '400'} onChange={handleChange} className="w-full text-[12px] font-black uppercase border-2 border-black px-4 py-3 outline-none cursor-pointer bg-white neo-shadow-xs appearance-none font-editorial">
                    <option value="400">Regular</option>
                    <option value="500">Medium</option>
                    <option value="700">Bold</option>
                    <option value="900">Black</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-black/50">Size</span>
                  <InputBox label="PX" name="fontSize" value={selectedElement.fontSize || 24} onChange={handleChange} />
                </div>
              </div>
              
              <div className="flex border-2 border-black overflow-hidden bg-white">
                {['left', 'center', 'right'].map(align => (
                  <button 
                    key={align}
                    onClick={() => updateElements(selectedElementIds, { textAlign: align })}
                    className={`flex-1 py-3 flex justify-center transition-all ${selectedElement.textAlign === align ? 'bg-black text-white' : 'hover:bg-gray-50 text-black/40'}`}
                  >
                    {align === 'left' && <AlignLeft size={16} strokeWidth={3} />}
                    {align === 'center' && <AlignCenter size={16} strokeWidth={3} />}
                    {align === 'right' && <AlignRight size={16} strokeWidth={3} />}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] px-1 opacity-50">Context Value</span>
                 <textarea 
                  name="content"
                  value={selectedElement.content || ''}
                  onChange={handleChange}
                  className="w-full text-[13px] font-black uppercase border-2 border-black p-4 outline-none min-h-[120px] transition-all bg-white neo-shadow-xs focus:bg-yellow-50 focus:neo-shadow-sm"
                  placeholder="Enter text..."
                />
              </div>
            </div>
          </Section>
        )}

        {/* PROTOTYPING */}
        <Section title="Arena Logic" defaultOpen={false} theme={theme} isLight={isLight}>
          <div className="space-y-5">
             <div className="space-y-2">
               <span className="text-[10px] font-black uppercase tracking-widest flex items-center text-black/50"><Zap size={12} strokeWidth={3} className="mr-2 text-yellow-500 fill-yellow-500"/> Click Action</span>
               <select 
                  value={selectedElement.action?.type || 'none'} 
                  onChange={(e) => updateElements(selectedElementIds, { action: e.target.value === 'none' ? null : { type: e.target.value, targetPageId: pages[0]?.id } })}
                  className="w-full text-[11px] font-black uppercase border-2 border-black px-4 py-3 outline-none cursor-pointer bg-white neo-shadow-xs appearance-none font-editorial"
                >
                  <option value="none">Disabled</option>
                  <option value="navigate">Navigate Route</option>
                </select>
             </div>

             {selectedElement.action?.type === 'navigate' && (
                <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200">
                  <span className="text-[10px] font-black uppercase tracking-widest text-black/50">Target Canvas</span>
                  <select 
                    value={selectedElement.action.targetPageId || ''} 
                    onChange={(e) => updateElements(selectedElementIds, { action: { ...selectedElement.action, targetPageId: e.target.value } })}
                    className="w-full text-[11px] font-black uppercase border-2 border-black px-4 py-3 outline-none cursor-pointer bg-yellow-400 text-black neo-shadow-xs appearance-none font-editorial"
                  >
                    {pages.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
             )}
          </div>
        </Section>

        {/* COMPONENT SYSTEM */}
        <Section title="Master Systems" defaultOpen={true} theme={theme} isLight={isLight}>
           <div className="space-y-5">
              {selectedElement.type !== 'instance' ? (
                <div className="space-y-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider opacity-40 leading-relaxed">Encapsulate selection into a tactical system component for global syncing.</p>
                  <button 
                    onClick={() => {
                      const name = window.prompt("Enter Component Name", "New Component");
                      if (name) createComponent(name);
                    }}
                    className="w-full py-4 bg-black hover:bg-indigo-600 text-white border-2 border-black neo-shadow-sm hover:neo-shadow-none transition-all text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center"
                  >
                    <Box size={16} strokeWidth={3} className="mr-3" />
                    Forge Component
                  </button>
                </div>
              ) : (
                <div className="p-5 border-2 border-indigo-500 bg-indigo-50/50 space-y-3 neo-shadow-xs">
                   <div className="flex items-center text-indigo-600 space-x-2">
                      <Box size={16} strokeWidth={3} />
                      <span className="text-[12px] font-black uppercase tracking-widest font-editorial">Master Instance: {selectedElement.name}</span>
                   </div>
                   <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 leading-relaxed">This layer is reactive. Edits to primary source will propagate here instantly.</p>
                </div>
              )}
           </div>
        </Section>

      </div>
    </div>
  );
};

export default PropertiesPanel;
