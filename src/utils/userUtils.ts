export const getCurrentUserId = (token: string | null): string | null => {
    if (!token) return null;

    try {
        const tokenParts = token.split('.');
        if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            return payload.user_id || payload.userId || payload.sub || payload.id || null;
        }
    } catch (error) {
        console.error('Error decoding token:', error);
    }
    return null;
};
