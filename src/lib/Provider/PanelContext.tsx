import {
  createContext,
  useReducer,
  useState,
  useContext,
  type ReactNode,
} from "react";
import Search from "../../components/Search/Search";
import Notifications from "../../components/Notifications/Notifications";
import Menu from "../../components/Menu/Menu";
import Create from "../../components/Create/Create";

interface PanelProps {
  children: ReactNode;
}

interface PanelContextType {
  isPanelOpen: boolean;
  setPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  panelChild: ReactNode;
  dispatchPanelChild: React.Dispatch<{ type: "search" | "notification" | "menu" | null }>;
}

// reducer function
interface PanelAction {
  type: "search" | "notification" | "menu" | "create" | null;
}

const PanelContext = createContext<PanelContextType | null>(null);

function PanelProvider({ children }: PanelProps) {
  // change the status of panel
  const [isPanelOpen, setPanelOpen] = useState(false);

  function reducer(state: ReactNode, action: PanelAction) {
    switch (action.type) {
      case "search":
        return <Search />;
      case "notification":
        return <Notifications />;
      case "menu":
        return <Menu />;
      case "create":
        return <Create/>
      default:
        return state;
    }
  }
  const [panelChild, dispatchPanelChild] = useReducer<ReactNode, PanelAction>(reducer,null);

  // return the panel context provider
  return (
    <PanelContext.Provider
      value={{ isPanelOpen, setPanelOpen, panelChild, dispatchPanelChild }}
    >
      {children}
    </PanelContext.Provider>
  );
}
// panel context
function usePanel(){
  return useContext(PanelContext);
}
export {usePanel, PanelProvider};
