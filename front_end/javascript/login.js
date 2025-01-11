

document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        const userNameElement = document.getElementById('user_name');
        const popUpMessageElement = document.getElementsByClassName('pop_up_message')[0];
        const navbarElement = document.getElementsByClassName('navbar')[0];

        if (userNameElement) {
            userNameElement.textContent = user.name;
            console.log(userNameElement.textContent);
        }

        if (popUpMessageElement) {
            popUpMessageElement.classList.add('hidden');
        }

        if (navbarElement) {
            navbarElement.classList.remove('hidden');
        }
    }

    const signUpSubmit = document.getElementById('sign_up_submit');
    if (signUpSubmit) {
        signUpSubmit.addEventListener('click', async () => {
            const name = document.getElementById('sign_up_username').value.trim();
            const password = document.getElementById('sign_up_password').value.trim();
            const error = document.getElementById('signup_error');

            if (name && password) {
                try {
                    // const simulatedResponse = {
                    //     ok: true, // Set to false to test the else block
                    //     json: async () => ({ message: 'Test message' }) // Simulating the json method
                    // };
                    // const response = simulatedResponse;
                    const response = await fetch('http://localhost:4000/api/user/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(
                            {   name,
                                password }
                        ),
                    });
                    const data = await response.json();

                    if (response.ok) {
                        alert('Sign Up Successful!');
                        error.style.display = 'none';
                        document.getElementById('sign_up_username').value = '';
                        document.getElementById('sign_up_password').value = '';
                        sessionStorage.setItem('user', JSON.stringify({ name, password }));

                    } else {
                        error.textContent = data.message || 'Sign Up Failed!';
                        error.style.display = 'block';
                    }
                } catch (err) {
                    error.textContent = 'An error occurred. Please try again later.';
                    error.style.display = 'block';
                }
            } else {
                console.log(error);
                error.textContent = 'All fields are required!';
                error.style.display = 'block';
            }
        });
    }

    const logInSubmit = document.getElementById('log_in_submit');
    if (logInSubmit) {
        logInSubmit.addEventListener('click', async (key, value) => {
            const name = document.getElementById('login_username').value.trim();
            const password = document.getElementById('login_password').value.trim();
            const error = document.getElementById('login_error');
            const userNameElement = document.getElementById('user_name');

            if (password) {
                try {
                    // const simulatedResponse = {
                    //     ok: true, // Set to false to test the else block
                    //     json: async () => ({
                    //         user: {
                    //             name: 'C4-621'
                    //         }
                    //     }) // Simulating the json method with user object
                    // };
                    // const response = simulatedResponse;

                    const response = await fetch('http://localhost:4000/api/user/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ name, password }),
                    });
                    const data = await response.json();

                    if (response.ok) {
                        alert(`Welcome back, ${data.user.name}!`);
                        error.style.display = 'none';
                        userNameElement.textContent = data.user.name;
                        sessionStorage.setItem('user', JSON.stringify(data.user));
                        document.getElementById('login_username').value = '';
                        document.getElementById('login_password').value = '';
                        document.getElementsByClassName('pop_up_message')[0].classList.add('hidden');
                        document.getElementsByClassName('navbar')[0].classList.remove('hidden');
                    } else {
                        error.textContent = data.message || 'Invalid email or password.';
                        error.style.display = 'block';
                    }
                } catch (err) {
                    console.log(err);
                    error.textContent = 'An error occurred. Please try again later.';
                    error.style.display = 'block';
                }
            } else {
                error.textContent = 'All fields are required!';
                error.style.display = 'block';
            }
        });
    }
});

