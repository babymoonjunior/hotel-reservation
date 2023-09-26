import "@/app/globals.css";
import RoomManageHeader from "@/app/(Users)/components/(dashboard)/RoomManageHeader";
import RoomManageBody from "@/app/(Users)/components/(dashboard)/RoomManageBody";

export const metadata = {
    title: "Dashboard",
    description: "หน้าแรกของAdmin",
};

export default async function AdminDashboard() {
    return <>
        <div >
            <div >
                <RoomManageHeader />
                <RoomManageBody />
            </div>
        </div>
    </>
}