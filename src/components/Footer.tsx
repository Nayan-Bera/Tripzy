import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-gray-50 border-t mt-12">
    <div className="container-custom py-8 text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center gap-4">
      <div>© {new Date().getFullYear()} Tripzy — All rights reserved.</div>
      <div className="flex gap-4">
        <a className="hover:underline" href="/terms">Terms</a>
        <a className="hover:underline" href="/privacy">Privacy</a>
      </div>
    </div>
  </footer>
);

export default Footer;
