"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import { OrganizationSchema } from "@/schemas";
import { Check, Zap } from "lucide-react";
import { DialogClose, DialogHeader, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { organization } from "@/actions/organization";
import { Card } from "@/components/card";
import { Badge } from "../ui/badge";

interface CreateOrganizationProps {
    setActiveOrganization: (id: string) => void;
};


export const CreateOrganization = ({
    setActiveOrganization
}: CreateOrganizationProps) => {

    const tools = [
        {
            label: "Gratis",
            description: "Todo lo que necesitas para empezar a colaborar.",
            price: "0$CLP/m",
            features: {
                "Boards": "3",
                'Carga de Imagenes': "Hasta 1MB",
                "Capas máximas": "200",
                "Herramientas": "Todas",
                "Equipos": "1",
            }
        },
        {
            label: "Starter",
            description: "Desbloquea espacios de trabajo infinitos con todas las herramientas que necesitas.",
            price: "14.990$CLP/m",
            features: {
                "Boards": "Ilimitados",
                'Carga de Imagenes': "Hasta 10MB",
                "Capas máximas": "1000",
                "Herramientas": "Todas",
                "Soporte": "Básico",
                "Export a PDF": "Sí",
                "Equipos": "10",
            },
        },
        {
            label: "Business",
            description: "Necesitas algo mas personalizado? Contacta con nosotros para obtener para tu empresa.",
            price: "19.990$CLP/m",
            features: {
                "Boards": "Ilimitados",
                'Carga de Imagenes': "Hasta 25MB",
                "Capas máximas": "Ilimitados",
                "Herramientas": "Todas",
                "Soporte": "Básico",
                "Export a PDF": "Sí",
                "Equipos": "Ilimitados",
            },
            extraFeatures: "Proteccón de datos con inicio de sesión único de NextAuth",
            recommended: true
        },
    ]

    const user = useCurrentUser();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const { update } = useSession();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof OrganizationSchema>>({
        resolver: zodResolver(OrganizationSchema),
        defaultValues: {
            name: "",
        }
    });

    if (!user) {
        setError("Unauthorized");
        return;
    }

    if (user.organizations.length > 0) {
        return (
            <DialogHeader>
                <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                    <Badge className="uppercase text-sm py-1" variant="inProgress">
                        Pronto estará disponible
                    </Badge>
                    <div className="flex items-center gap-x-2 font-bold py-1">
                        Sketchlie
                        <Badge className="uppercase text-sm py-1" variant="outline">
                            Pro
                        </Badge>
                    </div>
                </DialogTitle>
                <DialogDescription className="gap-4 text-zinc-900 font-medium flex flex-col md:flex-row overflow-y-auto max-h-[700px]">
                    {tools.map((tool) => (
                        <Card
                            key={tool.label}
                            className={`p-5 md:flex flex-col flex-1 ${tool.recommended && 'border-2 border-custom-blue'}`}>
                            <div className="h-[120px]">
                                <div className="gap-x-4 font-semibold text-xl mb-2 flex ">
                                    {tool.recommended ? 
                                        <>
                                            {tool.label} 
                                            <Badge variant="outline" className="uppercase text-sm py-1">
                                                Recommended
                                            </Badge>
                                        </> 
                                        : tool.label}                                
                                </div>
                                <div className="font-normal text-sm mb-auto">
                                    {tool.description}
                                </div>
                            </div>
                            <div className="flex font-bold text-xl">
                                {tool.price}
                            </div>
                            <div className="flex flex-col gap-y-2 mt-8 flex-1">
                                <p>Todas las características del plan gratis más:</p>
                                {Object.entries(tool.features).map(([feature, value]) => (
                                    <div key={feature} className="flex items-center gap-x-2">
                                        <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                        <span className="text-black-5">{feature}:</span>
                                        <span className="text-black-5 font-bold">{value}</span>
                                    </div>
                                ))}
                                {tool.extraFeatures && (
                                    <div className="flex items-center gap-x-2">
                                        <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                        <span className="text-black-5 font-bold">{tool.extraFeatures}</span>
                                    </div>
                                )}
                            </div>
                            <Button
                                size="lg"
                                className="w-full mt-10"
                                variant="auth"
                            >
                                Mejorar Plan
                                <Zap className="w-4 h-4 ml-2 fill-white" />
                            </Button>
                        </Card>
                    ))}
                </DialogDescription>
            </DialogHeader>
        )
    }

    const onSubmit = (values: z.infer<typeof OrganizationSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            organization(values, user.id)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setSuccess(data.success);
                        update({ event: "session" });
                        if (data.id) {
                            setActiveOrganization(data.id);
                        }
                    }
                });
        });
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>Create Organization</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form
                    className="space-y-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="space-y-4">
                        <FormField
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Organization Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Sebastian's Team"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <DialogClose>
                        <Button
                            disabled={isPending}
                            type="submit"
                            variant="auth"
                        >
                            Create Organization
                        </Button>
                    </DialogClose>
                </form>
            </Form>
        </>
    )
}