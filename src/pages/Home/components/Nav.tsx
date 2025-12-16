import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, LogOut, User } from "lucide-react";
import { Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentAuthData, logout } from "@/features/auth/authSlice";

const navLinks = [
	{ label: "Hotels", href: "#hotels" },
	{ label: "Destinations", href: "#destinations" },
	{ label: "Deals", href: "#deals" },
	{ label: "Support", href: "#support" },
];

export const Nav: React.FC = () => {
	const auth = useSelector(selectCurrentAuthData);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const location = useLocation();

	const isLoggedIn = !!auth.access_token;

	// Hide "Become a Host" on login & signup
	// const hideBecomeHost =
	// 	location.pathname === "/login" || location.pathname === "/signup";

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};

	// Generate avatar initials from name
	const getInitials = () => {
		if (!auth?.name) return "U";

		const words = auth.name.trim().split(" ");
		if (words.length === 1) return words[0][0].toUpperCase();

		return `${words[0][0]}${words[1][0]}`.toUpperCase();
	};

	console.log(auth);

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

				{/* Nav */}
				<nav className="hidden items-center gap-6 text-sm font-medium md:flex">
					{navLinks.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="text-muted-foreground transition hover:text-foreground"
						>
							{link.label}
						</a>
					))}
				</nav>

				{/* Right Actions */}
				<div className="flex items-center gap-2">
					{/* Logged-in UI */}
					{isLoggedIn ? (
						<>
							{/* Wishlist */}
							<Link to="/wishlist">
								<Button variant="ghost" size="icon">
									<Heart className="h-5 w-5" />
								</Button>
							</Link>

							{/* User Dropdown */}
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<button className="outline-none">
										<Avatar className="h-9 w-9 cursor-pointer">
											<AvatarImage src={auth.avatar ?? ""} />
											<AvatarFallback>
												{getInitials()}
											</AvatarFallback>
										</Avatar>
									</button>
								</DropdownMenuTrigger>

								<DropdownMenuContent align="end" className="w-44">
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
						/* Guest UI */
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
