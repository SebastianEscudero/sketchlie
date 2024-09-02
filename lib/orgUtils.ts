export function getPlanColor(plan: string) {
    switch (plan) {
        case 'Gratis':
            return { color: '#9333ea', letterColor: '#FFFFFF' };
        case 'Starter':
            return { color: '#F59E0B', letterColor: '#000000' };
        case 'Business':
            return { color: '#2631c3', letterColor: '#FFFFFF' };
        default:
            return { color: '#6C47FF', letterColor: '#FFFFFF' };
    }
}