import Link from "next/link";
import React from "react";

export const lineaDeTiempoTranslations = {
    es: {
        metadata: {
            title: "Crea una Línea de Tiempo Online | Sketchlie",
            description: "Diseña líneas de tiempo interactivas y visualmente atractivas con Sketchlie. Organiza eventos, planifica proyectos y visualiza la historia de forma eficiente.",
            keywords: ["línea de tiempo", "timeline online", "herramienta de planificación", "visualización de eventos"],
            alternates: {
                canonical: "https://www.sketchlie.com/es/linea-de-tiempo/",
            }
        },
        breadcrumbs: {
            home: "Inicio",
            lineaDeTiempo: "Línea de Tiempo"
        },
        title: "Crea Líneas de Tiempo Impactantes",
        description: "Visualiza eventos, planifica proyectos y cuenta historias de manera efectiva con nuestras herramientas de línea de tiempo online. Sketchlie te ofrece una plataforma intuitiva para crear líneas de tiempo interactivas y visualmente atractivas.",
        cta: "Crea tu Línea de Tiempo Gratis",
        sections: [
            {
                title: "Visualiza la Historia con Claridad",
                text: React.createElement(React.Fragment, null,
                    "Transforma datos complejos en narrativas visuales convincentes con las líneas de tiempo de Sketchlie. Ya sea que estés mapeando la historia de tu empresa, planificando un proyecto a largo plazo o presentando una secuencia de eventos históricos, nuestra ",
                    React.createElement(Link, { href: "/es/plantillas/linea-de-tiempo/", className: "text-custom-blue hover:underline" }, "plantilla de línea de tiempo"),
                    " te ayudará a comunicar tu mensaje de manera efectiva y memorable."
                ),
                alt: "Línea de Tiempo Histórica",
                img: "/placeholders/modelo-canvas.png",
                side: "right"
            },
            {
                title: "Planificación de Proyectos Simplificada",
                text: "Optimiza la gestión de tus proyectos con líneas de tiempo interactivas. Visualiza fases, hitos y deadlines de manera clara, permitiendo a tu equipo comprender fácilmente el progreso y los próximos pasos. Con Sketchlie, la planificación y seguimiento de proyectos se vuelve más intuitiva y eficiente.",
                text2: "Nuestras herramientas de colaboración en tiempo real aseguran que todos los miembros del equipo estén sincronizados y actualizados sobre el estado del proyecto.",
                alt: "Línea de Tiempo de Proyecto",
                img: "/placeholders/mapa-de-procesos.png",
                side: "right"
            },
            {
                title: "Presenta Datos de Forma Impactante",
                text: "Convierte datos y estadísticas en visualizaciones atractivas con nuestras líneas de tiempo personalizables. Ideal para presentaciones, informes y análisis de tendencias, Sketchlie te permite crear líneas de tiempo que no solo informan, sino que también cautivan a tu audiencia.",
                text2: "Integra fácilmente gráficos, imágenes y enlaces para enriquecer tu línea de tiempo y proporcionar un contexto más profundo.",
                alt: "Línea de Tiempo de Datos",
                img: "/placeholders/lluvia-de-ideas.png",
                side: "right"
            },
            {
                title: "Colaboración Sin Límites",
                text: "Fomenta la colaboración efectiva en tu equipo con nuestras funciones de edición en tiempo real. Trabaja simultáneamente en la misma línea de tiempo, compartiendo ideas y realizando ajustes al instante. Perfecto para equipos remotos o distribuidos, Sketchlie asegura que todos estén en la misma página, literalmente.",
                alt: "Colaboración en Línea de Tiempo",
                img: "/placeholders/diagrama-ishikawa.png",
                side: "right"
            }
        ],
        steps: [
            {
                trigger: "1. Definir el propósito",
                text: "Determina el objetivo de tu línea de tiempo. ¿Es para un proyecto, para visualizar la historia de una empresa, o para planificar eventos futuros?"
            },
            {
                trigger: "2. Recopilar información",
                text: "Reúne todos los datos relevantes, incluyendo fechas, eventos, hitos y cualquier detalle importante que quieras incluir en tu línea de tiempo."
            },
            {
                trigger: "3. Organizar cronológicamente",
                text: "Ordena tus eventos de forma cronológica. Decide si tu línea de tiempo será ascendente (del pasado al futuro) o descendente."
            },
            {
                trigger: "4. Diseñar la línea de tiempo",
                text: "Utiliza las herramientas de Sketchlie para crear una representación visual atractiva. Añade elementos gráficos, colores y formas para mejorar la legibilidad y el atractivo visual."
            },
            {
                trigger: "5. Añadir detalles y contexto",
                text: "Incluye descripciones breves, imágenes o enlaces para proporcionar más contexto a cada evento o hito en tu línea de tiempo."
            }
        ],
        faqData: [
            {
                value: "item-1",
                trigger: "¿Qué es una línea de tiempo y para qué se utiliza?",
                content: "Una línea de tiempo es una representación gráfica que muestra eventos o hitos en orden cronológico. Se utiliza para visualizar la secuencia de eventos históricos, planificar proyectos, mostrar la evolución de una empresa o producto, y organizar información de manera clara y concisa."
            },
            {
                value: "item-2",
                trigger: "¿Qué tipos de líneas de tiempo puedo crear con Sketchlie?",
                content: "Con Sketchlie, puedes crear una amplia variedad de líneas de tiempo, incluyendo líneas de tiempo históricas, líneas de tiempo de proyectos, líneas de tiempo biográficas, líneas de tiempo de productos, y líneas de tiempo interactivas para presentaciones o sitios web."
            },
            {
                value: "item-3",
                trigger: "¿Cómo puedo personalizar mi línea de tiempo en Sketchlie?",
                content: "Sketchlie ofrece numerosas opciones de personalización. Puedes ajustar colores, fuentes, formas y estilos de línea. También puedes añadir imágenes, iconos y enlaces para hacer tu línea de tiempo más interactiva y atractiva visualmente."
            },
            {
                value: "item-4",
                trigger: "¿Puedo colaborar con otros en la creación de una línea de tiempo?",
                content: "Sí, Sketchlie permite la colaboración en tiempo real. Puedes invitar a miembros de tu equipo para trabajar juntos en la misma línea de tiempo, haciendo que sea fácil coordinar y compartir información en proyectos grupales."
            },
            {
                value: "item-5",
                trigger: "¿Es posible exportar o compartir mi línea de tiempo una vez terminada?",
                content: "Absolutamente. Sketchlie te permite exportar tu línea de tiempo en varios formatos, incluyendo PNG, PDF y SVG. También puedes compartir un enlace directo a tu línea de tiempo para que otros puedan verla o editarla, dependiendo de los permisos que establezcas."
            }
        ],
        verMas: [
            {
                title: "Cómo hacer una línea de tiempo",
                href: "/es/linea-de-tiempo/que-es-linea-de-tiempo/"
            },
            {
                title: "Tipos de líneas de tiempo",
                href: "/es/linea-de-tiempo/que-es-linea-de-tiempo/"
            },
            {
                title: "Razones para hacer un cronograma",
                href: "/es/linea-de-tiempo/que-es-linea-de-tiempo/"
            }
        ]
    },
    en: {
        metadata: {
            title: "Create an Online Timeline | Sketchlie",
            description: "Design interactive and visually appealing timelines with Sketchlie. Organize events, plan projects, and visualize history efficiently.",
            keywords: ["timeline", "online timeline", "planning tool", "event visualization"],
            alternates: {
                canonical: "https://www.sketchlie.com/en/linea-de-tiempo/",
            }
        },
        breadcrumbs: {
            home: "Home",
            lineaDeTiempo: "Timeline"
        },
        title: "Create Impactful Timelines",
        description: "Visualize events, plan projects, and tell stories effectively with our online timeline tools. Sketchlie offers you an intuitive platform to create interactive and visually appealing timelines.",
        cta: "Create Your Timeline for Free",
        sections: [
            {
                title: "Visualize History with Clarity",
                text: React.createElement(React.Fragment, null,
                    "Transform complex data into compelling visual narratives with Sketchlie's timelines. Whether you're mapping your company's history, planning a long-term project, or presenting a sequence of historical events, our ",
                    React.createElement(Link, { href: "/en/plantillas/linea-de-tiempo/", className: "text-custom-blue hover:underline" }, "timeline template"),
                    " will help you communicate your message effectively and memorably."
                ),
                alt: "Historical Timeline",
                img: "/placeholders/modelo-canvas.png",
                side: "right"
            },
            {
                title: "Simplified Project Planning",
                text: "Optimize your project management with interactive timelines. Clearly visualize phases, milestones, and deadlines, allowing your team to easily understand progress and next steps. With Sketchlie, project planning and tracking becomes more intuitive and efficient.",
                text2: "Our real-time collaboration tools ensure that all team members are synchronized and updated on the project status.",
                alt: "Project Timeline",
                img: "/placeholders/mapa-de-procesos.png",
                side: "right"
            },
            {
                title: "Present Data in an Impactful Way",
                text: "Convert data and statistics into attractive visualizations with our customizable timelines. Ideal for presentations, reports, and trend analysis, Sketchlie allows you to create timelines that not only inform but also captivate your audience.",
                text2: "Easily integrate graphics, images, and links to enrich your timeline and provide deeper context.",
                alt: "Data Timeline",
                img: "/placeholders/lluvia-de-ideas.png",
                side: "right"
            },
            {
                title: "Limitless Collaboration",
                text: "Foster effective collaboration in your team with our real-time editing features. Work simultaneously on the same timeline, sharing ideas and making adjustments instantly. Perfect for remote or distributed teams, Sketchlie ensures everyone is on the same page, literally.",
                alt: "Timeline Collaboration",
                img: "/placeholders/diagrama-ishikawa.png",
                side: "right"
            }
        ],
        steps: [
            {
                trigger: "1. Define the purpose",
                text: "Determine the objective of your timeline. Is it for a project, to visualize a company's history, or to plan future events?"
            },
            {
                trigger: "2. Gather information",
                text: "Collect all relevant data, including dates, events, milestones, and any important details you want to include in your timeline."
            },
            {
                trigger: "3. Organize chronologically",
                text: "Order your events chronologically. Decide if your timeline will be ascending (from past to future) or descending."
            },
            {
                trigger: "4. Design the timeline",
                text: "Use Sketchlie's tools to create an attractive visual representation. Add graphic elements, colors, and shapes to enhance readability and visual appeal."
            },
            {
                trigger: "5. Add details and context",
                text: "Include brief descriptions, images, or links to provide more context to each event or milestone in your timeline."
            }
        ],
        faqData: [
            {
                value: "item-1",
                trigger: "What is a timeline and what is it used for?",
                content: "A timeline is a graphical representation that shows events or milestones in chronological order. It is used to visualize the sequence of historical events, plan projects, show the evolution of a company or product, and organize information in a clear and concise manner."
            },
            {
                value: "item-2",
                trigger: "What types of timelines can I create with Sketchlie?",
                content: "With Sketchlie, you can create a wide variety of timelines, including historical timelines, project timelines, biographical timelines, product timelines, and interactive timelines for presentations or websites."
            },
            {
                value: "item-3",
                trigger: "How can I customize my timeline in Sketchlie?",
                content: "Sketchlie offers numerous customization options. You can adjust colors, fonts, shapes, and line styles. You can also add images, icons, and links to make your timeline more interactive and visually appealing."
            },
            {
                value: "item-4",
                trigger: "Can I collaborate with others in creating a timeline?",
                content: "Yes, Sketchlie allows real-time collaboration. You can invite team members to work together on the same timeline, making it easy to coordinate and share information in group projects."
            },
            {
                value: "item-5",
                trigger: "Is it possible to export or share my timeline once it's finished?",
                content: "Absolutely. Sketchlie allows you to export your timeline in various formats, including PNG, PDF, and SVG. You can also share a direct link to your timeline for others to view or edit, depending on the permissions you set."
            }
        ],
        verMas: [
            {
                title: "How to make a timeline",
                href: "/en/linea-de-tiempo/que-es-linea-de-tiempo/"
            },
            {
                title: "Types of timelines",
                href: "/en/linea-de-tiempo/que-es-linea-de-tiempo/"
            },
            {
                title: "Reasons to make a timeline",
                href: "/en/linea-de-tiempo/que-es-linea-de-tiempo/"
            }
        ]
    },
    pt: {
        metadata: {
            title: "Crie uma Linha do Tempo Online | Sketchlie",
            description: "Desenhe linhas do tempo interativas e visualmente atraentes com o Sketchlie. Organize eventos, planeje projetos e visualize a história de forma eficiente.",
            keywords: ["linha do tempo", "timeline online", "ferramenta de planejamento", "visualização de eventos"],
            alternates: {
                canonical: "https://www.sketchlie.com/pt/linea-de-tiempo/",
            }
        },
        breadcrumbs: {
            home: "Início",
            lineaDeTiempo: "Linha do Tempo"
        },
        title: "Crie Linhas do Tempo Impactantes",
        description: "Visualize eventos, planeje projetos e conte histórias de forma eficaz com nossas ferramentas de linha do tempo online. O Sketchlie oferece uma plataforma intuitiva para criar linhas do tempo interativas e visualmente atraentes.",
        cta: "Crie sua Linha do Tempo Grátis",
        sections: [
            {
                title: "Visualize a História com Clareza",
                text: React.createElement(React.Fragment, null,
                    "Transforme dados complexos em narrativas visuais convincentes com as linhas do tempo do Sketchlie. Seja mapeando a história da sua empresa, planejando um projeto de longo prazo ou apresentando uma sequência de eventos históricos, nosso ",
                    React.createElement(Link, { href: "/pt/plantillas/linea-de-tiempo/", className: "text-custom-blue hover:underline" }, "modelo de linha do tempo"),
                    " ajudará você a comunicar sua mensagem de forma eficaz e memorável."
                ),
                alt: "Linha do Tempo Histórica",
                img: "/placeholders/modelo-canvas.png",
                side: "right"
            },
            {
                title: "Planejamento de Projetos Simplificado",
                text: "Otimize o gerenciamento de seus projetos com linhas do tempo interativas. Visualize fases, marcos e prazos de forma clara, permitindo que sua equipe compreenda facilmente o progresso e os próximos passos. Com o Sketchlie, o planejamento e acompanhamento de projetos se torna mais intuitivo e eficiente.",
                text2: "Nossas ferramentas de colaboração em tempo real garantem que todos os membros da equipe estejam sincronizados e atualizados sobre o status do projeto.",
                alt: "Linha do Tempo de Projeto",
                img: "/placeholders/mapa-de-procesos.png",
                side: "right"
            },
            {
                title: "Apresente Dados de Forma Impactante",
                text: "Converta dados e estatísticas em visualizações atraentes com nossas linhas do tempo personalizáveis. Ideal para apresentações, relatórios e análise de tendências, o Sketchlie permite que você crie linhas do tempo que não apenas informam, mas também cativam sua audiência.",
                text2: "Integre facilmente gráficos, imagens e links para enriquecer sua linha do tempo e fornecer um contexto mais profundo.",
                alt: "Linha do Tempo de Dados",
                img: "/placeholders/lluvia-de-ideas.png",
                side: "right"
            },
            {
                title: "Colaboração Sem Limites",
                text: "Fomente a colaboração efetiva em sua equipe com nossas funções de edição em tempo real. Trabalhe simultaneamente na mesma linha do tempo, compartilhando ideias e fazendo ajustes instantaneamente. Perfeito para equipes remotas ou distribuídas, o Sketchlie garante que todos estejam na mesma página, literalmente.",
                alt: "Colaboração em Linha do Tempo",
                img: "/placeholders/diagrama-ishikawa.png",
                side: "right"
            }
        ],
        steps: [
            {
                trigger: "1. Definir o propósito",
                text: "Determine o objetivo da sua linha do tempo. É para um projeto, para visualizar a história de uma empresa ou para planejar eventos futuros?"
            },
            {
                trigger: "2. Coletar informações",
                text: "Reúna todos os dados relevantes, incluindo datas, eventos, marcos e quaisquer detalhes importantes que você queira incluir em sua linha do tempo."
            },
            {
                trigger: "3. Organizar cronologicamente",
                text: "Ordene seus eventos cronologicamente. Decida se sua linha do tempo será ascendente (do passado para o futuro) ou descendente."
            },
            {
                trigger: "4. Desenhar a linha do tempo",
                text: "Use as ferramentas do Sketchlie para criar uma representação visual atraente. Adicione elementos gráficos, cores e formas para melhorar a legibilidade e o apelo visual."
            },
            {
                trigger: "5. Adicionar detalhes e contexto",
                text: "Inclua descrições breves, imagens ou links para fornecer mais contexto a cada evento ou marco em sua linha do tempo."
            }
        ],
        faqData: [
            {
                value: "item-1",
                trigger: "O que é uma linha do tempo e para que é usada?",
                content: "Uma linha do tempo é uma representação gráfica que mostra eventos ou marcos em ordem cronológica. É usada para visualizar a sequência de eventos históricos, planejar projetos, mostrar a evolução de uma empresa ou produto e organizar informações de maneira clara e concisa."
            },
            {
                value: "item-2",
                trigger: "Que tipos de linhas do tempo posso criar com o Sketchlie?",
                content: "Com o Sketchlie, você pode criar uma ampla variedade de linhas do tempo, incluindo linhas do tempo históricas, linhas do tempo de projetos, linhas do tempo biográficas, linhas do tempo de produtos e linhas do tempo interativas para apresentações ou sites."
            },
            {
                value: "item-3",
                trigger: "Como posso personalizar minha linha do tempo no Sketchlie?",
                content: "O Sketchlie oferece numerosas opções de personalização. Você pode ajustar cores, fontes, formas e estilos de linha. Também pode adicionar imagens, ícones e links para tornar sua linha do tempo mais interativa e visualmente atraente."
            },
            {
                value: "item-4",
                trigger: "Posso colaborar com outros na criação de uma linha do tempo?",
                content: "Sim, o Sketchlie permite colaboração em tempo real. Você pode convidar membros da sua equipe para trabalhar juntos na mesma linha do tempo, facilitando a coordenação e o compartilhamento de informações em projetos em grupo."
            },
            {
                value: "item-5",
                trigger: "É possível exportar ou compartilhar minha linha do tempo depois de terminada?",
                content: "Absolutamente. O Sketchlie permite que você exporte sua linha do tempo em vários formatos, incluindo PNG, PDF e SVG. Você também pode compartilhar um link direto para sua linha do tempo para que outros possam visualizá-la ou editá-la, dependendo das permissões que você definir."
            }
        ],
        verMas: [
            {
                title: "Como fazer uma linha do tempo",
                href: "/pt/linea-de-tiempo/que-es-linea-de-tiempo/"
            },
            {
                title: "Tipos de linhas do tempo",
                href: "/pt/linea-de-tiempo/que-es-linea-de-tiempo/"
            },
            {
                title: "Razões para fazer uma linha do tempo",
                href: "/pt/linea-de-tiempo/que-es-linea-de-tiempo/"
            }
        ]
    }
};