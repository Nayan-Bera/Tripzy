import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Users, FileText, Plus } from "lucide-react"

export default function FamilyAndDocuments() {
  return (
    <div className="space-y-6">
      {/* ================= FAMILY DETAILS ================= */}
      <Card>
        <CardContent className="p-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Users className="h-4 w-4" />
              Family Details
            </div>
            <p className="text-sm text-muted-foreground">
              Add or update your family members
            </p>
          </div>

          {/* FAMILY MEMBER FORM */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <Label>Full Name</Label>
              <Input placeholder="John Doe" />
            </div>

            <div>
              <Label>Relation</Label>
              <Input placeholder="Father / Mother / Spouse" />
            </div>

            <div>
              <Label>Date of Birth</Label>
              <Input type="date" />
            </div>

            <div>
              <Label>Phone</Label>
              <Input placeholder="+91 XXXXXXXX" />
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="secondary">
              <Plus className="h-4 w-4 mr-1" />
              Add Member
            </Button>

            <Button className="ml-auto">
              Save Family Details
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ================= DOCUMENTS ================= */}
      <Card>
        <CardContent className="p-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <FileText className="h-4 w-4" />
              Documents
            </div>
            <p className="text-sm text-muted-foreground">
              Upload and manage your documents
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Label>Document Type</Label>
              <Input placeholder="Aadhar / Passport / Birth Cert" />
            </div>

            <div>
              <Label>Document Number</Label>
              <Input placeholder="XXXX-XXXX-XXXX" />
            </div>

            <div>
              <Label>Upload File</Label>
              <Input type="file" />
            </div>
          </div>

          <Separator />

          <div className="flex justify-end">
            <Button>
              Save Documents
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
