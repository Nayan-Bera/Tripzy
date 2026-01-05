"use client"

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
} from "@tanstack/react-table"
import {
    ArrowUpDown,
    ChevronDown,
    MoreHorizontal
} from "lucide-react"
import * as React from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

/* ================= TYPES ================= */

export type Hotel = {
  id: string
  name: string
  ownerEmail: string
  contact: string
  verified: boolean
  totalRooms: number
  totalBookings: number
  status: "active" | "inactive"
}

/* ================= TEMP DATA (replace with API later) ================= */

const data: Hotel[] = [
  {
    id: "1",
    name: "Grand Palace Hotel",
    ownerEmail: "owner1@example.com",
    contact: "+1-555-111-2222",
    verified: true,
    totalRooms: 42,
    totalBookings: 312,
    status: "active",
  },
  {
    id: "2",
    name: "Sea View Resort",
    ownerEmail: "owner2@example.com",
    contact: "+1-555-333-4444",
    verified: false,
    totalRooms: 18,
    totalBookings: 91,
    status: "inactive",
  },
]

/* ================= COLUMNS ================= */

export const columns: ColumnDef<Hotel>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Hotel Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

  {
    accessorKey: "ownerEmail",
    header: "Owner Email",
  },

  {
    accessorKey: "contact",
    header: "Contact",
  },

  {
    accessorKey: "verified",
    header: "Verified",
    cell: ({ row }) => (
      <span
        className={
          row.getValue("verified")
            ? "text-green-600 font-medium"
            : "text-red-600 font-medium"
        }
      >
        {row.getValue("verified") ? "Yes" : "No"}
      </span>
    ),
  },

  {
    accessorKey: "totalRooms",
    header: "Total Rooms",
  },

  {
    accessorKey: "totalBookings",
    header: "Total Bookings",
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={
          row.getValue("status") === "active"
            ? "text-green-600 font-medium"
            : "text-red-600 font-medium"
        }
      >
        {row.getValue("status")}
      </span>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const hotel = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem>
              View Hotel
            </DropdownMenuItem>

            <DropdownMenuItem>
              Edit Hotel
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-red-600">
              Disable Hotel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

/* ================= TABLE ================= */

export function AdminHotelsTable() {
  const navigate = useNavigate()

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      {/* ================= TOP BAR ================= */}
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="Filter hotels..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        {/* <Button
          className="ml-auto"
          onClick={() => navigate("/admin/hotels/create")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Hotel
        </Button> */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ================= TABLE ================= */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hotels found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
