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
            <div className="navbar bg-dark bg-gradient">
                <div className="container-fluid">
                    <Link to="/" className="site-title">
                        <h2>AppliPath</h2>
                    </Link>
                    <nav>
                        {user && (
                            <div>
                                <span>{user.email}</span>
                                <button onClick={handleClick}>Log out</button>
                            </div>
                        )}
                        {!user && (
                            <div>
                                <Link to="/login">Login</Link>
                                <Link to="/signup">Sign up</Link>
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
