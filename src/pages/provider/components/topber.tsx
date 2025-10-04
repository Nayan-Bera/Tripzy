
export default function Topbar({ title }: { title: string }) {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      <div className="flex items-center space-x-4">
        <button className="relative">
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          🔔
        </button>
        <div className="flex items-center space-x-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-gray-700">Admin</span>
        </div>
      </div>
    </header>
  );
}
