import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx"
import * as React from "react";
import {EligibilityResult} from "@/models/Eligibility.ts";
import {useAppContext} from "@/context/AppContext.tsx";
import Pagination from "@/components/ui/Pagination.tsx";
import {useState} from "react";


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

    const {currentPage, setCurrentPage,totalPages} = useAppContext();

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const {selectedClient} = useAppContext();
    return (
        <div className="col-span-3 bg-white shadow-md rounded-md p-6 my-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Clients</h2>
                <div className={'relative'}>
                    <input
                        type="text"
                        className="bg-gray-100 rounded-md py-2 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Name, email, etc..."
                    />
                    <button
                        className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400 hover:text-gray-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                </div>
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
                                        const variantStyles = {
                                            [EligibilityResult.Good]: "bg-green-100 text-green-500",
                                            [EligibilityResult.Standard]: "bg-yellow-100 text-yellow-500",
                                            [EligibilityResult.Bad]: "bg-red-100 text-red-500"
                                        };
                                        return (
                                            <TableCell key={cell.id}>
                                                {cell.column.id == "eligibility" ? (
                                                    <div
                                                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${variantStyles[cell.row.original.eligibility.eligibilityResult || selectedClient?.eligibility.eligibilityResult]}`}>
                                                        {cell.row.original.eligibility.eligibilityResult || selectedClient?.eligibility.eligibilityResult}
                                                    </div>
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
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    )
}
