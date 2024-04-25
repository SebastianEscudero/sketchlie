export const subscriptionPlans = [
    {
        label: "Gratis",
        description: "Todo lo que necesitas para empezar a colaborar.",
        characteristicsDescription: "Lo necesario para poder colaborar:",
        price: 0,
        features: {
            "Boards": "3",
            'Imágenes': "Hasta 1MB",
            "Capas máximas": "200",
            "Herramientas": "Basicas",
            "Teams": "1",
        }
    },
    {
        label: "Starter",
        description: "Desbloquea espacios de trabajo infinitos con todas las herramientas que necesitas.",
        characteristicsDescription: "Todas las características del plan Gratis más:",
        price: 10,
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
        description: "Necesitas algo mas personalizado? Contacta con nosotros para obtener para tu empresa.",
        characteristicsDescription: "Lleva tu colaboración y seguridad al siguiente nivel:",
        price: 15,
        features: {
            "Boards": "Ilimitados",
            'Imágenes': "Hasta 8MB",
            "Capas máximas": "Ilimitados",
            "Herramientas": "Todas",
            "Soporte": "Avanzado",
            "Teams": "Ilimitados",
        },
        extraFeatures: "Proteccón de datos con inicio de sesión único",
        recommended: true
    },
]