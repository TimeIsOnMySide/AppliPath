import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    };

    return (
        <header>
            <div className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <Link to="/" className="site-title">
                        <h2>AppliPath</h2>
                    </Link>
                    <nav>
                        {user && (
                            <div>
                                <span className="user-email">{user.email}</span>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleClick}
                                >
                                    Log out
                                </button>
                            </div>
                        )}
                        {!user && (
                            <div>
                                <Link to="/login" className="btn-login">
                                    <button className="btn btn-primary">
                                        Login
                                    </button>
                                </Link>

                                <Link to="/signup">
                                    <button className="btn btn-primary">
                                        Sign up
                                    </button>
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
