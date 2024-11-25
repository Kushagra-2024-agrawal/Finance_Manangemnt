document.getElementById('authForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email') ? document.getElementById('email').value : null;
    const errorMessage = document.getElementById('errorMessage');
    const isLogin = document.getElementById('submitButton').textContent === 'Login';

    if (isLogin) {
        // Login logic
        const storedUser = JSON.parse(localStorage.getItem(username));
        if (storedUser && storedUser.password === password) {
            alert('Login successful!');
            errorMessage.textContent = '';
            window.location.href = 'dashboard.html'; // Redirect to dashboard.html
        } else {
            errorMessage.textContent = 'Invalid username or password';
        }
    } else {
        // Registration logic
        if (localStorage.getItem(username)) {
            errorMessage.textContent = 'Username already exists';
        } else {
            const user = { username, password, email };
            localStorage.setItem(username, JSON.stringify(user));
            alert('Registration successful! You can now log in.');
            toggleForm();
        }
    }
});

document.getElementById('toggleForm').addEventListener('click', function(event) {
    event.preventDefault();
    toggleForm();
});

function toggleForm() {
    const isLogin = document.getElementById('submitButton').textContent === 'Login';
    document.getElementById('formTitle').textContent = isLogin ? 'Sign Up' : 'Login';
    document.getElementById('submitButton').textContent = isLogin ? 'Sign Up' : 'Login';
    document.getElementById('toggleForm').textContent = isLogin ? 'Already have an account? Log in here' : 'New user? Sign up here';
    document.getElementById('additionalFields').style.display = isLogin ? 'block' : 'none';
    document.getElementById('errorMessage').textContent = '';
}