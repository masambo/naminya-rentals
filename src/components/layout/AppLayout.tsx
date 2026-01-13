import { ReactNode } from "react";
import BottomNav from "./BottomNav";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="app-container">
      <main className="safe-bottom hide-scrollbar overflow-y-auto min-h-screen">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default AppLayout;
