import React from 'react';
import './signupstyle.css';

class ValidationMessage extends React.Component {
    render() {
        if (!this.props.valid) {
            return <div className='error-msg'>{this.props.message}</div>;
        }
        return null;
    }
}

class Signup extends React.Component {
    state = {
        username: '',
        usernameValid: false,
        email: '',
        emailValid: false,
        password: '',
        passwordValid: false,
        passwordConfirm: '',
        passwordConfirmValid: false,
        formValid: false,
        errorMsg: {},
        isSignupSuccessful: false,
    };

    validateForm = () => {
        const { usernameValid, emailValid, passwordValid, passwordConfirmValid } = this.state;
        this.setState({
            formValid: usernameValid && emailValid && passwordValid && passwordConfirmValid,
        });
    };
    handleSignup = () => {
        // Perform signup logic here (e.g., API request, database update)
        // Assuming the signup is successful, set isSignupSuccessful to true
        // You can use a state change or an API call here to indicate a successful signup
        // For this example, we'll use a simulated successful signup after a delay.
        setTimeout(() => {
          this.setState({ isSignupSuccessful: true });
        }, 2000); // Simulate a 2-second delay for the signup process
      };
    

    updateUsername = (username) => {
        this.setState({ username }, this.validateUsername);
    };

    validateUsername = () => {
        const { username } = this.state;
        let usernameValid = true;
        let errorMsg = { ...this.state.errorMsg };

        if (username.length < 3) {
            usernameValid = false;
            errorMsg.username = 'Username must be at least 3 characters long';
        }

        this.setState({ usernameValid, errorMsg }, this.validateForm);
    };

    updateEmail = (email) => {
        this.setState({ email }, this.validateEmail);
    };

    validateEmail = () => {
        const { email } = this.state;
        let emailValid = true;
        let errorMsg = { ...this.state.errorMsg };

        // Check for email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailValid = false;
            errorMsg.email = 'Invalid email format';
        }

        this.setState({ emailValid, errorMsg }, this.validateForm);
    };

    updatePassword = (password) => {
        this.setState({ password }, this.validatePassword);
    };

    validatePassword = () => {
        const { password } = this.state;
        let passwordValid = true;
        let errorMsg = { ...this.state.errorMsg };

        // Password strength checks
        if (password.length < 6) {
            passwordValid = false;
            errorMsg.password = 'Password must be at least 6 characters long';
        } else if (!/\d/.test(password)) {
            passwordValid = false;
            errorMsg.password = 'Password must contain at least one digit';
        } else if (!/[!@#$%^&*]/.test(password)) {
            passwordValid = false;
            errorMsg.password = 'Password must contain at least one special character: !@#$%^&*';
        }

        this.setState({ passwordValid, errorMsg }, this.validateForm);
    };

    updatePasswordConfirm = (passwordConfirm) => {
        this.setState({ passwordConfirm }, this.validatePasswordConfirm);
    };

    validatePasswordConfirm = () => {
        const { passwordConfirm, password } = this.state;
        let passwordConfirmValid = true;
        let errorMsg = { ...this.state.errorMsg };

        // Check if passwords match
        if (password !== passwordConfirm) {
            passwordConfirmValid = false;
            errorMsg.passwordConfirm = 'Passwords do not match';
        }

        this.setState({ passwordConfirmValid, errorMsg }, this.validateForm);
        
    };

    render() {
        return (
            <div >
            <div className="App">
                <header>SIGN UP </header>
                <main role="main">{this.state.isSignupSuccessful ? (
                    <div className="success-msg">Signup successful! You can now log in.</div>
                ) : (
                    <form action="#" id="js-form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="form-field"
                                value={this.state.username}
                                onChange={(e) => this.updateUsername(e.target.value)}
                            />
                            <ValidationMessage valid={this.state.usernameValid} message={this.state.errorMsg.username} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-field"
                                value={this.state.email}
                                onChange={(e) => this.updateEmail(e.target.value)}
                            />
                            <ValidationMessage valid={this.state.emailValid} message={this.state.errorMsg.email} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-field"
                                value={this.state.password}
                                onChange={(e) => this.updatePassword(e.target.value)}
                            />
                            <ValidationMessage valid={this.state.passwordValid} message={this.state.errorMsg.password} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password-confirmation">Password Confirmation</label>
                            <input
                                type="password"
                                id="password-confirmation"
                                name="password-confirmation"
                                className="form-field"
                                value={this.state.passwordConfirm}
                                onChange={(e) => this.updatePasswordConfirm(e.target.value)}
                            />
                            <ValidationMessage
                                valid={this.state.passwordConfirmValid}
                                message={this.state.errorMsg.passwordConfirm}
                            />
                        </div>

                        <div className="form-controls">
                            <button className="button" type="submit" onClick={this.handleSignup} disabled={!this.state.formValid}>
                                Sign Up
                            </button>
                        </div>
                    </form>)

                }

                </main>
            </div>
            </div>
        );
    }
}

export default Signup;

