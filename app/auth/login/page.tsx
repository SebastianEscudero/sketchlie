import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Sketchlie | El Espacio de Trabajo para Colaborar",
  description: "La plataforma de colaboración donde puedes convertir tus ideas en realidad. Hecha para que equipos puedan colaborar, diseñar y innovar. Construye el futuro con nosotros",
  keywords: ["sketchlie login", "sketchlie sign up", "sketchlie"],
  alternates: {
    canonical: "https://www.sketchlie.com/auth/login/",
  }
}

const LoginPage = () => {
  return ( 
    <LoginForm />
  );
}
 
export default LoginPage;