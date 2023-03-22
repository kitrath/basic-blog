(() => {
// IIFE - keep global scope tidy
const handleLogin = async (e) => {
    e.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#pwd-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        // Redirect to homepage
        if (response.ok) {
            document.location.replace('/');
        } else if (response.status === 400) {
            alert(response.body.message);
        } else {
            alert('Failed to log in.');
        }
    }
}

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', handleLogin);
// end IIFE
})();