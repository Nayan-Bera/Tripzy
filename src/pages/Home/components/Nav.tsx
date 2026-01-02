// import { src/components/Nav.tsx } from "react-router-dom";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import {
//   Heart,
//   LogOut,
//   User,
//   LayoutDashboard,
//   Building2,
// } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import { selectCurrentAuth, logout } from "@/features/auth/authSlice";

// /* ================= STATIC LINKS ================= */

// // const navLinks = [
// //   { label: "Hotels", href: "#hotels" },
// //   { label: "Destinations", href: "#destinations" },
// //   { label: "Deals", href: "#deals" },
// //   { label: "Support", href: "#support" },
// // ];

// const navLinks = [
//   { label: "Hotels", href: "/hotels", isRoute: true },
//   { label: "Destinations", href: "/destinations", isRoute: true },
//   { label: "Deals", href: "#deals", isRoute: false },
//   { label: "Support", href: "#support", isRoute: false },
// ];


// export const Nav: React.FC = () => {
//   const auth = useSelector(selectCurrentAuth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const isLoggedIn = !!auth.access_token;

//   const user = auth.user;
//   const isAdmin =
//     user?.platformRole === "ADMIN" ||
//     user?.platformRole === "SUPER_ADMIN";

//   const isProvider = auth.hotelAccess.length > 0;

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   const getInitials = () => {
//     if (!user?.name) return "U";
//     const words = user.name.trim().split(" ");
//     return words.length === 1
//       ? words[0][0].toUpperCase()
//       : `${words[0][0]}${words[1][0]}`.toUpperCase();
//   };

//   return (
//     <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
//       <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-2">
//           <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-tr from-sky-500 to-teal-400 text-lg font-bold text-white">
//             TY
//           </span>
//           <span className="text-lg font-semibold tracking-tight">
//             TRIPZY
//           </span>
//         </Link>

//         {/* Center Nav
//         <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
//           {navLinks.map((link) => (
//             <a
//               key={link.href}
//               href={link.href}
//               className="text-muted-foreground transition hover:text-foreground"
//             >
//               {link.label}
//             </a>
//           ))}
//         </nav> */}

//        {navLinks.map((link) =>
//   link.isRoute ? (
//     <Link
//       key={link.href}
//       to={link.href}
//       className="text-muted-foreground transition hover:text-foreground"
//     >
//       {link.label}
//     </Link>
//   ) : (
//     <a
//       key={link.href}
//       href={link.href}
//       className="text-muted-foreground transition hover:text-foreground"
//     >
//       {link.label}
//     </a>
//   )
// )}

//         {/* Right Actions */}
//         <div className="flex items-center gap-2">
//           {isLoggedIn ? (
//             <>
//               {/* Wishlist */}
//               <Link to="/wishlist">
//                 <Button variant="ghost" size="icon">
//                   <Heart className="h-5 w-5" />
//                 </Button>
//               </Link>

//               {/* User Menu */}
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <button className="outline-none">
//                     <Avatar className="h-9 w-9 cursor-pointer">
//                       <AvatarFallback>{getInitials()}</AvatarFallback>
//                     </Avatar>
//                   </button>
//                 </DropdownMenuTrigger>

//                 <DropdownMenuContent align="end" className="w-48">
//                   <Link to="/profile">
//                     <DropdownMenuItem>
//                       <User className="mr-2 h-4 w-4" />
//                       Profile
//                     </DropdownMenuItem>
//                   </Link>

//                   <Link to="/wishlist">
//                     <DropdownMenuItem>
//                       <Heart className="mr-2 h-4 w-4" />
//                       Wishlist
//                     </DropdownMenuItem>
//                   </Link>

//                   {/* Provider */}
//                   {isProvider && (
//                     <Link to="/provider">
//                       <DropdownMenuItem>
//                         <Building2 className="mr-2 h-4 w-4" />
//                         Provider Panel
//                       </DropdownMenuItem>
//                     </Link>
//                   )}

//                   {/* Admin */}
//                   {isAdmin && (
//                     <Link to="/admin">
//                       <DropdownMenuItem>
//                         <LayoutDashboard className="mr-2 h-4 w-4" />
//                         Admin Panel
//                       </DropdownMenuItem>
//                     </Link>
//                   )}

//                   <DropdownMenuSeparator />

//                   <DropdownMenuItem
//                     className="text-red-500 focus:text-red-500"
//                     onClick={handleLogout}
//                   >
//                     <LogOut className="mr-2 h-4 w-4" />
//                     Logout
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </>
//           ) : (
//             <>
//               <Button variant="outline" size="sm">
//                 Become a Host
//               </Button>

//               <Link to="/login">
//                 <Button size="sm">Sign In</Button>
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };




import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Heart,
  LogOut,
  User,
  LayoutDashboard,
  Building2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentAuth, logout } from "@/features/auth/authSlice";

/* ================= NAV LINKS ================= */

const navLinks = [
  { label: "Hotels", href: "/hotels", isRoute: true },
  { label: "Destinations", href: "/destinations", isRoute: true },
  { label: "Deals", href: "#deals", isRoute: false },
  { label: "Support", href: "/contact-us", isRoute: true },
];

export const Nav: React.FC = () => {
  const auth = useSelector(selectCurrentAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = !!auth.access_token;
  const user = auth.user;

  const isAdmin =
    user?.platformRole === "admin" ||
    user?.platformRole === "super_admin";

  const isProvider = auth.hotelAccess.length > 0;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const getInitials = () => {
    if (!user?.name) return "U";
    const words = user.name.trim().split(" ");
    return words.length === 1
      ? words[0][0].toUpperCase()
      : `${words[0][0]}${words[1][0]}`.toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-tr from-sky-500 to-teal-400 text-lg font-bold text-white">
            TY
          </span>
          <span className="text-lg font-semibold tracking-tight">
            TRIPZY
          </span>
        </Link>

        {/* Center Nav */}
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                className="text-muted-foreground transition hover:text-foreground"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition hover:text-foreground"
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Link to="/wishlist">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="outline-none">
                    <Avatar className="h-9 w-9 cursor-pointer">
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">
                  <Link to="/profile">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                  </Link>

                  <Link to="/wishlist">
                    <DropdownMenuItem>
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </DropdownMenuItem>
                  </Link>

                  {isProvider && (
                    <Link to="/provider">
                      <DropdownMenuItem>
                        <Building2 className="mr-2 h-4 w-4" />
                        Provider Panel
                      </DropdownMenuItem>
                    </Link>
                  )}

                  {isAdmin && (
                    <Link to="/admin">
                      <DropdownMenuItem>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Admin Panel
                      </DropdownMenuItem>
                    </Link>
                  )}

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="text-red-500 focus:text-red-500"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm">
                Become a Host
              </Button>

              <Link to="/login">
                <Button size="sm">Sign In</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
