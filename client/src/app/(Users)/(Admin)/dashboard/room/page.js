import "@/app/globals.css";
import RoomProperty from "./RoomProperty";

export const metadata = {
  title: "Dashboard",
  description: "หน้าแรกของAdmin",
};

export default async function AdminDashboard() {
  return <RoomProperty />;
}
