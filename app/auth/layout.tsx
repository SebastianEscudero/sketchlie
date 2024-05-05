import { AuthNavbar } from "@/components/auth/auth-navbar";

const AuthLayout = ({ 
  children
}: { 
  children: React.ReactNode
}) => {
  return ( 
    <div className="h-full flex flex-col">
      <AuthNavbar />
      <div className="flex-grow flex items-center justify-center bg-[#FFF3D9] p-3">
        <h1 className="hidden">Sketchlie register, Sketchlie login, Sketchlie new passord, Sketchlie</h1>
        {children}
      </div>
    </div>
   );
}
 
export default AuthLayout;