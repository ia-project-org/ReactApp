import React from 'react';
import {
    DollarSign,
    CreditCard,
    BarChart,
    TrendingUp,
    Calendar,
    User,
    Mail,
    Phone
} from 'lucide-react';

const getIconForTitle = (title: string) => {
    const iconMap = {
        // Financial Icons
        'Monthly Income': DollarSign,
        'Annual Income': TrendingUp,
        'Credit Utilization': CreditCard,
        'Credit Mix': BarChart,

        // Personal Info Icons
        'Name': User,
        'Email': Mail,
        'Phone': Phone,
        'Age': Calendar,
    };

    // Find the best matching icon, fall back to a default if not found
    for (const [key, Icon] of Object.entries(iconMap)) {
        if (title.toLowerCase().includes(key.toLowerCase())) {
            return Icon;
        }
    }

    // Default icon if no match found
    return DollarSign;
};

interface ClientCardProps {
    title: string;
    value: string | number
}

export const ClientCard: React.FC<ClientCardProps> = ({ title, value }) => {
    const IconComponent = getIconForTitle(title);

    return (
        <div className="border bg-gray-100 hover:border-blue-300 hover:bg-background-paper-elevation-0 border-gray-200 rounded-lg p-3">
            <div className="flex justify-center mb-2">
                <IconComponent className="w-6  h-6 text-blue-500" />
            </div>
            <p className="text-sm text-center text-gray-600 mb-1">{title}</p>
            <p className="text-xs text-center text-gray-400">{value}</p>
        </div>
    );
};

export default ClientCard;