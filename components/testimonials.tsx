import { Card, CardContent, CardHeader, CardTitle } from "./card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Max Smith",
        avatar: "M",
        title: "CRM Manager",
        description: `"Sketchlie is awesome!. It helps me enhance the overall editing process and collaborate with my team in real time."`
    },
    {
        name: "Alonso Rodríguez",
        avatar: "A",
        title: "Teacher",
        description: `"Sketchlie is a great tool for educators. It helps me create engaging and interactive lessons for my students."`
    },
    {
        name: "Fernando Garcia",
        avatar: "F",
        title: "Student",
        description: `"Sketchlie is a game-changer for me. It helps me understand complex concepts and solve problems in a fun and interactive way."`
    },
    {
        name: "Diego Escudero",
        avatar: "D",
        title: "Engineer",
        description: `"Sketchlie is an invaluable resource for professionals. It streamlines my workflow and fosters effective team collaboration."`
    },
    {
        name: "Mariana Sánchez",
        avatar: "M",
        title: "Designer",
        description: `"I love using Sketchlie to create and share my ideas and projects in real time. It is a great tool for professionals and students."`
    },
    {
        name: "Javier Pérez",
        avatar: "J",
        title: "Developer",
        description: `"I use Sketchlie to create and share my projects with my team. It is a great tool for developers and designers."`
    }
]

export const Testimonials = () => {
    return (
        <Carousel
        plugins={[
            Autoplay({
                delay: 6000,
            }),
            ]}
            className="mx-[10%]"
    >
        <CarouselContent>
            {testimonials.map((item) => (
            <CarouselItem key={item.description}>
                <Card key={item.description} className="bg-[#FFFFFF] border-black text-black rounded-2xl lg:mx-[30%] sm:mx-[10%] mx-[2%]">
                    <CardHeader>
                    <CardTitle className="flex gap-x-2">
                        <div className="flex items-center justify-center w-9 h-9 bg-custom-blue rounded-full">
                            <p className="text-white font-bold text-sm text-md">{item.avatar}</p>
                        </div>
                        <div>
                            <p className="text-sm">{item.name}</p>
                            <p className="text-[#535151] text-sm">{item.title}</p>
                        </div>
                    </CardTitle>
                    <CardContent className="px-0 text-lg font-semibold">
                        <div className="flex justify-start mb-2">
                                <Star fill="#EAB308" className="w-4 h-4"/>
                                <Star fill="#EAB308" className="w-4 h-4"/>
                                <Star fill="#EAB308" className="w-4 h-4"/>
                                <Star fill="#EAB308" className="w-4 h-4"/>
                                <Star fill="#EAB308" className="w-4 h-4"/>
                            </div>
                        {item.description}
                    </CardContent>
                    </CardHeader>
                </Card>
            </CarouselItem>
            ))}
        </CarouselContent>
    </Carousel>
    )
}