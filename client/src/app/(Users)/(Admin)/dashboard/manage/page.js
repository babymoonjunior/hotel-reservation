import "@/app/globals.css";
import RoomManageBody from "@/app/(Users)/components/(dashboard)/RoomManage";

export const metadata = {
    title: "Dashboard",
    description: "หน้าแรกของAdmin",
};

export default async function AdminDashboard() {
    return <>
        <div >
            <div >
                <RoomManageBody />
            </div>
        </div>
    </>
}