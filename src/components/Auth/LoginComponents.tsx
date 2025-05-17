import type { ReactNode } from "@tanstack/react-router";
import { useAuth } from "../../lib/Provider/AuthContext";

interface LoginComponentsProps {
  children: ReactNode;
}
const LoginComponents = ({ children }: LoginComponentsProps) => {
  const { userAuth } = useAuth();
  // console.log("User Auth", userAuth);
  if(userAuth && userAuth.isAuthenticated) {
  return <>{children}</>;
  }
  return null;
};

export default LoginComponents;
