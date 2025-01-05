import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import {ClientDto} from "@/models/Client.ts";
import {recommend} from "@/api/_callApi.ts";

// Agent interface for type safety
interface Agent {
    id: string;
    username: string;
    specialite: string;
}

// Initial agents data
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
    clients: ClientDto[];
}> = ({ isOpen, onClose, onRecommend,clients}) => {
    const [selectedAgents, setSelectedAgents] = useState<Agent[]>([]);

    // Toggle agent selection
    const handleAgentToggle = (agent: Agent) => {
        setSelectedAgents(prev =>
            prev.some(a => a.id === agent.id)
                ? prev.filter(a => a.id !== agent.id)
                : [...prev, agent]
        );
    };

    // Handle recommendation submission
    const handleRecommend = async () => {
        if (selectedAgents.length > 0) {
            await Promise.all(
                clients.map(async (client) => {
                    try {
                        await recommend(client.details);
                    } catch (error) {
                        console.error(`Failed to recommend for client ${client.clientId}:`, error);
                        // Vous pouvez gérer l'erreur spécifique ici si nécessaire
                    }
                })
            );
            // Une fois toutes les recommandations terminées
            onRecommend(selectedAgents);
            setSelectedAgents([]);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-[600px] max-h-[80vh] overflow-auto">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">Select an agent(s) to recommend clients to</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Selected Clients Display
                                <div className="p-4 bg-gray-50 border-b">
                    <h3 className="text-lg font-medium mb-2">Selected Clients:</h3>
                    <div className="flex flex-wrap gap-2">
                        {clients.map(client => (
                            <div
                                key={client.clientId}
                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                            >
                                {client.firstName}
                            </div>
                        ))}
                    </div>
                </div>
                */}

                {/* Agent Selection Table */}
                <div className="p-4">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b">
                            <th className="p-2 text-center w-12"></th>
                            <th className="p-2 text-center">ID</th>
                            <th className="p-2 text-center">Name</th>
                            <th className="p-2 text-center">Specialization</th>
                        </tr>
                        </thead>
                        <tbody>
                        {AGENTS_DATA.map(agent => (
                            <tr
                                key={agent.id}
                                className={`border-b cursor-pointer hover:bg-gray-100 
                    ${selectedAgents.some(a => a.id === agent.id) ? 'bg-blue-100' : ''}`}
                                onClick={() => handleAgentToggle(agent)}
                            >
                                <td className="p-2">
                                    <div className="flex items-center justify-center">
                                        <div
                                            className={`w-5 h-5 border rounded flex items-center justify-center 
                          ${selectedAgents.some(a => a.id === agent.id)
                                                ? 'bg-blue-500 border-blue-500'
                                                : 'border-gray-300'}`}
                                        >
                                            {selectedAgents.some(a => a.id === agent.id) && <Check size={16} color="white" />}
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

                {/* Modal Footer */}
                <div className="p-4 border-t flex justify-between items-center">
                    <div className="text-gray-600">
                        {selectedAgents.length > 0 && `${selectedAgents.length} agent(s) selected`}
                    </div>
                    <div className="space-x-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleRecommend}
                            disabled={selectedAgents.length === 0}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg
                hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Recommend
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};