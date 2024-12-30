import React from 'react';
import {Notification} from '@/models/Notification.ts';
import {AlertCircle, Bell, CheckCircle, Clock, LucideIcon, X} from 'lucide-react';

interface NotificationDropdownProps {
    notifications: Notification[];
    onClose: () => void;
}

type JobState = 'SUCCESS' | 'UNSUCCESSFUL' | 'STARTED' | 'DEFAULT';

const statusMap: Record<
    JobState,
    { color: string; icon: LucideIcon; iconColor: string }
> = {
    SUCCESS: { color: 'bg-green-50 border-green-300', icon: CheckCircle, iconColor: 'text-green-600' },
    UNSUCCESSFUL: { color: 'bg-red-50 border-red-300', icon: AlertCircle, iconColor: 'text-red-600' },
    STARTED: { color: 'bg-blue-50 border-blue-200', icon: Clock, iconColor: 'text-blue-600' },
    DEFAULT: { color: 'bg-gray-50 border-gray-200', icon: Bell, iconColor: 'text-gray-600' },
};


const NotificationDropdown: React.FC<NotificationDropdownProps> = React.memo(({ notifications, onClose }) => {
    const formatDate = React.useCallback((date: Date | string) => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }, []);

    const getStatusDetails = (jobState: string | undefined) => {
        if (!jobState) return statusMap.DEFAULT;
        return statusMap[jobState.toUpperCase() as JobState] || statusMap.DEFAULT;
    };

    return (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white shadow-lg rounded-lg border border-gray-200 z-50 overflow-hidden">
            <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
                <div className="flex items-center space-x-2">
                    <Bell className="h-6 w-6 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-200 p-1 rounded-full transition-colors"
                    aria-label="Close notifications"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            {notifications.length === 0 ? (
                <div className="p-6 text-center bg-gray-50">
                    <Bell className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <p className="text-gray-500">No new notifications.</p>
                </div>
            ) : (
                <div className="max-h-96 overflow-y-auto" role="menu" aria-live="polite" aria-label="Notifications">
                    {notifications.map((notification) => {
                        const statusDetails = getStatusDetails(notification.jobState);
                        const StatusIcon = statusDetails.icon;

                        return (
                            <div
                                key={notification.id}
                                role="menuitem"
                                tabIndex={0}
                                className={`p-4 border-b ${statusDetails.color} hover:bg-opacity-80 transition-colors`}
                            >
                                <div className="flex items-start space-x-2">
                                    <StatusIcon className={`h-5 w-5 mt-1 ${statusDetails.iconColor}`} />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <h4 className={`font-semibold text-normal ${statusDetails.iconColor}`}>
                                                {notification.title}
                                            </h4>
                                            <span className="text-xs font-semibold text-gray-500">
                                                {formatDate(notification.notificationDate)}
                                            </span>
                                        </div>
                                        <p className="text-sm mt-2 text-gray-700">{notification.message}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
});

export default NotificationDropdown;
