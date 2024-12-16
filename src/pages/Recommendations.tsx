import React, {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Input} from "@/components/ui/input";
import Pagination1 from "@/components/ui/pagination";
import {useAppContext} from "@/context/AppContext.tsx";
import {getData} from "@/api/_callApi.ts";
import {useNavigate} from "react-router-dom";
import {AgentRecommendationModal} from "@/pages/RecommendAction.tsx";


const Recommendations: React.FC = () => {
    const [filter, setFilter] = useState<string>("View-All");
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const {setSelectedClient,clients,setClients,totalPages,setTotalPages,currentPage, setCurrentPage} = useAppContext();
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

    const handleRecommend = (agents) => {
        // Logique de recommandation
        console.log('Agents recommandés:', agents);
        // Vous pouvez ajouter ici l'appel API pour recommander les agents
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Check if a specific row is selected
    const isRowSelected = (id: number) => selectedRows.includes(id);

    async function fetchData() {
        const result = await getData(currentPage,setTotalPages,3);
        setClients(result);
    }

    useEffect(()=>{
        fetchData().then();
    },[currentPage])

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
        <div className="container mx-auto">
            <Tabs defaultValue="View-All" onValueChange={(value: React.SetStateAction<string>) => setFilter(value)}>
                <div className="bg-[#F6F6F6] p-4">
                    <h1 className="text-3xl font-bold mb-6 text-left">Eligible Clients</h1>
                    <TabsList className="relative bg-[#f6f6f6] border-b-2 border-[#C7C7C7] rounded-none flex space-x-4">
                        <TabsTrigger
                            value="View-All"
                            className="relative pb-2 text-[#C7C7C7] font-medium hover:text-gray-900 transition-colors data-[state=active]:text-[#3F24F4] data-[state=active]:bg-[#f6f6f6] data-[state=active]:font-semibold data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:bottom-0 data-[state=active]:after:w-full data-[state=active]:after:h-[2px] data-[state=active]:after:bg-blue-500"
                        >
                            View All
                        </TabsTrigger>
                        <TabsTrigger
                            value="Auto-Loan"
                            className="relative pb-2 text-[#C7C7C7] font-medium hover:text-gray-900 transition-colors data-[state=active]:text-[#3F24F4] data-[state=active]:bg-[#f6f6f6] data-[state=active]:font-semibold data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:bottom-0 data-[state=active]:after:w-full data-[state=active]:after:h-[2px] data-[state=active]:after:bg-blue-500"
                        >
                            Auto-Loan
                        </TabsTrigger>
                        <TabsTrigger
                            value="Credit-builder Loan"
                            className="relative pb-2 text-[#C7C7C7] font-medium hover:text-gray-900 transition-colors data-[state=active]:text-[#3F24F4] data-[state=active]:bg-[#f6f6f6] data-[state=active]:font-semibold data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:bottom-0 data-[state=active]:after:w-full data-[state=active]:after:h-[2px] data-[state=active]:after:bg-blue-500"
                        >
                            Credit-builder Loan
                        </TabsTrigger>
                        <TabsTrigger
                            value="Debt Consolidation Loan"
                            className="relative pb-2 text-[#C7C7C7] font-medium hover:text-gray-900 transition-colors data-[state=active]:text-[#3F24F4] data-[state=active]:bg-[#f6f6f6] data-[state=active]:font-semibold data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:bottom-0 data-[state=active]:after:w-full data-[state=active]:after:h-[2px] data-[state=active]:after:bg-blue-500"
                        >
                            Debt Consolidation Loan
                        </TabsTrigger>
                        <TabsTrigger
                            value="Home Equity Loan"
                            className="relative pb-2 text-[#C7C7C7] font-medium hover:text-gray-900 transition-colors data-[state=active]:text-[#3F24F4] data-[state=active]:bg-[#f6f6f6] data-[state=active]:font-semibold data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:bottom-0 data-[state=active]:after:w-full data-[state=active]:after:h-[2px] data-[state=active]:after:bg-blue-500"
                        >
                            Home Equity Loan
                        </TabsTrigger>
                        <TabsTrigger
                            value="Mortgage Loan"
                            className="relative pb-2 text-[#C7C7C7] font-medium hover:text-gray-900 transition-colors data-[state=active]:text-[#3F24F4] data-[state=active]:bg-[#f6f6f6] data-[state=active]:font-semibold data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:bottom-0 data-[state=active]:after:w-full data-[state=active]:after:h-[2px] data-[state=active]:after:bg-blue-500"
                        >
                            Mortgage Loan
                        </TabsTrigger>
                        <TabsTrigger
                            value="Payday Loan"
                            className="relative pb-2 text-[#C7C7C7] font-medium hover:text-gray-900 transition-colors data-[state=active]:text-[#3F24F4] data-[state=active]:bg-[#f6f6f6] data-[state=active]:font-semibold data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:bottom-0 data-[state=active]:after:w-full data-[state=active]:after:h-[2px] data-[state=active]:after:bg-blue-500"
                        >
                            Payday Loan
                        </TabsTrigger>
                        <TabsTrigger
                            value="Student Loan"
                            className="relative pb-2 text-[#C7C7C7] font-medium hover:text-gray-900 transition-colors data-[state=active]:text-[#3F24F4] data-[state=active]:bg-[#f6f6f6] data-[state=active]:font-semibold data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:bottom-0 data-[state=active]:after:w-full data-[state=active]:after:h-[2px] data-[state=active]:after:bg-blue-500"
                        >
                            Student Loan
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* Content Section */}
                <TabsContent value={filter}>
                    <div className="bg-[#FFFFFF] p-4 rounded-sm -mt-6">
                        {/* Search Bar */}
                        <div className="flex items-center justify-between mb-4">
                            <Input
                                type="text"
                                placeholder="Type to search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-1/3"
                            />
                            <div className="text-gray-500 text-sm">
                                Last updated 02/12/2024 at 12:45PM
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto border rounded-md">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectAll}
                                                onChange={handleSelectAll}
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
                                        <TableRow key={client.clientId} className={isRowSelected(client.clientId) ? "bg-gray-100" : ""}>
                                            <TableCell>
                                                <input
                                                    type="checkbox"
                                                    checked={isRowSelected(client.clientId)}
                                                    onChange={() => handleRowSelect(client.clientId)}
                                                />
                                            </TableCell>
                                            <TableCell>{client.clientId}</TableCell>
                                            <TableCell>{client.firstName }  {client.lastName}</TableCell>
                                            <TableCell>{client.phoneNumber}</TableCell>
                                            <TableCell>{client.email}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={client.eligibility.eligibilityResult === "Good" ? "good" : "standard"}
                                                >
                                                    {client.eligibility.eligibilityResult}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex justify-center items-center space-x-2 center">
                                                    <Button className='bg-blue-500 text-white font-semibold rounded-lg
                                                        hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500
                                                        focus:ring-offset-2 transition-colors duration-300' variant="default"
                                                            onClick={() => setIsModalOpen(true)}
                                                    >
                                                        Recommend</Button>
                                                    <Button className={'bg-blue-500 text-white font-semibold rounded-lg\n' +
                                                        '               hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500\n' +
                                                        '               focus:ring-offset-2 transition-colors duration-300'} onClick={()=>{
                                                        setSelectedClient(client);
                                                        navigation('/dashboard');
                                                    }} variant="default">Details</Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="py-4 text-sm text-gray-600 text-left">
                            {selectedRows.length > 0
                                ? `${selectedRows.length} row(s) selected.`
                                : "No rows selected."}
                        </div>
                        <div className="flex justify-center items-center mt-4">
                            <Pagination1 currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
            <AgentRecommendationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onRecommend={handleRecommend}
                clients={clients}/>
        </div>
    );
};

export default Recommendations;