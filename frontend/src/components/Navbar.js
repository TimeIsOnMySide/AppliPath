import { Link } from 'react-router-dom';

const Navbar = () => {
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/logout', {
                method: 'POST',
            });

            if (response.status === 200) {
                localStorage.removeItem('authToken');
                window.location.href = '/login';
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <header>
            <div className="navbar bg-dark bg-gradient">
                <div className="container-fluid">
                    <Link to="/" className="site-title">
                        <h2>AppliPath</h2>
                    </Link>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
