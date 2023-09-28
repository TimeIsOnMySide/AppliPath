import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <div className="navbar bg-dark bg-gradient">
                <div className="container-fluid">
                    <Link to="/" className="site-title">
                        <h2>AppliPath</h2>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
