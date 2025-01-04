import { useToast } from '@/components/ui/use-toast';
import { CheckCircle, XCircle } from "lucide-react";

interface ToastProps {
    type: 'success' | 'error';
    message: string;
}

const ToastNotification = () => {
    const { toast } = useToast();

    const showToast = ({ type, message }: ToastProps) => {
        const isSuccess = type === 'success';

        toast({
            variant: isSuccess ? 'default' : 'destructive',
            duration: 3000,
            className: "flex gap-2 items-center",
            // Utiliser une string pour le title
            title: isSuccess ? "Success" : "Error",
            description: (
                <div className="flex items-center gap-2">
                    {isSuccess ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span>{message}</span>
                </div>
            )
        });
    };

    return (
        <div className="space-x-4">
            <button
                onClick={() => showToast({
                    type: 'success',
                    message: 'Operation completed successfully!'
                })}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
                Show Success
            </button>
            <button
                onClick={() => showToast({
                    type: 'error',
                    message: 'An error occurred. Please try again.'
                })}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
                Show Error
            </button>
        </div>
    );
};

export default ToastNotification;