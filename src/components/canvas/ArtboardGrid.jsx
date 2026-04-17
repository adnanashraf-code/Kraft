import React from 'react';

const ArtboardGrid = ({ grids }) => {
  if (!grids || grids.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {grids.filter(g => g.visible).map((grid, idx) => {
        if (grid.type === 'columns') {
          return (
            <div 
              key={grid.id || idx} 
              className="absolute inset-0 flex justify-between"
              style={{
                paddingLeft: `${grid.margin || 0}px`,
                paddingRight: `${grid.margin || 0}px`,
                gap: `${grid.gutter || 0}px`
              }}
            >
              {Array.from({ length: grid.count || 12 }).map((_, i) => (
                <div 
                  key={i} 
                  className="h-full flex-1"
                  style={{ backgroundColor: grid.color || 'rgba(255, 0, 0, 0.1)' }}
                />
              ))}
            </div>
          );
        } else if (grid.type === 'rows') {
          return (
            <div 
              key={grid.id || idx} 
              className="absolute inset-0 flex flex-col justify-between"
              style={{
                paddingTop: `${grid.margin || 0}px`,
                paddingBottom: `${grid.margin || 0}px`,
                gap: `${grid.gutter || 0}px`
              }}
            >
              {Array.from({ length: grid.count || 12 }).map((_, i) => (
                <div 
                  key={i} 
                  className="w-full flex-1"
                  style={{ backgroundColor: grid.color || 'rgba(255, 0, 0, 0.1)' }}
                />
              ))}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default ArtboardGrid;
