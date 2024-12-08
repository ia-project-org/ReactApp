import {ColumnDef, flexRender, getCoreRowModel, useReactTable,} from "@tanstack/react-table"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table.tsx"
import {EligibilityResult} from "@/models/Eligibility.ts";
import {useAppContext} from "@/context/AppContext.tsx";
import Pagination1 from "@/components/ui/Pagination.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Input} from "@/components/ui/input.tsx";
import React, {useState} from "react";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}





export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                         }: DataTableProps<TData, TValue>) {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const {currentPage, setCurrentPage,totalPages,setTotalPages} = useAppContext();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const {selectedClient} = useAppContext();
    return (
        <div className="col-span-3 bg-white shadow-md rounded-md p-6 my-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Clients</h2>
                <div className="flex space-x-2">
                    <button
                        className="bg-gray-100 rounded-md py-2 px-4 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                    </button>
                    <button
                        className="bg-gray-100 rounded-md py-2 px-4 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
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
                                        {}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    {/* Table Body */}
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <TableCell key={cell.id}>
                                                {cell.column.id == "eligibility" ? (
                                                    <Badge variant={cell.row.original.eligibility.eligibilityResult ==="Good" ? "good" : "standard" }>
                                                        {cell.row.original.eligibility.eligibilityResult || selectedClient?.eligibility.eligibilityResult}
                                                    </Badge>
                                                ) : flexRender(cell.column.columnDef.cell, cell.getContext())
                                                }
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <Pagination1 currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    )
}
