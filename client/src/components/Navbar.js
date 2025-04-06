import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './auth/LoginButton';
import LogoutButton from './auth/LogoutButton';
import logo from '../assets/images/carpooly-logo.png';

const Navbar = () => {
    const { isAuthenticated, user } = useAuth0();
    const userFirstName = isAuthenticated ? user.name.split(' ')[0] : '';

    return (
        <nav className="bg-gray-800 p-4 sticky top-0 z-50">
            <div className="container mx-auto px-16 flex justify-between items-center">
                <div>
                    <Link to="/">
                        <img className="h-8" src={logo} alt="Logo" />
                    </Link>
                </div>
                <div className="space-x-4 flex items-center">
                    <Link to="/user-dashboard" className="text-white hover:text-gray-300">
                        User Dashboard
                    </Link>
                    {isAuthenticated && (
                        <div className="flex items-center">
                            <div className="h-8 w-8 flex items-center justify-center bg-blue-500 text-white rounded-full text-sm mr-4">
                                {userFirstName[0]}
                            </div>
                            <LogoutButton />
                        </div>
                    )}
                    {!isAuthenticated && <LoginButton />}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
