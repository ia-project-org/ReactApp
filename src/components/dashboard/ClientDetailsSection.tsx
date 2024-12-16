import React, { useMemo } from 'react';
import { Calendar, UserRoundSearchIcon } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import ClientCard from "@/components/dashboard/ClientCard.tsx";
import {ClientDto} from "@/models/Client.ts";

// Type definition for better type safety
interface ClientDetails {
    details: {
        monthly_inhand_salary?: number;
        annual_income?: number;
        credit_utilization_ratio?: number;
        credit_mix?: string;
    };
    eligibility: {
        lastCheckedDate?: number;
    };
    score: number;
}



// Utility function for formatting currency and percentage values
const formatValue = (value: number | undefined, type: 'currency' | 'percentage' = 'currency'): string => {
    if (value === undefined) return 'N/A';

    switch (type) {
        case 'currency':
            return `$${value.toLocaleString()}`;
        case 'percentage':
            return `${value.toFixed(2)}%`;
    }
};

interface ClientDetailsSectionProps {
    selectedClient?: ClientDto | null;
    evaluatClient: () => void;
    formatDate: (date: number) => string;
}

export function ClientDetailsSection({
                                         selectedClient,
                                         evaluatClient,
                                         formatDate
                                     }: ClientDetailsSectionProps) {
    // Memoize derived values to prevent unnecessary re-renders
    const clientProgress = useMemo(() =>
            selectedClient?.score ? Number(selectedClient.score.toFixed(1)) : 0,
        [selectedClient?.score]
    );

    return (
        <div className="bg-background-paper-elevation-0 rounded-lg shadow-md my-4">
            <div className="max-w-md mx-auto p-6">
                {/* Title */}
                <h2 className="text-center text-slate-800 font-semibold mb-8">
                    Client Details
                </h2>

                {/* Evaluation Date */}
                {selectedClient && (
                    <div className="text-center text-xs text-gray-500 mb-4 flex justify-center items-center">
                        <Calendar className="inline-block w-4 h-4 mr-1" />
                        Evaluated on
                        <span className='font-semibold text-blue-500 ml-1'>
                            {formatDate(selectedClient.eligibility.lastCheckedDate || Date.now())}
                        </span>
                    </div>
                )}

                {/* Progress Section */}
                <div className="flex justify-center mb-8">
                    {selectedClient ? (
                        <div className="relative w-32 h-32">
                            <Progress value={clientProgress} />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center w-32 h-32 bg-gray-100 rounded-full">
                            <UserRoundSearchIcon className="w-12 h-12 text-gray-400 mb-2"/>
                            <p className="text-xs text-gray-500 text-center">
                                Select a Client
                            </p>
                        </div>
                    )}
                </div>

                {/* Client Information Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {selectedClient ? (
                        <>
                            <ClientCard
                                title="Monthly Income"
                                value={formatValue(selectedClient.details.monthly_inhand_salary)}
                            />
                            <ClientCard
                                title="Annual Income"
                                value={formatValue(selectedClient.details.annual_income)}
                            />
                            <ClientCard
                                title="Credit Utilization"
                                value={formatValue(
                                    selectedClient.details.credit_utilization_ratio,
                                    'percentage'
                                )}
                            />
                            <ClientCard
                                title="Credit Mix"
                                value={selectedClient.details.credit_mix || 'N/A'}
                            />
                        </>
                    ) : (
                        <div className="col-span-2 text-center text-gray-600">
                            Select a client to view financial details.
                        </div>
                    )}
                </div>

                {/* Report Generation Button */}
                <Button
                    className="w-full"
                    onClick={evaluatClient}
                    disabled={!selectedClient}
                    variant="default"
                >
                    New Evaluation
                </Button>
            </div>
        </div>
    );
}