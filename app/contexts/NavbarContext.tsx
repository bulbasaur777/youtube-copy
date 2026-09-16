"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

type NavbarContextType = {
  isNavbarOpen: boolean;
  changeNavbar: () => void;
};

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState: boolean;
}) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(initialState);

  const changeNavbar = () => {
    let newState: boolean;

    if (isNavbarOpen === true) {
      newState = false;
    } else {
      newState = true;
    }

    if (newState === isNavbarOpen) return;

    setIsNavbarOpen(newState);
    document.cookie = `navbarIsOpen=${newState}; path=/; max-age=31536000`;
  };

  return (
    <NavbarContext.Provider value={{ isNavbarOpen, changeNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
}

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context)
    throw new Error("useLang must be used within a LanguageProvider");
  return context;
};
