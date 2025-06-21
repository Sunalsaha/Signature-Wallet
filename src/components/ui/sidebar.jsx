import React from "react";

export const Sidebar = ({ children, open }) => (
  <aside className={`bg-white dark:bg-gray-950 text-black dark:text-white transition-all duration-300 ${open ? "w-64" : "w-16"} h-screen fixed left-0 top-0 flex flex-col shadow-lg z-30`}>
    {children}
  </aside>
);

export const SidebarBody = ({ children, className = "" }) => (
  <div className={`flex flex-col flex-1 px-4 py-6 ${className}`}>
    {children}
  </div>
);

export const SidebarLink = ({ link }) => (
  <div className="mb-2">{link.element}</div>
);
