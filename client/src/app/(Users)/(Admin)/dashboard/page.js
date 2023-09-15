import "@/app/globals.css";
import Sidebar from "../../components/(dashboard)/Sidebar";

export const metadata = {
    title: "Dashboard",
    description: "หน้าแรกของAdmin",
};

export default async function AdminDashboard() {
    return <div className="flex">
        <Sidebar />
        <div className="w-full h-full">
            <h1>TEST
            </h1>
        </div></div>
}