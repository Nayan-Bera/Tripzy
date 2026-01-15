"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ProviderHotel,
  useGetProviderHotelsQuery,
} from "@/features/provider/hotel/providerHotelApiSlice";

/* ================= COLUMNS ================= */

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

  { accessorKey: "name", header: "Hotel Name" },
  { accessorKey: "country", header: "Country" },
  { accessorKey: "state", header: "State" },
  { accessorKey: "city", header: "City" },
  { accessorKey: "contact", header: "Contact" },

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

  { accessorKey: "totalRooms", header: "Rooms" },
  { accessorKey: "totalBookings", header: "Bookings" },

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
    cell: ({ row }) => {
      const navigate = useNavigate();
      const hotelId = row.original.id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => navigate(`/provider/hotels/${hotelId}`)}
            >
              View Hotel
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/provider/hotels/${hotelId}/verify`)}
            >
              Submit for Verification
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => navigate(`/provider/hotels/${hotelId}/edit`)}
            >
              Edit Details
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => navigate(`/provider/hotels/${hotelId}/rooms`)}
            >
              Manage Rooms
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => navigate(`/provider/hotels/${hotelId}/bookings`)}
            >
              View Bookings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

/* ================= TABLE ================= */

export function ProviderHotelsTable() {
  const { data, isLoading } = useGetProviderHotelsQuery();

  const hotels = data?.data ?? [];

  const table = useReactTable({
    data: hotels,
    columns: providerHotelColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (isLoading) {
    return <div className="p-4 text-sm">Loading hotels...</div>;
  }

  return (
    <div className="w-full">
      {/* TOP BAR */}
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="Search hotels..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("name")?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />

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
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* TABLE */}
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

      {/* PAGINATION */}
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
  );
}
