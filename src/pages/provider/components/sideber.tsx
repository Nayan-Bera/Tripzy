import {
  Home,
  BedDouble,
  CalendarDays,
  Users,
  DollarSign,
  Star,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: Home },
  { name: "Properties", icon: BedDouble },
  { name: "Bookings", icon: CalendarDays },
  { name: "Guests", icon: Users },
  { name: "Payments", icon: DollarSign },
  { name: "Reviews", icon: Star },
  { name: "Reports", icon: BarChart3 },
  { name: "Settings", icon: Settings },
];

export default function Sidebar({
  active,
  setActive,
}: {
  active: string;
  setActive: (name: string) => void;
}) {
  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col">
      <div className="p-4 text-2xl font-bold text-blue-600 border-b">
        Hotel Admin
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center w-full px-4 py-2 rounded-xl text-left transition ${
                active === item.name
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <button className="flex items-center text-gray-700 hover:text-red-500 transition">
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </button>
      </div>
    </aside>
  );
}
