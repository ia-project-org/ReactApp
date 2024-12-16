import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { useAppContext } from "@/context/AppContext.tsx";
import Pagination1 from "@/components/ui/Pagination.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Input } from "@/components/ui/input.tsx";
import React, { useState, useMemo } from "react";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                         }: DataTableProps<TData, TValue>) {
    const { selectedClient, currentPage, setCurrentPage, totalPages } = useAppContext();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filter, setFilter] = useState<string>("");

    // Implement search functionality
    const filteredData = useMemo(() => {
        if (!searchTerm) return data;
        const lowercaseSearchTerm = searchTerm.toLowerCase();
        return data.filter(item =>
            Object.values(item).some(value =>
                typeof value === 'string' &&
                value.toLowerCase().includes(lowercaseSearchTerm) ||
                (typeof value === 'object' && value !== null &&
                    Object.values(value).some(nestedValue =>
                        typeof nestedValue === 'string' &&
                        nestedValue.toLowerCase().includes(lowercaseSearchTerm)
                    )
                )
            )
        );
    }, [data, searchTerm]);

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="col-span-3 bg-white shadow-md rounded-md p-6 my-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Clients</h2>
            </div>
            <Tabs defaultValue="">
                <TabsContent value={filter}>
                    {/* Search Bar */}
                    <div className="flex items-center justify-between mb-4">
                        <Input
                            type="text"
                            placeholder="Type to search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-1/3"
                        />
                    </div>
                    <div className="overflow-x-auto">
                        <Table>
                            {/* Table Header */}
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id}>
                                                {!header.isPlaceholder &&
                                                    flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>

                            {/* Table Body */}
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => {
                                        // Check if the row's client matches the selected client
                                        const isSelected = selectedClient && selectedClient.clientId === row.original.clientId;
                                        return (
                                            <TableRow
                                                key={row.id}
                                                className={isSelected ? "bg-blue-50" : ""} // Apply a different background color if selected
                                            >
                                                {row.getVisibleCells().map((cell) => {
                                                    return (
                                                        <TableCell key={cell.id}>
                                                            {cell.column.id === "eligibility" ? (
                                                                <Badge variant={cell.row.original.eligibility.eligibilityResult === "Good" ? "good" : "standard"}>
                                                                    {cell.row.original.eligibility.eligibilityResult || selectedClient?.eligibility.eligibilityResult}
                                                                </Badge>
                                                            ) : (
                                                                flexRender(cell.column.columnDef.cell, cell.getContext())
                                                            )}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            {searchTerm ? "No results found" : "No data available"}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <Pagination1
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}