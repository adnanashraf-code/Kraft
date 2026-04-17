import React, { useEffect, useRef } from 'react';
import useEditorStore from '../../store/useEditorStore';
import { Type, Copy, Trash2, Lock, Unlock, EyeOff, Eye, ArrowUp, ArrowDown } from 'lucide-react';

const ContextMenu = ({ onRename }) => {
  const { contextMenu, closeContextMenu, pages, activePageId, deleteElements, updateElement, duplicateElements, reorderElement, styleClipboard, copyStyle, pasteStyle } = useEditorStore();
  
  const activePage = pages.find(p => p.id === activePageId) || pages[0];
  const elements = activePage.elements;
  
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeContextMenu();
      }
    };
    
    // Listen for scroll or click to close the menu
    if (contextMenu.isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // document.addEventListener('scroll', closeContextMenu, true); 
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // document.removeEventListener('scroll', closeContextMenu, true);
    };
  }, [contextMenu.isOpen, closeContextMenu]);

  if (!contextMenu.isOpen) return null;

  const targetElement = elements.find(el => el.id === contextMenu.targetId);
  const elementIndex = elements.findIndex(el => el.id === contextMenu.targetId);
  
  if (!targetElement) {
    closeContextMenu();
    return null;
  }

  // Position logic (prevent rendering offscreen)
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const menuWidth = 220; // approximate
  const menuHeight = 280; // approximate
  
  let x = contextMenu.x;
  let y = contextMenu.y;
  
  if (x + menuWidth > windowWidth) x -= menuWidth;
  if (y + menuHeight > windowHeight) y -= menuHeight;

  // Actions
  const handleAction = (action) => {
    action();
    closeContextMenu();
  };

  return (
    <div 
      ref={menuRef}
      className="fixed bg-white border border-gray-200 shadow-xl rounded-md py-1.5 w-56 z-[100] text-sm text-gray-700"
      style={{ left: x, top: y }}
      onContextMenu={(e) => e.preventDefault()} // prevent native context menu on our custom one
    >
      <div className="px-3 py-1.5 border-b border-gray-100 flex items-center bg-gray-50/50 mb-1">
        <span className="font-semibold text-xs text-gray-500 uppercase tracking-wide truncate">
          {targetElement.name || targetElement.type}
        </span>
      </div>

      <button onClick={() => handleAction(() => {
        const newName = window.prompt("Enter new layer name:", targetElement.name || targetElement.type);
        if (newName !== null && newName.trim() !== "") {
          updateElement(targetElement.id, { name: newName.trim() });
        }
      })} className="w-full text-left px-3 py-1.5 hover:bg-gray-100 flex items-center">
        <Type size={14} className="mr-2 text-gray-400" /> Rename
      </button>

      <button onClick={() => handleAction(() => duplicateElements([targetElement.id]))} className="w-full text-left px-3 py-1.5 hover:bg-gray-100 flex items-center">
        <Copy size={14} className="mr-2 text-gray-400" /> Duplicate <span className="ml-auto text-xs text-gray-400">Ctrl+D</span>
      </button>

      <div className="my-1 border-t border-gray-100" />
      
      <button onClick={() => handleAction(() => copyStyle(targetElement.id))} className="w-full text-left px-3 py-1.5 hover:bg-gray-100 flex items-center">
        <Copy size={14} className="mr-2 text-gray-400" /> Copy Style <span className="ml-auto text-xs text-gray-400">Ctrl+Alt+C</span>
      </button>

      <button disabled={!styleClipboard} onClick={() => handleAction(() => pasteStyle([targetElement.id]))} className={`w-full text-left px-3 py-1.5 flex items-center ${!styleClipboard ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}>
        <Type size={14} className="mr-2 text-gray-400" /> Paste Style <span className="ml-auto text-xs text-gray-400">Ctrl+Alt+V</span>
      </button>

      <div className="my-1 border-t border-gray-100" />

      <button 
        onClick={() => handleAction(() => {
          if (elementIndex > 0) reorderElement(elements[elementIndex].id, elements[elementIndex - 1].id);
        })} 
        className="w-full text-left px-3 py-1.5 hover:bg-gray-100 flex items-center"
      >
        <ArrowUp size={14} className="mr-2 text-gray-400" /> Bring Forward
      </button>

      <button 
        onClick={() => handleAction(() => {
          if (elementIndex < elements.length - 1) reorderElement(elements[elementIndex].id, elements[elementIndex + 1].id);
        })} 
        className="w-full text-left px-3 py-1.5 hover:bg-gray-100 flex items-center"
      >
        <ArrowDown size={14} className="mr-2 text-gray-400" /> Send Backward
      </button>

      <div className="my-1 border-t border-gray-100" />

      <button 
        onClick={() => handleAction(() => updateElement(targetElement.id, { locked: !targetElement.locked }))} 
        className="w-full text-left px-3 py-1.5 hover:bg-gray-100 flex items-center"
      >
        {targetElement.locked ? <Unlock size={14} className="mr-2 text-gray-400" /> : <Lock size={14} className="mr-2 text-gray-400" />} 
        {targetElement.locked ? "Unlock Layer" : "Lock Layer"}
      </button>

      <button 
        onClick={() => handleAction(() => updateElement(targetElement.id, { visible: !targetElement.visible }))} 
        className="w-full text-left px-3 py-1.5 hover:bg-gray-100 flex items-center"
      >
        {targetElement.visible ? <EyeOff size={14} className="mr-2 text-gray-400" /> : <Eye size={14} className="mr-2 text-gray-400" />} 
        {targetElement.visible ? "Hide Layer" : "Show Layer"}
      </button>

      <div className="my-1 border-t border-gray-100" />

      <button onClick={() => handleAction(() => deleteElements([targetElement.id]))} className="w-full text-left px-3 py-1.5 hover:bg-red-50 hover:text-red-600 flex items-center group">
        <Trash2 size={14} className="mr-2 text-red-400 group-hover:text-red-600" /> Delete <span className="ml-auto text-xs text-gray-400 group-hover:text-red-400">Del</span>
      </button>

    </div>
  );
};

export default ContextMenu;
