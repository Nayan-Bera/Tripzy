"use client";

import * as React from "react";
import { Search } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";
import {
  useCreateHotelMutation,
  useLazySearchUserByEmailQuery,
} from "@/features/admin/hotels/adminhotelApiSlice";

type User = {
  id: string;
  name: string;
  email: string;
};

export function AddHotelDialog() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [hotelName, setHotelName] = React.useState("");
  const [contact, setContact] = React.useState("");

  /* ================= RTK ================= */

  const [searchUser, { data: searchData, isFetching }] =
    useLazySearchUserByEmailQuery();

  const [createHotel, { isLoading }] = useCreateHotelMutation();

  /* ================= HANDLERS ================= */

  const handleSearch = () => {
    if (!email) return;
    searchUser(email);
  };

  const handleCreateHotel = async () => {
    if (!selectedUser || !hotelName || !contact) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      await createHotel({
        ownerId: selectedUser.id,
        name: hotelName,
        contact,
      }).unwrap();

      toast.success("Hotel created successfully");

      reset();
      setOpen(false);
    } catch {
      toast.error("Failed to create hotel");
    }
  };

  const reset = () => {
    setEmail("");
    setSelectedUser(null);
    setHotelName("");
    setContact("");
  };

  /* ================= UI ================= */

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Hotel</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Hotel (Admin)</DialogTitle>
        </DialogHeader>

        {/* ================= SEARCH OWNER ================= */}
        <div className="space-y-2">
          <Label>Owner Email</Label>
          <div className="flex gap-2">
            <Input
              placeholder="owner@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              variant="secondary"
              onClick={handleSearch}
              disabled={isFetching}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {searchData?.users?.length ? (
            <div className="border rounded-md">
              {searchData.users.map((user) => (
                <button
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`w-full px-3 py-2 text-left hover:bg-muted ${
                    selectedUser?.id === user.id ? "bg-muted font-medium" : ""
                  }`}
                >
                  {user.name} — {user.email}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {/* ================= HOTEL FORM ================= */}
        {selectedUser && (
          <div className="space-y-4 pt-4">
            <div>
              <Label>Hotel Name</Label>
              <Input
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
              />
            </div>

            <div>
              <Label>Contact</Label>
              <Input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* ================= ACTIONS ================= */}
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateHotel} disabled={isLoading}>
            Create Hotel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
