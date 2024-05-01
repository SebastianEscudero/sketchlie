import { RegisterForm } from "@/components/auth/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up | Sketchlie | Pizarra Online para Colaborar",
  description: "La plataforma de colaboración donde puedes convertir tus ideas en realidad. Hecha para que equipos puedan colaborar, diseñar y innovar. Construye el futuro con nosotros",
  keywords: ["sketchlie register", "sketchlie sign up", "sketchlie", "sketchlie login"],
  alternates: {
    canonical: "https://www.sketchlie.com/auth/register/",
  }
}

const RegisterPage = () => {
  return ( 
    <RegisterForm />
  );
}
 
export default RegisterPage;