import { ToastsProvider } from "./ToastsContext";
import { AuthProvider } from "./AuthContext";
import { PanelProvider } from "./PanelContext";
import { SidebarContextProvider } from "./SidebarContext";
import { ModalProvider } from "./ModalContext";
import { ChatHeadProvider } from "./ChatHeadProvider";
import { PostContextProvider } from "./PostContext";

function AppProvider({ children }: any) {
  return (
    <AuthProvider>
      <ModalProvider>
        <SidebarContextProvider>
          <PostContextProvider>
            <PanelProvider>
              <ToastsProvider>
                <ChatHeadProvider>{children}</ChatHeadProvider>
              </ToastsProvider>
            </PanelProvider>
          </PostContextProvider>
        </SidebarContextProvider>
      </ModalProvider>
    </AuthProvider>
  );
}

export { AppProvider };
