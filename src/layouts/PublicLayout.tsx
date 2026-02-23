import React from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "@/pages/Home/components/Nav";
import { Footer } from "@/pages/Home/components/footer";


const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;
