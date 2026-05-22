import DesktopSidebar from "./DesktopSidebar";
import Mobilefoot from "./Mobilefoot";

async function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen">
      <DesktopSidebar />
      <Mobilefoot />

      <main className="lg:pl-20 h-screen">{children}</main>
    </div>
  );
}
export default Sidebar;
