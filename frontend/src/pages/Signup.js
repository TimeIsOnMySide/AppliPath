import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(email, password);
    };

    return (
        <div className="signup-page">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h3>Sign up</h3>
                <label className="email-label"></label>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="email-input"
                    placeholder="Email Address"
                ></input>

                <label className="password-label"></label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="password-input"
                    placeholder="Password"
                ></input>

                <button disabled={isLoading} className="btn btn-primary">
                    Sign up
                </button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default Signup;
