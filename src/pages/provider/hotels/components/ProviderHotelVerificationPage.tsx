"use client";

import * as React from "react";
import { useParams } from "react-router-dom";
import { Upload, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useGetAmenitiesQuery } from "@/features/admin/aminities/amenitiesApiSlice";



export default function ProviderHotelVerificationPage() {
  const { hotelId } = useParams<{ hotelId: string }>();

  const { data: amenities = [], isLoading } = useGetAmenitiesQuery();
 

  const [selectedAmenities, setSelectedAmenities] = React.useState<string[]>(
    []
  );

  const toggleAmenity = (id: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(id)
        ? prev.filter((a) => a !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!hotelId || selectedAmenities.length === 0) {
      toast.error("Please select at least one amenity");
      return;
    }

    try {
      await attachAmenities({
        hotelId,
        amenityIds: selectedAmenities,
      }).unwrap();

      toast.success("Verification request submitted");
    } catch {
      toast.error("Failed to submit amenities");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Hotel Verification</h1>
        <p className="text-muted-foreground">
          Complete the details below to request admin verification
        </p>
      </div>

      {/* BASIC INFO */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label>Hotel Name</Label>
            <Input disabled placeholder="Fetched automatically" />
          </div>
          <div>
            <Label>Contact</Label>
            <Input disabled placeholder="Fetched automatically" />
          </div>
        </CardContent>
      </Card>

      {/* POLICIES */}
      <Card>
        <CardHeader>
          <CardTitle>Hotel Policies</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label>Check-in Time</Label>
            <Input placeholder="12:00 PM" />
          </div>
          <div>
            <Label>Check-out Time</Label>
            <Input placeholder="11:00 AM" />
          </div>
          <div className="col-span-2">
            <Label>Cancellation Policy</Label>
            <Textarea />
          </div>
          <div className="col-span-2">
            <Label>Refund Policy</Label>
            <Textarea />
          </div>
        </CardContent>
      </Card>

      {/* AMENITIES */}
      <Card>
        <CardHeader>
          <CardTitle>Amenities</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-3 gap-3">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">
              Loading amenities...
            </p>
          ) : (
            amenities.map((a) => (
              <label
                key={a.id}
                className="flex items-center gap-2 border rounded-md p-2 cursor-pointer hover:bg-muted"
              >
                <Checkbox
                  checked={selectedAmenities.includes(a.id)}
                  onCheckedChange={() => toggleAmenity(a.id)}
                />
                {a.name}
              </label>
            ))
          )}
        </CardContent>
      </Card>

      {/* DOCUMENTS */}
      <Card>
        <CardHeader>
          <CardTitle>Verification Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {["license", "tax", "id"].map((type) => (
            <div
              key={type}
              className="flex items-center justify-between border rounded-md p-3"
            >
              <div>
                <p className="font-medium capitalize">{type} document</p>
                <p className="text-xs text-muted-foreground">
                  Upload valid {type} proof
                </p>
              </div>

              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* SUBMIT */}
      <Card>
        <CardContent className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            After submission, admin will review your hotel
          </p>

          <Button onClick={handleSubmit} disabled={submitting}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Submit for Verification
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
