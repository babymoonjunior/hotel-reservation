import CustomerBookingBoard from "@/app/(Users)/components/(dashboard)/partDashboardBooking";
import "@/app/globals.css";

export const metadata = {
  title: "Dashboard",
  description: "หน้าแรกของAdmin",
};

export default async function AdminDashboard() {
  return (
    <div>
      <div>
        {/* <CustomerBookingBoard /> */}
        <CustomerBookingBoard />
      </div>
    </div>
  );
}
