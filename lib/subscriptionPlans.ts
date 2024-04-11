export const subscriptionPlans = [
    {
        label: "Gratis",
        description: "Todo lo que necesitas para empezar a colaborar.",
        price: 0,
        features: {
            "Boards": "3",
            'Imagenes': "Hasta 1MB",
            "Capas máximas": "200",
            "Herramientas": "Basicas",
            "Teams": "1",
            "Team members": "Ilimitados",
        }
    },
    {
        label: "Starter",
        description: "Desbloquea espacios de trabajo infinitos con todas las herramientas que necesitas.",
        price: 12990,
        features: {
            "Boards": "Ilimitados",
            'Imagenes': "Hasta 10MB",
            "Capas máximas": "1000",
            "Herramientas": "Todas",
            "Soporte": "Básico",
            "Export a PDF": "Sí",
            "Teams": "10",
            "Team members": "Ilimitados",
        },
    },
    {
        label: "Business",
        description: "Necesitas algo mas personalizado? Contacta con nosotros para obtener para tu empresa.",
        price: 17990,
        features: {
            "Boards": "Ilimitados",
            'Imagenes': "Hasta 25MB",
            "Capas máximas": "Ilimitados",
            "Herramientas": "Todas",
            "Soporte": "Básico",
            "Export a PDF": "Sí",
            "Teams": "Ilimitados",
            "Team members": "Ilimitados",
        },
        extraFeatures: "Proteccón de datos con inicio de sesión único",
        recommended: true
    },
]