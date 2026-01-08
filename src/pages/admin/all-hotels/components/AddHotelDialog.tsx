"use client"

import * as React from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { toast } from "sonner"
import { useCreateHotelMutation } from "@/features/admin/hotels/adminhotelApiSlice"

export function AddHotelDialog() {
  const [open, setOpen] = React.useState(false)

  const [ownerEmail, setOwnerEmail] = React.useState("")
  const [hotelName, setHotelName] = React.useState("")
  const [contact, setContact] = React.useState("")

  const [createHotel, { isLoading }] = useCreateHotelMutation()

  const reset = () => {
    setOwnerEmail("")
    setHotelName("")
    setContact("")
  }

  const handleCreateHotel = async () => {
    if (!ownerEmail || !hotelName || !contact) {
      toast.error("All fields are required")
      return
    }

    try {
      await createHotel({
        ownerEmail,
        name: hotelName,
        contact,
      }).unwrap()

      toast.success("Hotel created successfully")
      reset()
      setOpen(false)
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create hotel")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Hotel</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Hotel (Admin)</DialogTitle>
        </DialogHeader>

        {/* FORM */}
        <div className="grid gap-5 py-4">
          {/* Owner Email */}
          <div className="grid gap-2">
            <Label htmlFor="ownerEmail">
              Owner Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="ownerEmail"
              placeholder="owner@email.com"
              value={ownerEmail}
              onChange={(e) => setOwnerEmail(e.target.value)}
              disabled={isLoading}
              autoFocus
            />
          </div>

          {/* Hotel Name */}
          <div className="grid gap-2">
            <Label htmlFor="hotelName">
              Hotel Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="hotelName"
              placeholder="Hotel name"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Contact */}
          <div className="grid gap-2">
            <Label htmlFor="contact">
              Contact <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contact"
              placeholder="+1 555 123 4567"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* FOOTER */}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>

          <Button onClick={handleCreateHotel} disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Hotel"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
