import MobileNav from "./components/MobileNav";
import StorealsoSidebar from "./components/storeAlsoSIdebar";


export default function StorealsoLayout({children}:{children: React.ReactNode}){
         return (
           <div className="flex">
             <div className="flex ">
               <StorealsoSidebar />
               <MobileNav/>

             </div>
             {children}
           </div>
         );
}