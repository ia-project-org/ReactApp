import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Bell, LogOut} from 'lucide-react';
import {Notification} from "@/models/Notification.ts";
import {useAppContext} from "@/context/AppContext.tsx";
import {useAuth} from "@/keycloak/Authentification.tsx";
import {NotificationDropdown} from "@/components/dashboard/NotificationDropdown.tsx";
import {getNotifications} from "@/api/_callApi.ts";
import {jwtDecode} from "jwt-decode";

const ROUTES = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Recommendations', path: '/recommendations' },
    { name: 'New Clients', path: '/upload' }
];

const UserAvatar = ({ username }: { username: string }) => {
    const initials = username
        .split(' ')
        .slice(0, 2)
        .map(name => name.charAt(0).toUpperCase())
        .join('');

    return (
        <div className="relative w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <span className="text-xl">{initials}</span>
        </div>
    );
};


const Navbar: React.FC = () => {
    const navigation = useNavigate();
    const location = useLocation();
    const {signOut,getToken} = useAuth();
    const username = getToken()&&jwtDecode(getToken()).name;
    // State for notifications and dropdown
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);

    // Notification toggle handler
    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const handleLogout = () => {
        signOut();
        navigation('/', { replace: true });
    };
    const fetchNotifications = async () => {
        try {
            const notifications = await getNotifications();
            setNotifications(notifications);
        } catch (error) {
            // Handle any additional error scenarios
            console.error('Error in fetching notifications:', error);
        }
    };
    // WebSocket notification setup (similar to previous suggestion)
    React.useEffect(() => {
        fetchNotifications().then();
    }, []);
    return (
        <nav className="relative flex justify-between items-center bg-white py-4 px-6 shadow-md">
            {/* Left side - Welcome message */}
            <div className="flex items-center">
                <img
                    src="./src/assets/logo.png"
                    alt="App logo"
                    className="w-[191.5px] h-[46px]"
                />
            </div>

            {/* Middle - Navigation Routes */}
            <div className="flex items-center space-x-4">
                {ROUTES.map((route) => (
                    <button
                        key={route.name}
                        className={`
                            flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-300
                            ${location.pathname === route.path
                            ? 'text-gray-500 bg-gray-50 border-b-2 border-orange-400'
                            : 'hover:bg-gray-100 text-gray-700'}
                        `}
                        onClick={() => navigation(route.path)}
                    >
                        <span className="text-sm font-medium">{route.name}</span>
                    </button>
                ))}
            </div>

            {/* Right side - Action buttons */}
            <div className="flex items-center space-x-4 relative">
                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={toggleNotifications}
                        className="bg-gray-100 rounded-md p-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
                        aria-label="Notifications"
                    >
                        <Bell className="h-6 w-6 text-gray-600"/>
                        {notifications.length > 0 && (
                            <span
                                className="absolute -top-3 -right-2 h-5 w-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                                {notifications.length}
                            </span>
                        )}
                    </button>

                    {showNotifications && (
                        <NotificationDropdown
                            notifications={notifications}
                            onClose={() => setShowNotifications(false)}
                        />
                    )}
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="bg-gray-100 rounded-md p-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Logout"
                >
                    <LogOut className="h-6 w-6 text-gray-600"/>
                </button>

                {/* User Avatar */}
                {username && (
                    <UserAvatar username={username}/>
                )}
            </div>
        </nav>
    );
};

export default Navbar;