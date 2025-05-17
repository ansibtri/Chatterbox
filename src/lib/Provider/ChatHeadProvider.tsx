import { createContext, type ReactNode } from "react";
import { useContext, useState } from "react";

interface ChatHeaderProviderChildrenType{
      children: ReactNode;
}
const ChatHeadContext = createContext({});


function useChatHeadContext() {
  const context = useContext(ChatHeadContext);
  if (!context) {
    throw new Error(
      "useChatHeadContext must be used within a ChatHeadProvider"
    );
  }
  return context;
}

function ChatHeadProvider({ children }: ChatHeaderProviderChildrenType) {
  const [headUser, setHeadUser] = useState(null);

  return (
    <ChatHeadContext.Provider
      value={{ headUser, setHeadUser }}
    >
      {children}
    </ChatHeadContext.Provider>
  );
}

export { useChatHeadContext, ChatHeadProvider };
