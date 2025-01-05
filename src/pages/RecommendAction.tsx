import React, { useState } from 'react';
import { X, Check, Loader2 } from 'lucide-react';
import { ClientDto } from "@/models/Client.ts";
import { recommend } from "@/api/_callApi.ts";
import * as Toast from "@radix-ui/react-toast";
interface Agent {
    id: string;
    username: string;
    specialite: string;
}

const AGENTS_DATA: Agent[] = [
    { id: 'INV001', username: 'John Doe', specialite: 'Real Estate Sales' },
    { id: 'INV005', username: 'Emma Smith', specialite: 'Property Management' },
    { id: 'INV006', username: 'Michael Brown', specialite: 'Investment Consulting' },
    { id: 'INV007', username: 'Sarah Johnson', specialite: 'Commercial Development' }
];

export const AgentRecommendationModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onRecommend: (agents: Agent[]) => void;
    clients2: ClientDto[];
}> = ({ isOpen, onClose, onRecommend, clients2 }) => {
    const [selectedAgents, setSelectedAgents] = useState<Agent[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCloseToast = () => {
        setError(null);
    };

    const handleAgentToggle = (agent: Agent) => {
        setSelectedAgents(prev =>
            prev.some(a => a.id === agent.id)
                ? prev.filter(a => a.id !== agent.id)
                : [...prev, agent]
        );
        setError(null);
    };

    const handleRecommend = async () => {
        if (selectedAgents.length === 0) {
            setError("Please select at least one agent");
            return;
        }

        setIsLoading(true);
        setError(null);
        await Promise.all(
            clients2.map(client =>
                recommend(client.details).catch(error => {
                    setIsLoading(false);
                    console.error(`Failed to recommend for client ${client.clientId}:`, error);
                    throw error;
                })
            )
        );

        onRecommend(selectedAgents);
        setSelectedAgents([]);
        onClose();
        setIsLoading(false);
    };

    if (!isOpen) return null;

    return (
            <Toast.Provider>
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-xl w-[600px] max-h-[80vh] overflow-auto">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-semibold">Select an agent(s) to recommend clients to</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
                                disabled={isLoading}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-4">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b">
                                    <th className="p-2 text-center w-12"></th>
                                    <th className="p-2 text-left">ID</th>
                                    <th className="p-2 text-left">Name</th>
                                    <th className="p-2 text-left">Specialization</th>
                                </tr>
                                </thead>
                                <tbody>
                                {AGENTS_DATA.map(agent => (
                                    <tr
                                        key={agent.id}
                                        className={`border-b cursor-pointer hover:bg-gray-100 
                                                ${selectedAgents.some(a => a.id === agent.id) ? 'bg-blue-100' : ''}
                                                ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                                        onClick={() => handleAgentToggle(agent)}
                                    >
                                        <td className="p-2">
                                            <div className="flex items-center justify-center">
                                                <div className={`w-5 h-5 border rounded flex items-center justify-center 
                                                        ${selectedAgents.some(a => a.id === agent.id)
                                                    ? 'bg-blue-500 border-blue-500'
                                                    : 'border-gray-300'}`}
                                                >
                                                    {selectedAgents.some(a => a.id === agent.id) &&
                                                        <Check size={16} color="white" />
                                                    }
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-2">{agent.id}</td>
                                        <td className="p-2">{agent.username}</td>
                                        <td className="p-2">{agent.specialite}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-4 border-t flex justify-between items-center">
                            <div className="text-gray-600">
                                {selectedAgents.length > 0 &&
                                    `${selectedAgents.length} agent(s) selected`
                                }
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleRecommend}
                                    disabled={selectedAgents.length === 0 || isLoading}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg
                                        hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed
                                        flex items-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        'Recommend'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {error && (
                    <Toast.Root
                        open={!!error}
                        onOpenChange={handleCloseToast}
                        className="fixed top-4 right-4 z-[100] p-4 rounded-lg bg-white border-2 border-red-200 shadow-lg"
                    >
                        <Toast.Title className="text-red-600 font-semibold">
                            Recommendation Error
                        </Toast.Title>
                        <Toast.Description className="text-red-600 mt-1">
                            {error}
                        </Toast.Description>
                        <Toast.Close className="absolute top-2 right-2 text-red-600 hover:text-red-700">
                            <X size={16} />
                        </Toast.Close>
                    </Toast.Root>
                )}
                <Toast.Viewport className="fixed top-0 right-0 p-4 flex flex-col gap-2 w-96 list-none z-[100]" />
            </Toast.Provider>
    );
};

export default AgentRecommendationModal;