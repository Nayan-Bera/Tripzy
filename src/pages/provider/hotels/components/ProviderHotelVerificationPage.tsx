"use client";

import * as React from "react";
import { useParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useGetAmenitiesQuery } from "@/features/admin/aminities/amenitiesApiSlice";
import { useSubmitHotelForVerificationMutation } from "@/features/provider/hotel/providerHotelApiSlice";

/* ================= TYPES ================= */

type DocumentType = "license" | "tax" | "id" | "other";

/* ================= COMPONENT ================= */
const isImage = (file: File) =>
  file.type.startsWith("image/");

export default function ProviderHotelVerificationPage() {
  const { hotelId } = useParams<{ hotelId: string }>();

  const { data: amenities = [], isLoading } = useGetAmenitiesQuery();
  const [submitVerification, { isLoading: submitting }] =
    useSubmitHotelForVerificationMutation();

  /* ================= STATE ================= */

  const [selectedAmenities, setSelectedAmenities] = React.useState<string[]>(
    []
  );

  const [property, setProperty] = React.useState({
    title: "",
    description: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    location: "",
  });

  const [policies, setPolicies] = React.useState({
    checkInTime: "",
    checkOutTime: "",
    cancellationPolicy: "",
    refundPolicy: "",
  });

  const [documents, setDocuments] = React.useState<
    { type: DocumentType; file: File }[]
  >([]);

  /* ================= HANDLERS ================= */

  const toggleAmenity = (id: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const addDocument = (type: DocumentType, file: File) => {
    setDocuments((prev) => [...prev, { type, file }]);
  };

  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!hotelId) return;

    if (!property.title) {
      toast.error("Hotel name is required");
      return;
    }

    if (selectedAmenities.length === 0) {
      toast.error("Select at least one amenity");
      return;
    }

    if (documents.length === 0) {
      toast.error("Upload at least one verification document");
      return;
    }

    const formData = new FormData();

    formData.append("property", JSON.stringify(property));
    formData.append("policies", JSON.stringify(policies));
    formData.append("amenityIds", JSON.stringify(selectedAmenities));

    documents.forEach((doc) => {
      formData.append("files", doc.file);
      formData.append("documentTypes", doc.type);
    });

    try {
      await submitVerification({
        hotelId,
        formData,
      }).unwrap();

      toast.success("Hotel submitted for verification");
    } catch {
      toast.error("Failed to submit verification");
    }
  };

  /* ================= UI ================= */

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
            <Input
              value={property.title}
              onChange={(e) =>
                setProperty({ ...property, title: e.target.value })
              }
              placeholder="Hotel name"
            />
          </div>

          <div>
            <Label>Contact</Label>
            <Input disabled placeholder="Fetched automatically" />
          </div>
        </CardContent>
      </Card>

      {/* PROPERTY DETAILS */}
      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Address"
            onChange={(e) =>
              setProperty({ ...property, address: e.target.value })
            }
          />
          <Input
            placeholder="City"
            onChange={(e) => setProperty({ ...property, city: e.target.value })}
          />
          <Input
            placeholder="State"
            onChange={(e) =>
              setProperty({ ...property, state: e.target.value })
            }
          />
          <Input
            placeholder="Country"
            onChange={(e) =>
              setProperty({ ...property, country: e.target.value })
            }
          />
          <Input
            placeholder="ZIP Code"
            onChange={(e) => setProperty({ ...property, zip: e.target.value })}
          />
          <Input
            placeholder="Google Maps Location URL"
            onChange={(e) =>
              setProperty({ ...property, location: e.target.value })
            }
          />

          <Textarea
            className="col-span-2"
            placeholder="Property description"
            onChange={(e) =>
              setProperty({ ...property, description: e.target.value })
            }
          />
        </CardContent>
      </Card>

      {/* POLICIES */}
      <Card>
        <CardHeader>
          <CardTitle>Hotel Policies</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Check-in Time"
            onChange={(e) =>
              setPolicies({ ...policies, checkInTime: e.target.value })
            }
          />
          <Input
            placeholder="Check-out Time"
            onChange={(e) =>
              setPolicies({ ...policies, checkOutTime: e.target.value })
            }
          />
          <Textarea
            className="col-span-2"
            placeholder="Cancellation Policy"
            onChange={(e) =>
              setPolicies({
                ...policies,
                cancellationPolicy: e.target.value,
              })
            }
          />
          <Textarea
            className="col-span-2"
            placeholder="Refund Policy"
            onChange={(e) =>
              setPolicies({ ...policies, refundPolicy: e.target.value })
            }
          />
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
          <div className="grid grid-cols-2 gap-4">
            {(["license", "tax", "id", "other"] as DocumentType[]).map(
              (type) => (
                <div className="space-y-2">
                  <Label className="capitalize">{type} document</Label>

                  <div className="flex items-center gap-3">
                    {/* Hidden native input */}
                    <input
                      id={`doc-${type}`}
                      type="file"
                      accept="image/*,application/pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) addDocument(type, file);
                      }}
                    />

                    {/* Custom button */}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        document.getElementById(`doc-${type}`)?.click()
                      }
                    >
                      Choose File
                    </Button>

                    {/* File name */}
                    <span className="text-sm text-muted-foreground truncate">
                      {documents.find((d) => d.type === type)?.file.name ??
                        "No file chosen"}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>

         {documents.length > 0 && (
  <div className="space-y-3">
    <Label>Uploaded Documents</Label>

    {documents.map((doc, index) => (
      <div
        key={index}
        className="flex items-center gap-4 border rounded-lg p-3"
      >
        {/* PREVIEW BOX */}
        <div className="w-16 h-16 border rounded-md flex items-center justify-center overflow-hidden bg-muted">
          {isImage(doc.file) ? (
            <img
              src={URL.createObjectURL(doc.file)}
              alt={doc.file.name}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-xs font-medium">PDF</span>
          )}
        </div>

        {/* FILE INFO */}
        <div className="flex-1">
          <p className="text-sm font-medium">{doc.file.name}</p>
          <p className="text-xs text-muted-foreground capitalize">
            {doc.type} document
          </p>
        </div>

        {/* REMOVE */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeDocument(index)}
        >
          Remove
        </Button>
      </div>
    ))}
  </div>
)}

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
