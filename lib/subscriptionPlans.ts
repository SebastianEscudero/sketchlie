export const subscriptionPlans = [
    {
        label: "Gratis",
        description: "Everything you need to start collaborating.",
        characteristicsDescription: "The essentials for collaboration:",
        price: 0,
        features: {
            "Boards": "3",
            'Images': "Up to 1MB",
            "Maximum layers": "100",
            "Tools": "Basic",
            "Teams": "1",
        }
    },
    {
        label: "Starter",
        description: "Unlock infinite workspaces with all the tools you need.",
        characteristicsDescription: "All features of the Free plan plus:",
        price: 7990,
        features: {
            "Boards": "Unlimited",
            'Images': "Up to 4MB",
            "Maximum layers": "1000",
            "Tools": "All",
            "Support": "Basic",
            "Teams": "10",
        },
    },
    {
        label: "Business",
        description: "Take collaboration and security to the next level.",
        characteristicsDescription: "Get all features of the Starter plan plus:",
        price: 12990,
        features: {
            "Boards": "Unlimited",
            'Images': "Up to 8MB",
            "Maximum layers": "Unlimited",
            "Tools": "All",
            "Support": "Advanced",
            "Teams": "Unlimited",
        },
        extraFeatures: "Data protection with single sign-on",
        recommended: true,
    },
    {
        label: "Enterprise",
        description: "For large teams and organizations that need a custom solution.",
        characteristicsDescription: "The apex of collaboration at your hands, everything you need to create the next big thing.",
    }

]
