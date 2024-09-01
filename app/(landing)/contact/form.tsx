"use client";

import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import emailjs from '@emailjs/browser';
import { toast } from "sonner";

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const templateId = 'template_p883b7d';
    const emailId = "service_vdo9107";
    const publicKey = "tdGS-ea0-bienpHeq";

    React.useEffect(() => {
        emailjs.init(publicKey);
    }, []);

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.currentTarget;
        const formData = new FormData(form);
        
        // Concatenate form fields into the required format
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;
        const workEmail = formData.get('workEmail') as string;
        const companyName = formData.get('companyName') as string;
        const expectedUsers = formData.get('expectedUsers') as string;
        const message = formData.get('message') as string;

        const feedback_type = `Enterprise Inquiry - ${companyName}`;
        const feedback_message = `
Name: ${firstName} ${lastName}
Email: ${workEmail}
Company: ${companyName}
Expected Users: ${expectedUsers}

Message:
${message}
        `.trim();

        const templateParams = {
            feedback_type,
            feedback_message
        };

        console.log(templateParams);

        emailjs.send(emailId, templateId, templateParams)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                toast.success("Mensaje enviado correctamente!");
                form.reset();
            }, (error) => {
                console.error("Email error:", error);
                toast.error("Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.");
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    }, [emailId, templateId]);

    return (
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
                ¿Tienes preguntas o necesitas ayuda? ¡Estamos aquí para ayudarte! Completa el formulario a continuación y nuestro equipo se pondrá en contacto contigo lo antes posible.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nombre
                        </label>
                        <Input
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Tu nombre"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Apellido
                        </label>
                        <Input
                            type="text"
                            id="lastName"
                            name="lastName"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Tu apellido"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="workEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Correo electrónico del trabajo
                    </label>
                    <Input
                        type="email"
                        id="workEmail"
                        name="workEmail"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="tu@empresa.com"
                    />
                </div>
                <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nombre de la empresa
                    </label>
                    <Input
                        type="text"
                        id="companyName"
                        name="companyName"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Nombre de tu empresa"
                    />
                </div>
                <div>
                    <label htmlFor="expectedUsers" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Número esperado de usuarios
                    </label>
                    <Input
                        type="number"
                        id="expectedUsers"
                        name="expectedUsers"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Ej. 10"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Mensaje
                    </label>
                    <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Tu mensaje aquí..."
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                </Button>
            </form>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
                Nos pondremos en contacto contigo en breve. Gracias por tu interés en Sketchlie.
            </p>
        </div>
    );
}

export default ContactForm;