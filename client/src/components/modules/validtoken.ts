async function validateRefreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
        return false; // No refresh token present
    }

    const response = await fetch('/validate-refresh-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: refreshToken }),
    });

    return response.ok; // Return true if valid, false if not
}
