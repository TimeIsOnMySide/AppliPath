import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(email, password);
    };

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit}>
                <h3>Login</h3>

                <label className="email-label"></label>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="email-input"
                    placeholder="Email Address"
                />
                <label className="password-label"></label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="password-input"
                    placeholder="Password"
                />

                <button disabled={isLoading} className="btn btn-primary">
                    Login
                </button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default Login;
