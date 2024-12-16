import { Loader2 } from 'lucide-react'
import React from "react";

const Spinner: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-full w-full">
        <div className="flex flex-col items-center">
        <Loader2
            className="h-10 w-10 text-orange-500 animate-spin"
        />
        <p className="mt-2 text-gray-600">Chargement...</p>
    </div>
    </div>
);
};

export default Spinner;