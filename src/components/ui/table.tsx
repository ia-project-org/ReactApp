import * as React from "react"
import { cn } from "@/lib/utils"

const Table = React.forwardRef<
    HTMLTableElement,
    React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
    <div className="overflow-x-auto">
        <table
            ref={ref}
            className={cn("w-full table-auto", className)}
            {...props}
        />
    </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <tbody
        ref={ref}
        className={cn("", className)}
        {...props}
    />
))
TableBody.displayName = "TableBody"

const TableRow = React.forwardRef<
    HTMLTableRowElement,
    React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
    <tr
        ref={ref}
        className={cn("border-b", className)}
        {...props}
    />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
    HTMLTableCellElement,
    React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <th
        ref={ref}
        className={cn("py-2 px-4 text-center bg-gray-100", className)}
        {...props}
    />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
    HTMLTableCellElement,
    React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={cn("py-2", className)}
        {...props}
    />
))
TableCell.displayName = "TableCell"

const TableContainer = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("col-span-3 bg-white shadow-md rounded-md p-6", className)}
        {...props}
    >
        {children}
    </div>
))
TableContainer.displayName = "TableContainer"

const TableHeaderActions = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex justify-between items-center mb-4", className)}
        {...props}
    />
))
TableHeaderActions.displayName = "TableHeaderActions"

const TableHeaderTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h2
        ref={ref}
        className={cn("text-lg font-bold", className)}
        {...props}
    />
))
TableHeaderTitle.displayName = "TableHeaderTitle"

const TableActionButton = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
    <button
        ref={ref}
        className={cn(
            "bg-gray-100 rounded-md py-2 px-4 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
            className
        )}
        {...props}
    >
        {children}
    </button>
))
TableActionButton.displayName = "TableActionButton"

const TableActionIcon = React.forwardRef<
    SVGSVGElement,
    React.SVGProps<SVGSVGElement>
>(({ className, ...props }, ref) => (
    <svg
        ref={ref as any}
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-6 w-6 text-gray-400", className)}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        {...props}
    />
))
TableActionIcon.displayName = "TableActionIcon"

const ScoreBadge = React.forwardRef<
    HTMLSpanElement,
    React.HTMLAttributes<HTMLSpanElement> & { variant?: 'Good' | 'Standard' | 'Bad' }
>(({ className, variant = 'Good', ...props }, ref) => {
    const variantClasses = {
        Good: 'bg-green-100 text-green-500',
        Standard: 'bg-yellow-100 text-orange-500',
        Bad: 'bg-red-100 text-red-500'
    };

    return (
        <span
            ref={ref}
            className={cn(
                "px-2 py-1 rounded-full",
                variantClasses[variant],
                className
            )}
            {...props}
        />
    )
})
ScoreBadge.displayName = "ScoreBadge"

const TableDetailsButton = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
    <button
        ref={ref}
        className={cn(
            "bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500",
            className
        )}
        {...props}
    />
))
TableDetailsButton.displayName = "TableDetailsButton"

export {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    TableContainer,
    TableHeaderActions,
    TableHeaderTitle,
    TableActionButton,
    TableActionIcon,
    ScoreBadge,
    TableDetailsButton
}