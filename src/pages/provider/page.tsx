import ProviderLayout from "@/layouts/ProviderLayout";

export default function ProviderPage() {
  return (
    <ProviderLayout>
      {/* Dashboard Page Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-sm text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-800">$45,200</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-sm text-gray-500">Occupancy Rate</h3>
          <p className="text-2xl font-bold text-gray-800">78%</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-sm text-gray-500">Active Bookings</h3>
          <p className="text-2xl font-bold text-gray-800">124</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-sm text-gray-500">Pending Payouts</h3>
          <p className="text-2xl font-bold text-gray-800">$6,300</p>
        </div>
      </div>
    </ProviderLayout>
  );
}
