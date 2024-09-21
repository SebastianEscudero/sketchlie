"use client";

import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import emailjs from '@emailjs/browser';
import { toast } from "sonner";
import { Language } from "@/types/canvas";
import { contactFormTranslations } from "@/public/locales/contact/contact-form";

const ContactForm = ({ lang }: { lang: Language }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const templateId = 'template_p883b7d';
    const emailId = "service_vdo9107";
    const publicKey = "tdGS-ea0-bienpHeq";
    const t = contactFormTranslations[lang];

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

        emailjs.send(emailId, templateId, templateParams)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                toast.success(t.success);
                form.reset();
            }, (error) => {
                console.error("Email error:", error);
                toast.error(t.error);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    }, [emailId, templateId, t]);

    return (
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t.description}
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t.firstName}
                        </label>
                        <Input
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder={t.placeholders.firstName}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t.lastName}
                        </label>
                        <Input
                            type="text"
                            id="lastName"
                            name="lastName"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder={t.placeholders.lastName}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="workEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t.workEmail}
                    </label>
                    <Input
                        type="email"
                        id="workEmail"
                        name="workEmail"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder={t.placeholders.workEmail}
                    />
                </div>
                <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t.companyName}
                    </label>
                    <Input
                        type="text"
                        id="companyName"
                        name="companyName"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder={t.placeholders.companyName}
                    />
                </div>
                <div>
                    <label htmlFor="expectedUsers" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t.expectedUsers}
                    </label>
                    <Input
                        type="number"
                        id="expectedUsers"
                        name="expectedUsers"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder={t.placeholders.expectedUsers}
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t.message}
                    </label>
                    <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder={t.placeholders.message}
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? t.sending : t.send}
                </Button>
            </form>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
                {t.thankYou}
            </p>
        </div>
    );
}

export default ContactForm;