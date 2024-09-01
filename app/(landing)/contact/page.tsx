import { Metadata } from "next";
import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import ContactForm from "./form";

export const metadata: Metadata = {
    title: "Contáctanos | Sketchlie",
    description: "Ponte en contacto con Sketchlie. Estamos aquí para ayudarte a convertir tus ideas en planes.",
    keywords: ["sketchlie contacto", "contáctanos", "ponte en contacto", "soporte"],
    alternates: {
        canonical: "https://www.sketchlie.com/contact/",
    }
};

const ContactPage = () => {
    return (
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
            <Breadcrumb className="xl:mx-[15%] lg:mx-[5%] mx-[2%] pt-5">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href="/" title="Inicio">Inicio</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Contacto</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex flex-col justify-center items-center py-16 xl:mx-[15%] lg:mx-[5%] mx-[2%]">
                <h1 className="text-4xl font-bold text-center mb-4">Contáctanos</h1>
                <p className="text-xl text-gray-600 text-center mb-8">Convierte tus ideas en planes</p>
                <ContactForm />
            </div>
        </div>
    );
}

export default ContactPage;