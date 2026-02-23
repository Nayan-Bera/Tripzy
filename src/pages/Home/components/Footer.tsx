export const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-foreground">HotelBooker</p>
          <p className="text-xs">
            © {new Date().getFullYear()} HotelBooker Inc. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <a href="#" className="hover:text-foreground">
            About
          </a>
          <a href="#" className="hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="hover:text-foreground">
            Terms
          </a>
          <a href="#" className="hover:text-foreground">
            Help
          </a>
        </div>
      </div>
    </footer>
  );
};