"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

type ModalNavbarContextType = {
  isModalNavbarOpen: boolean;
  changeModalNavbar: () => void;
};

const ModalNavbarContext = createContext<ModalNavbarContextType | undefined>(
  undefined,
);

export function ModalNavbarProvider({ children }: { children: ReactNode }) {
  const [isModalNavbarOpen, setIsModalNavbarOpen] = useState(false);

  const changeModalNavbar = () => {
    let newState: boolean;

    if (isModalNavbarOpen === true) {
      newState = false;
    } else {
      newState = true;
    }

    if (newState === isModalNavbarOpen) return;

    setIsModalNavbarOpen(newState);
  };

  return (
    <ModalNavbarContext.Provider
      value={{ isModalNavbarOpen, changeModalNavbar }}
    >
      {children}
    </ModalNavbarContext.Provider>
  );
}

export const useModalNavbar = () => {
  const context = useContext(ModalNavbarContext);
  if (!context)
    throw new Error("useLang must be used within a LanguageProvider");
  return context;
};
