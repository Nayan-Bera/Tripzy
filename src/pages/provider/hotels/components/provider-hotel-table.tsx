"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ChevronDown, MoreHorizontal, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
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

export type ProviderHotel = {
  id: string
  name: string
  country: string
  state: string
  city: string
  contact: string
  verified: boolean
  totalRooms: number
  totalBookings: number
  status: "active" | "inactive"
}

const data: ProviderHotel[] = [
  {
    id: "1",
    name: "Grand Palace Hotel",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    contact: "+91-9876543210",
    verified: true,
    totalRooms: 42,
    totalBookings: 312,
    status: "active",
  },
  {
    id: "2",
    name: "Sea View Resort",
    country: "India",
    state: "Goa",
    city: "Panaji",
    contact: "+91-9988776655",
    verified: false,
    totalRooms: 18,
    totalBookings: 91,
    status: "inactive",
  },
]


export const providerHotelColumns: ColumnDef<ProviderHotel>[] = [
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
    header: "Hotel Name",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "city",
    header: "City",
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
          row.original.verified
            ? "text-green-600 font-medium"
            : "text-red-600 font-medium"
        }
      >
        {row.original.verified ? "Yes" : "No"}
      </span>
    ),
  },
  {
    accessorKey: "totalRooms",
    header: "Rooms",
  },
  {
    accessorKey: "totalBookings",
    header: "Bookings",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={
          row.original.status === "active"
            ? "text-green-600 font-medium"
            : "text-red-600 font-medium"
        }
      >
        {row.original.status}
      </span>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: () => {
    //   const hotel = row.original

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

            <DropdownMenuItem>
              Manage Rooms
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function ProviderHotelsTable() {
  const navigate = useNavigate()

  const table = useReactTable({
    data,
    columns: providerHotelColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="w-full">
      {/* ================= TOP BAR ================= */}
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="Search hotels..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("name")?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />

        <Button
          className="ml-auto"
          onClick={() => navigate("/provider/hotels/create")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Hotel
        </Button>

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
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
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
                  colSpan={providerHotelColumns.length}
                  className="h-24 text-center"
                >
                  No hotels found
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
