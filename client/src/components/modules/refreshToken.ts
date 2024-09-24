async function handleTokenRefresh() {
    const refreshToken = localStorage.getItem('refreshToken');

    const response = await fetch('/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: refreshToken }),
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
    } else {
        console.error('Refresh token failed, user needs to log in again.');
        // Optionally, redirect to login or clear stored tokens
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
}