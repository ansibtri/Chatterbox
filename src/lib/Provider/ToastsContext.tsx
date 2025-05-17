import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  type JSX
} from "react";

// Define context type
interface ToastsContextType {
  toasts: { open: boolean; data: { type: string; message: string } };
  setToasts: Dispatch<SetStateAction<{ open: boolean; data: { type: string; message: string } }>>;
}

// Create context with correct default value (null initially)
const ToastsContext = createContext<ToastsContextType | null>(null);

// Define provider props type
interface ToastsProviderProps {
  children: ReactNode;
}

function ToastsProvider({ children }: ToastsProviderProps): JSX.Element {
  
  const [toasts, setToasts] = useState({
    open: false,
    data: { type: '', message: '' },
  });

  function autoCloseToasts() {
    setTimeout(() => {
      setToasts({
        open: false,
        data: { type: '', message: '' },
      });
    }, 4000);
  }

  if (toasts?.open) autoCloseToasts();

  return (
    <ToastsContext.Provider value={{ toasts, setToasts }}>
      {children}
    </ToastsContext.Provider>
  );
}

// Custom hook to use the context
const useToasts = () => {
  const context = useContext(ToastsContext);
  if (!context) {
    throw new Error("useToasts must be used within a ToastsProvider");
  }
  return context;
};

export { useToasts, ToastsProvider };
