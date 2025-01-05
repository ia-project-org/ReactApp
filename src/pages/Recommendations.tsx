import React, {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Input} from "@/components/ui/input";
import {useAppContext} from "@/context/AppContext.tsx";
import {getData} from "@/api/_callApi.ts";
import {useNavigate} from "react-router-dom";
import {AgentRecommendationModal} from "@/pages/RecommendAction.tsx";
import {AgentDto} from "@/models/AgentDto.ts";
import Pagination1 from "@/components/ui/Pagination.tsx";

const Recommendations: React.FC = () => {
    const [filter, setFilter] = useState<string>("View-All");
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const {setSelectedClient, clients, setClients, totalPages, setTotalPages, currentPage, setCurrentPage} = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigation = useNavigate();

    // Handle individual row selection
    const handleRowSelect = (id: number) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    // Handle "select all" toggle
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedRows([]); // Deselect all rows
        } else {
            setSelectedRows(clients.map((client) => client.clientId)); // Select all rows
        }
        setSelectAll(!selectAll);
    };

    const handleRecommend = (agents: AgentDto[]) => {
        // Recommendation logic
        console.log('Recommended Agents:', agents);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Dans votre composant Recommendations, ajoutez cette fonction
    const getSelectedClients = () => {
        return clients.filter(client => selectedRows.includes(client.clientId));
    };

    // Check if a specific row is selected
    const isRowSelected = (id: number) => selectedRows.includes(id);

    async function fetchData() {
        const result = await getData(currentPage, setTotalPages, 3);
        setClients(result);
    }

    useEffect(() => {
        fetchData().then();
    }, [currentPage]);

    // Filter clients by search term
    const filteredClients = clients.filter(
        (client) =>
            (filter === "View-All" ||
                (filter === "Auto-Loan" && client.details.auto_loan === 1) ||
                (filter === "Credit-builder Loan" && client.details.credit_builder_loan === 1) ||
                (filter === "Debt Consolidation Loan" && client.details.debt_consolidation_loan === 1)) &&
            (client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                client.phoneNumber.includes(searchTerm) ||
                client.email.toLowerCase().includes(searchTerm) ||
                client.cin.toLowerCase().includes(searchTerm))
    );

    return (
        <div className="container mx-auto px-4 py-6 bg-gray-50">
            <Tabs
                defaultValue="View-All"
                onValueChange={(value: React.SetStateAction<string>) => setFilter(value)}
                className="space-y-4"
            >
                <div className="bg-white shadow-sm rounded-lg p-6">
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Eligible Clients</h1>
                    <TabsList className="bg-gray-100  py-1 rounded-xl">
                        <TabsTrigger
                            value="View-All"
                            className="relative data-[state=active]:rounded-xl px-4 py-2 -ml-1 text-gray-600 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 transition-colors"
                        >
                            View All
                        </TabsTrigger>
                        <TabsTrigger
                            value="Auto-Loan"
                            className="relative data-[state=active]:rounded-xl px-4 py-2 text-gray-600 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 transition-colors"
                        >
                            Auto-Loan
                        </TabsTrigger>
                        <TabsTrigger
                            value="Credit-builder Loan"
                            className="relative data-[state=active]:rounded-xl px-4 py-2 text-gray-600 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 transition-colors"
                        >
                            Credit-builder Loan
                        </TabsTrigger>
                        <TabsTrigger
                            value="Debt Consolidation Loan"
                            className="relative data-[state=active]:rounded-xl px-4 py-2 text-gray-600 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 transition-colors"
                        >
                            Debt Consolidation Loan
                        </TabsTrigger>
                        <TabsTrigger
                            value="Home Equity Loan"
                            className="relative data-[state=active]:rounded-xl px-4 py-2 text-gray-600 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 transition-colors"
                        >
                            Home Equity Loan
                        </TabsTrigger>
                        <TabsTrigger
                            value="Mortgage Loan"
                            className="relative data-[state=active]:rounded-xl px-4 py-2 text-gray-600 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 transition-colors"
                        >
                            Mortgage Loan
                        </TabsTrigger>
                        <TabsTrigger
                            value="Payday Loan"
                            className="relative data-[state=active]:rounded-xl px-4 py-2 text-gray-600 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 transition-colors"
                        >
                            Payday Loan
                        </TabsTrigger>
                        <TabsTrigger
                            value="Student Loan"
                            className="relative data-[state=active]:rounded-xl -mr-1 px-4 py-2 text-gray-600 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 transition-colors"
                        >
                            Student Loan
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value={filter}>
                    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <Input
                                type="text"
                                placeholder="Search clients..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full md:w-1/3 rounded-full border-gray-300 focus:ring-blue-500"
                            />
                            <div className="text-gray-500 text-sm">
                                Last updated {new Date().toLocaleDateString()}
                            </div>
                        </div>

                        <div className="overflow-x-auto border rounded-lg">
                            <Table>
                                <TableHeader className="bg-gray-100">
                                    <TableRow>
                                        <TableHead className="text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectAll}
                                                onChange={handleSelectAll}
                                                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                                            />
                                        </TableHead>
                                        <TableHead className="text-center">ID</TableHead>
                                        <TableHead className="text-center">Full Name</TableHead>
                                        <TableHead className="text-center">Phone Number</TableHead>
                                        <TableHead className="text-center">Contact Information</TableHead>
                                        <TableHead className="text-center">Eligibility</TableHead>
                                        <TableHead className="text-center">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredClients.map((client) => (
                                        <TableRow
                                            key={client.clientId}
                                            className={`hover:bg-blue-50 transition-colors ${
                                                isRowSelected(client.clientId) ? "bg-blue-100" : ""
                                            }`}
                                        >
                                            <TableCell>
                                                <input
                                                    type="checkbox"
                                                    checked={isRowSelected(client.clientId)}
                                                    onChange={() => handleRowSelect(client.clientId)}
                                                    className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                                                />
                                            </TableCell>
                                            <TableCell>{client.clientId}</TableCell>
                                            <TableCell>{client.firstName} {client.lastName}</TableCell>
                                            <TableCell>{client.phoneNumber}</TableCell>
                                            <TableCell>{client.email}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        client.eligibility?.eligibilityResult === "Good"
                                                            ? "good"
                                                            : client.eligibility?.eligibilityResult === "Standard"
                                                                ? "standard"
                                                                : "poor"
                                                    }
                                                    className="px-3 py-1 rounded-full"
                                                >
                                                    {client.eligibility?.eligibilityResult}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex justify-center items-center space-x-2">
                                                    <Button
                                                        className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 rounded-lg"
                                                        onClick={() => setIsModalOpen(true)}
                                                        disabled={selectedRows.length === 0}
                                                    >
                                                        Recommend
                                                    </Button>
                                                    <Button
                                                        className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 rounded-lg"
                                                        onClick={() => {
                                                            setSelectedClient(client);
                                                            navigation('/dashboard');
                                                        }}
                                                    >
                                                        Details
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <div className="text-sm text-gray-600">
                                {selectedRows.length > 0
                                    ? `${selectedRows.length} row(s) selected.`
                                    : "No rows selected."}
                            </div>
                            <Pagination1
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            <AgentRecommendationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onRecommend={handleRecommend}
                clients2={getSelectedClients()} // Au lieu de clients
            />
        </div>
    );
};

export default Recommendations;