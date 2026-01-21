import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentAuth } from "@/features/auth/authSlice";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import {
  FileText,
  Shield,
  Upload,
  Lock,
  Pencil,
} from "lucide-react";

export default function ProfilePage() {
  const { user } = useSelector(selectCurrentAuth);

  /* ================= STATE ================= */
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone_number || "");

  const documents = [
    { id: "1", type: "Passport", number: "XXXX 4321" },
    { id: "2", type: "Aadhar", number: "XXXX 8899" },
  ];

  const initials =
    user?.name
      ?.split(" ")
      .map((n: string) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="mx-auto max-w-7xl space-y-10 p-6">
      {/* ================= HERO ================= */}
      <Card className="relative overflow-hidden border-none bg-gradient-to-br from-sky-500/10 via-indigo-500/10 to-teal-500/10">
        <CardContent className="flex items-center gap-6 p-8">
          <Avatar className="h-20 w-20 ring-4 ring-white/40">
            <AvatarFallback className="text-xl">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {user?.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ================= PERSONAL INFO ================= */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Shield className="h-4 w-4 text-muted-foreground" />
                Personal Information
              </div>
              <span className="text-xs text-muted-foreground">
                Saved automatically
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input value={user?.email} disabled />
              </div>

              <div>
                <Label>Phone</Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ================= DOCUMENTS ================= */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Documents
              </div>

              <Button variant="outline" size="sm" className="gap-2">
                <Upload className="h-4 w-4" />
                Add Document
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="relative rounded-xl border bg-muted/40 p-5 transition hover:shadow-md"
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-3 top-3"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-background p-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        {doc.type}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {doc.number}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ================= SECURITY ================= */}
      <Card className="relative overflow-hidden border-destructive/20 bg-gradient-to-br from-destructive/5 via-background to-background">
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-destructive">
              <Lock className="h-4 w-4" />
              Security
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Update your password to keep your account secure
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {/* PASSWORD INPUTS */}
            <div className="lg:col-span-2 space-y-3">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <Label className="p-2">Current Password</Label>
                  <Input type="password" placeholder="Current" />
                </div>

                <div>
                  <Label className="p-2">New Password</Label>
                  <Input type="password" placeholder="New" />
                </div>

                <div>
                  <Label className="p-2">Confirm Password</Label>
                  <Input type="password" placeholder="Confirm" />
                </div>
              </div>

              <Separator />

              <Button variant="destructive" className="w-fit">
                Change Password
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
