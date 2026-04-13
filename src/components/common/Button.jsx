import React from 'react';

const Button = ({ children, variant = 'primary', className = '', onClick, icon: Icon }) => {
  const baseStyle = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200";
  
  const variants = {
    editorial: `bg-orange text-white px-6 py-3 font-editorial font-bold text-lg solid-shadow hover:bg-black`,
    secondary: `bg-white text-black px-6 py-3 font-editorial font-bold text-lg solid-shadow`,
    editorPrimary: `bg-black text-white px-4 py-2 rounded-md text-sm hover:opacity-90`,
    editorSecondary: `bg-white text-black border border-border px-4 py-2 rounded-md text-sm hover:bg-gray-50`,
    icon: `p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-md`,
    activeIcon: `p-2 text-teal bg-teal-50 rounded-md`
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {Icon && <Icon size={variant.includes('icon') ? 18 : 20} />}
      {children}
    </button>
  );
};

export default Button;
