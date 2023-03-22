(() => {
// IIFE - keep global scope tidy
const handleLogin = async (e) => {
    e.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#pwd-login').value.trim();

    if (username && password) {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            // Redirect to homepage
            if (response.ok) {
                document.location.replace('/');
            } else if (response.status === 400) {
                const jsonBody = await response.json();
                alert(jsonBody.message);
            } else {
                alert('Failed to log in.');
            }
        } catch (err) {
            console.error(err);
        }
    }
}

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', handleLogin);

const handleSignUp = async (e) => {
    e.preventDefault();

    const errDisplay = document.querySelector('#err-signup');
    
    // Remove previous error message if one exists
    if (errDisplay.hasChildNodes()) {
        errDisplay.removeChild(errDisplay.firstChild);
    }

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#pwd-signup').value.trim();
    const passwordCheck = document.querySelector('#pwd-check-signup');
    const passwordDuplicate = passwordCheck.value.trim();

    const errMsg = document.createElement('p');
    errMsg.style.color = 'red';

    if (password !== passwordDuplicate) {
        errMsg.textContent = "Passwords do not match";
        passwordCheck.value = '';
        errDisplay.appendChild(errMsg);
        return;
    }

    if (password.length < 8) {
        errMsg.textContent = "Password must be at least 8 characters";
        passwordCheck.value = ''
        errDisplay.appendChild(errMsg);
        return;
    }

    if (username && password) {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify({ name: username, password }),
                headers: { 'Content-Type': 'application/json' },
            });
        
            const jsonBody = await response.json();

            if (response.ok) {
                document.location.replace('/');
            } else if (response.status === 400) {
                alert(jsonBody.message);
            } else {
                console.error(jsonBody); 
                alert('Something went wrong. Please try again');
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong. Press F12 and check the console.');
        }
    }
}

const signUpForm = document.querySelector('#signup-form');
signUpForm.addEventListener('submit', handleSignUp);
// end IIFE
})();