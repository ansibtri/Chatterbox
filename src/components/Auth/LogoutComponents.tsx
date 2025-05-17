import type { ReactNode } from "@tanstack/react-router";
import { useAuth } from "../../lib/Provider/AuthContext";
interface LogoutComponentsProps {
  children: ReactNode;
}
export default function LogoutComponents({ children }: LogoutComponentsProps) {
  const { userAuth } = useAuth();
  if (!userAuth?.isAuthenticated) {
    return <>{children}</>;
  }
  return null;
}
