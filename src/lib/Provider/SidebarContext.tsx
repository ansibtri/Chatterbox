import { createContext, useContext, useState, type ReactNode } from "react";

// sidebar context type
interface SidebarContextType {
  isSidebarFullOpen: boolean;
  setSideBarFullOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// SidebarProvider Children Type
interface SidebarProviderChildrenType {
  children: ReactNode;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

function SidebarContextProvider({ children }: SidebarProviderChildrenType) {
  const [isSidebarFullOpen, setSideBarFullOpen] = useState<boolean>(true);
  return (
    <SidebarContext.Provider value={{ isSidebarFullOpen, setSideBarFullOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

function useSidebar() {
  return useContext(SidebarContext);
}

export { useSidebar, SidebarContextProvider };
