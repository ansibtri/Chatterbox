import {
  createContext,
  useContext,
  useState,
  useReducer,
  type ReactNode,
  type SetStateAction,
  Suspense,
} from "react";
import Create from "../../components/Create/Create";
import PostsDetailCard from "../../components/Posts/PostsDetailCard";
// ModalProvider Types
interface ModalProviderTypes {
  children: ReactNode;
}

// define value types for modal provider
interface ModalProviderValueTypes {
  isModalOpen: boolean;
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
  modalChild: ReactNode;
  dispatchModalChild: React.Dispatch<{type: "create"|"post"}>;
}

// reducer function
interface ModalAction {
  type: "create" | "post";
}
// declare modal context
const ModalContext = createContext<ModalProviderValueTypes | null>(null);

// initilaize model context with useModal
function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal hook must be used within it's provider");
  }
  return context;
}

// modal provider
function ModalProvider({ children }: ModalProviderTypes) {
      // change the state of modal 
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  function reducer(state: ReactNode, action: ModalAction) {
      switch (action.type) {
        case "create":
          return <Create/>
        case "post":
          return <Suspense fallback={<h1>Loading...</h1>}><PostsDetailCard/></Suspense>
        default:
          return state;
      }
    }
    const [modalChild, dispatchModalChild] = useReducer(reducer, null);

  return (
    <ModalContext.Provider value={{ isModalOpen, setModalOpen, modalChild, dispatchModalChild }}>
      {children}
    </ModalContext.Provider>
  );
}

export { useModal, ModalProvider };
