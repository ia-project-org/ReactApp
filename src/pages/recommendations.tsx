import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  score: "Good" | "Standard";
}

// Mock Client Data
const mockClients: Client[] = [
    { id: 1654, name: "John Doe", phone: "0612345678", email: "ken99@yahoo.com", score: "Good" },
    { id: 654, name: "John Doe", phone: "0612345678", email: "abe45@gmail.com", score: "Standard" },
    { id: 655, name: "Jane Doe", phone: "0612345679", email: "jane99@gmail.com", score: "Good" },
    { id: 789, name: "Alice Smith", phone: "0612345680", email: "alice.smith@example.com", score: "Good" },
    { id: 890, name: "Bob Johnson", phone: "0612345681", email: "bob.johnson@example.com", score: "Standard" },
    { id: 123, name: "Charlie Brown", phone: "0612345682", email: "charlie.brown@example.com", score: "Good" },
    { id: 456, name: "Diana Prince", phone: "0612345683", email: "diana.prince@example.com", score: "Standard" },
    { id: 7890, name: "Edward Cullen", phone: "0612345684", email: "edward.cullen@example.com", score: "Good" },
    { id: 1122, name: "Fiona Apple", phone: "0612345685", email: "fiona.apple@example.com", score: "Standard" },
    { id: 3344, name: "George Martin", phone: "0612345686", email: "george.martin@example.com", score: "Good" },
  ];
  

const Recommendations: React.FC = () => {
  const [filter, setFilter] = useState<string>("View-All");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const rowsPerPage = 6;

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
      setSelectedRows(mockClients.map((client) => client.id)); // Select all rows
    }
    setSelectAll(!selectAll);
  };

  // Check if a specific row is selected
  const isRowSelected = (id: number) => selectedRows.includes(id);

  // Filter clients by search term
  const filteredClients = mockClients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredClients.length / rowsPerPage);
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
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
                    <TableHead className="text-center">Score</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedClients.map((client) => (
                    <TableRow key={client.id} className={isRowSelected(client.id) ? "bg-gray-100" : ""}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={isRowSelected(client.id)}
                          onChange={() => handleRowSelect(client.id)}
                        />
                      </TableCell>
                      <TableCell>{client.id}</TableCell>
                      <TableCell>{client.name}</TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={client.score === "Good" ? "good" : "standard"}
                        >
                          {client.score}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center items-center space-x-2 center">
                          <Button variant="default">Recommend</Button>
                          <Button variant="default">Details</Button>
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
            <div className="flex justify-between items-center mt-4">
            <Pagination className="mt-4">
                <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                    <PaginationPrevious
                    onClick={() =>
                        setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
                    }
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, index) => (
                    <PaginationItem key={index}>
                    <PaginationLink
                        isActive={currentPage === index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Next Button */}
                <PaginationItem>
                    <PaginationNext
                    onClick={() =>
                        setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
                    }
                    className={
                        currentPage === totalPages ? "pointer-events-none opacity-50" : ""
                    }
                    />
                </PaginationItem>
                </PaginationContent>
            </Pagination>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Recommendations;
