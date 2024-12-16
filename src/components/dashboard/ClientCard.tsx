import React, { useMemo } from 'react';
import {
    DollarSign,
    CreditCard,
    BarChart,
    TrendingUp,
    Calendar,
    User,
    Mail,
    Phone,
    LucideIcon
} from 'lucide-react';

// Centralized icon mapping with better type safety
const ICON_MAP: Record<string, LucideIcon> = {
    // Financial Icons
    'monthly income': DollarSign,
    'annual income': TrendingUp,
    'credit utilization': CreditCard,
    'credit mix': BarChart,

    // Personal Info Icons
    'name': User,
    'email': Mail,
    'phone': Phone,
    'age': Calendar,
};

const getIconForTitle = (title: string): LucideIcon => {
    const normalizedTitle = title.toLowerCase().trim();

    // Exact match first
    if (ICON_MAP[normalizedTitle]) {
        return ICON_MAP[normalizedTitle];
    }

    // Partial match
    for (const [key, Icon] of Object.entries(ICON_MAP)) {
        if (normalizedTitle.includes(key)) {
            return Icon;
        }
    }

    // Default icon
    return DollarSign;
};

interface ClientCardProps {
    title: string;
    value: string | number;
    className?: string;
}

export const ClientCard: React.FC<ClientCardProps> = React.memo(({
                                                                     title,
                                                                     value,
                                                                     className = ''
                                                                 }) => {
    // Memoize icon selection to prevent unnecessary re-renders
    const IconComponent = useMemo(() => getIconForTitle(title), [title]);

    return (
        <div
            className={`
                border bg-gray-100 hover:border-blue-300 
                hover:bg-background-paper-elevation-0 
                border-gray-200 rounded-lg p-3 
                transition-all duration-200 ease-in-out
                ${className}
            `}
        >
            <div className="flex justify-center mb-2">
                <IconComponent
                    className="w-6 h-6 text-blue-500 transform hover:scale-110 transition-transform"
                />
            </div>
            <p className="text-sm text-center text-gray-600 mb-1 font-medium">{title}</p>
            <p className="text-xs text-center text-gray-500 font-semibold">{value}</p>
        </div>
    );
});

// Add display name for better debugging
ClientCard.displayName = 'ClientCard';

export default ClientCard;