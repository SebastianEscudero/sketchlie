export const subscriptionPlans = [
    {
        label: "Gratis",
        description: "Todo lo que necesitas para empezar a colaborar.",
        characteristicsDescription: "Lo necesario para poder colaborar:",
        price: 0,
        features: {
            "Boards": "3",
            'Imágenes': "Hasta 1MB",
            "Capas máximas": "100",
            "Herramientas": "Basicas",
            "Teams": "1",
        }
    },
    {
        label: "Starter",
        description: "Desbloquea espacios de trabajo infinitos con todas las herramientas que necesitas.",
        characteristicsDescription: "Todas las características del plan Gratis más:",
        price: 7990,
        features: {
            "Boards": "Ilimitados",
            'Imágenes': "Hasta 4MB",
            "Capas máximas": "1000",
            "Herramientas": "Todas",
            "Soporte": "Básico",
            "Teams": "10",
        },
    },
    {
        label: "Business",
        description: "Lleva la colaboración y la seguridad al siguiente nivel.",
        characteristicsDescription: "Obtén todas las características del plan Starter más:",
        price: 12990,
        features: {
            "Boards": "Ilimitados",
            'Imágenes': "Hasta 8MB",
            "Capas máximas": "Ilimitados",
            "Herramientas": "Todas",
            "Soporte": "Avanzado",
            "Teams": "Ilimitados",
        },
        extraFeatures: "Proteccón de datos con inicio de sesión único",
        recommended: true,
    },
    {
        label: "Enterprise",
        description: "Para equipos grandes y organizaciones que necesitan una solución personalizada.",
        characteristicsDescription: "Para equipos grandes y organizaciones que necesitan una solución personalizada.",
    }
]
