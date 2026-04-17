import React, { useState } from 'react';
import useEditorStore from '../../store/useEditorStore';
import { Plus, Eye, EyeOff, Trash2, SlidersHorizontal, ChevronDown, ChevronRight, AlignLeft, AlignCenter, AlignRight, Type, Square, Lock, Unlock, Hash, LayoutList, FlipHorizontal, FlipVertical, RotateCw, LayoutGrid, Zap } from 'lucide-react';
import { THEMES } from '../../utils/themes';

const Section = ({ title, children, defaultOpen = true, theme, isLight }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className={`border-b ${theme.border} last:border-0`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between py-4 px-4 transition-all ${isLight ? 'hover:bg-gray-100' : 'hover:bg-white/5'}`}
      >
        <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme.title}`}>{title}</span>
        {isOpen ? <ChevronDown size={14} className={theme.title} /> : <ChevronRight size={14} className={theme.title} />}
      </button>
      {isOpen && <div className="px-5 pb-5 space-y-5">{children}</div>}
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
        className={`w-full text-[11px] p-1 rounded outline-none font-bold ${isLight ? 'bg-gray-100 text-gray-900 border-transparent focus:border-blue-500' : 'bg-white/5 text-white border-transparent focus:border-blue-500'} border transition-all hover:bg-black/5 dark:hover:bg-white/10`} 
      />
    </div>
  );

  return (
    <div className={`w-[320px] ${theme.sidebar} border-l ${theme.border} flex flex-col h-full shrink-0 relative z-10 transition-colors duration-500`}>
      <div className={`h-14 border-b ${theme.border} flex items-center px-4 justify-between shrink-0`}>
        <div className="flex items-center">
            <LayoutGrid size={15} className="mr-2 text-indigo-500" strokeWidth={3} />
            <span className={`font-editorial font-black text-[14px] uppercase tracking-widest ${isLight ? 'text-gray-900' : 'text-white/90'}`}>Artboard Setup</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className={`p-4 border-b ${theme.border}`}>
            <h3 className={`text-[11px] font-black uppercase tracking-widest mb-1 ${theme.title}`}>Active Page</h3>
            <p className={`text-sm font-bold truncate ${isLight ? 'text-gray-900' : 'text-white'}`}>{activePage.name}</p>
        </div>

        {/* LAYOUT GRIDS SECTION */}
        <div className={`border-b ${theme.border}`}>
          <div className={`flex items-center justify-between p-4`}>
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme.title}`}>Layout Grids</span>
            <button onClick={addGrid} className={`p-1 rounded-md transition-colors ${isLight ? 'hover:bg-gray-200 text-gray-500' : 'hover:bg-white/10 text-white/50'}`}>
              <Plus size={14} />
            </button>
          </div>
          
          <div className="px-4 pb-4 space-y-4">
            {!(activePage.layoutGrids?.length > 0) && (
              <p className={`text-[11px] italic opacity-50 ${theme.text}`}>No grids added. Click + to add columns or rows.</p>
            )}
            
            {(activePage.layoutGrids || []).map((grid, idx) => (
              <div key={grid.id} className={`p-3 rounded-xl border ${isLight ? 'border-gray-200 bg-gray-50' : 'border-white/10 bg-white/5'} space-y-3`}>
                <div className="flex items-center justify-between mb-2">
                  <select 
                    value={grid.type} 
                    onChange={(e) => updateGrid(grid.id, { type: e.target.value })}
                    className={`text-[11px] font-bold uppercase rounded p-1 outline-none cursor-pointer ${isLight ? 'bg-white border-gray-200 text-gray-900' : 'bg-[#1a1a1a] border-white/10 text-white'}`}
                  >
                    <option value="columns">Columns</option>
                    <option value="rows">Rows</option>
                  </select>

                  <div className="flex items-center space-x-1">
                     <button onClick={() => updateGrid(grid.id, { visible: !grid.visible })} className={`p-1.5 rounded transition-colors ${isLight ? 'hover:bg-gray-200 text-gray-500' : 'hover:bg-white/10 text-white/50'}`}>
                        {grid.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                     </button>
                     <button onClick={() => removeGrid(grid.id)} className={`p-1.5 rounded transition-colors text-red-500 hover:bg-red-500/10`}>
                        <Trash2 size={12} />
                     </button>
                  </div>
                </div>

                <InputBoxMinimal label="Count" value={grid.count} onChange={(e) => updateGrid(grid.id, { count: parseInt(e.target.value) || 1 })} />
                <InputBoxMinimal label="Gutter" value={grid.gutter} onChange={(e) => updateGrid(grid.id, { gutter: parseInt(e.target.value) || 0 })} />
                <InputBoxMinimal label="Margin" value={grid.margin} onChange={(e) => updateGrid(grid.id, { margin: parseInt(e.target.value) || 0 })} />
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
    uiTheme, rotate90, flipElement, alignElements, distributeElements 
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

  const AlignButton = ({ onClick, icon: Icon, title }) => (
    <button 
      onClick={onClick}
      className={`p-2 rounded-lg transition-all ${isLight ? 'hover:bg-gray-100 text-gray-500 hover:text-blue-600' : 'hover:bg-white/10 text-white/40 hover:text-white'}`}
      title={title}
    >
      <Icon size={16} />
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
        <Section title="Layout & Pos" theme={theme} isLight={isLight}>
          <div className="grid grid-cols-2 gap-3 relative">
            <InputBox label="X" name="x" value={Math.round(selectedElement.x)} onChange={handleChange} />
            <InputBox label="Y" name="y" value={Math.round(selectedElement.y)} onChange={handleChange} />
            <InputBox label="W" name="w" value={Math.round(selectedElement.w)} onChange={handleChange} />
            <InputBox label="H" name="h" value={Math.round(selectedElement.h)} onChange={handleChange} />
            
            <button 
              className={`absolute top-[48px] left-[calc(50%-12px)] z-20 w-6 h-6 rounded-full flex items-center justify-center border transition-all ${selectedElement.aspectRatioLocked ? 'bg-blue-600 border-blue-400 text-white shadow-lg' : (isLight ? 'bg-white border-gray-200 text-gray-400' : 'bg-[#1a1a1a] border-white/10 text-white/30 hover:text-white/60')}`}
              onClick={() => updateElements(selectedElementIds, { aspectRatioLocked: !selectedElement.aspectRatioLocked })}
            >
              <LayoutList size={10} />
            </button>
            
            <div className="col-span-2">
                <InputBox label="R" name="rotation" value={Math.round(selectedElement.rotation || 0)} onChange={handleChange} suffix="°" />
            </div>

            {/* TRANSFORM BUTTONS */}
            <div className={`col-span-2 flex items-center justify-between p-1 rounded-xl border ${theme.border} ${isLight ? 'bg-gray-100' : 'bg-white/5'}`}>
              <button 
                onClick={() => flipElement(selectedElementIds, 'x')}
                className={`flex-1 py-1.5 flex justify-center rounded-lg transition-all ${selectedElement.flipX ? 'bg-blue-600 text-white shadow-md' : theme.title + ' hover:bg-white/10'}`}
                title="Flip Horizontal"
              >
                <FlipHorizontal size={14} />
              </button>
              <button 
                onClick={() => flipElement(selectedElementIds, 'y')}
                className={`flex-1 py-1.5 flex justify-center rounded-lg transition-all ${selectedElement.flipY ? 'bg-blue-600 text-white shadow-md' : theme.title + ' hover:bg-white/10'}`}
                title="Flip Vertical"
              >
                <FlipVertical size={14} />
              </button>
              <button 
                onClick={() => rotate90(selectedElementIds)}
                className={`flex-1 py-1.5 flex justify-center rounded-lg transition-all ${isLight ? 'hover:bg-white' : 'hover:bg-white/10'} ${theme.title}`}
                title="Rotate 90°"
              >
                <RotateCw size={14} />
              </button>
            </div>
          </div>
        </Section>

        {/* APPEARANCE */}
        <Section title="Appearance" theme={theme} isLight={isLight}>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-bold uppercase tracking-widest ${theme.title}`}>Opacity</span>
                <span className="text-[11px] font-mono text-blue-500 font-bold">{Math.round((selectedElement.opacity ?? 1) * 100)}%</span>
              </div>
              <input type="range" name="opacity" min="0" max="1" step="0.01" value={selectedElement.opacity ?? 1} onChange={handleChange} className={`w-full accent-blue-600 h-1.5 ${isLight ? 'bg-gray-200' : 'bg-white/10'} rounded-full appearance-none cursor-pointer transition-all hover:h-2`} />
            </div>

            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-bold uppercase tracking-widest ${theme.title}`}>Base Color</span>
              <div className={`flex items-center space-x-2 ${isLight ? 'bg-white border-gray-200 shadow-sm' : 'bg-white/5 border-white/5'} border p-1 rounded-xl`}>
                 <input type="color" name="fill" value={selectedElement.fill === 'transparent' ? '#ffffff' : selectedElement.fill} onChange={handleChange} className="w-6 h-6 rounded-lg cursor-pointer bg-transparent border-none p-0" />
                 <span className={`text-[11px] font-mono pr-2 uppercase ${isLight ? 'text-gray-900' : 'text-white/80'}`}>{selectedElement.fill}</span>
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
        <Section title="Stroke / Borders" defaultOpen={false} theme={theme} isLight={isLight}>
          <div className="space-y-4">
            <div className="grid grid-cols-[1fr_80px] gap-3">
              <div className={`flex items-center ${isLight ? 'bg-white border-gray-200 shadow-sm' : 'bg-white/5 border-white/5'} border p-1 rounded-xl`}>
                <input type="color" name="strokeColor" value={selectedElement.strokeColor || '#000000'} onChange={handleChange} className="w-6 h-6 rounded-lg cursor-pointer bg-transparent border-none p-0" />
                <span className={`text-[11px] font-mono px-2 uppercase truncate ${isLight ? 'text-gray-900' : 'text-white/80'}`}>{selectedElement.strokeColor}</span>
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
            
            <div className={`flex ${isLight ? 'bg-gray-100' : 'bg-white/5'} p-1 rounded-xl`}>
              {['solid', 'dashed'].map(style => (
                <button 
                  key={style}
                  onClick={() => updateElements(selectedElementIds, { strokeStyle: style })}
                  className={`flex-1 py-1.5 text-[10px] uppercase font-black tracking-widest transition-all rounded-lg 
                    ${selectedElement.strokeStyle === style 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : (isLight 
                          ? 'text-gray-500 hover:bg-gray-200 hover:text-gray-900' 
                          : 'text-white/40 hover:bg-white/10 hover:text-white')}`}
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
                    onClick={() => updateElements(selectedElementIds, { textAlign: align })}
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

        {/* PROTOTYPING */}
        <Section title="Prototyping" defaultOpen={false} theme={theme} isLight={isLight}>
          <div className="space-y-4">
             <div className="space-y-2">
               <span className={`text-[11px] font-bold uppercase tracking-widest flex items-center ${theme.title}`}><Zap size={10} className="mr-1 text-yellow-500"/> On Click Action</span>
               <select 
                  value={selectedElement.action?.type || 'none'} 
                  onChange={(e) => updateElements(selectedElementIds, { action: e.target.value === 'none' ? null : { type: e.target.value, targetPageId: pages[0]?.id } })}
                  className={`w-full text-xs font-bold border rounded-xl px-3 py-2.5 outline-none cursor-pointer transition-colors appearance-none ${isLight ? 'bg-white border-gray-200 text-gray-900 shadow-sm' : 'bg-white/5 border-white/5 text-white/90 hover:bg-white/10'}`}
                >
                  <option value="none" className={isLight ? 'bg-white text-black' : 'bg-[#0c0c0c] text-white'}>None</option>
                  <option value="navigate" className={isLight ? 'bg-white text-black' : 'bg-[#0c0c0c] text-white'}>Navigate to Page</option>
                </select>
             </div>

             {selectedElement.action?.type === 'navigate' && (
                <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200">
                  <span className={`text-[11px] font-bold uppercase tracking-widest ${theme.title}`}>Target Page</span>
                  <select 
                    value={selectedElement.action.targetPageId || ''} 
                    onChange={(e) => updateElements(selectedElementIds, { action: { ...selectedElement.action, targetPageId: e.target.value } })}
                    className={`w-full text-xs font-bold border rounded-xl px-3 py-2.5 outline-none cursor-pointer transition-colors appearance-none text-blue-600 ${isLight ? 'bg-white border-blue-200 shadow-sm' : 'bg-blue-900/20 border-blue-500/30'}`}
                  >
                    {pages.map(p => <option key={p.id} value={p.id} className={isLight ? 'bg-white text-black' : 'bg-[#0c0c0c] text-white'}>{p.name}</option>)}
                  </select>
                </div>
             )}
          </div>
        </Section>

      </div>
    </div>
  );
};

export default PropertiesPanel;
