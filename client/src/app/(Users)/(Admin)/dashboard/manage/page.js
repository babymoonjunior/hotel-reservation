import "@/app/globals.css";
import RoomManageHeader from "@/app/(Users)/components/(dashboard)/RoomManageHeader";

export const metadata = {
    title: "Dashboard",
    description: "หน้าแรกของAdmin",
};

export default async function AdminDashboard() {
    return <>
        <div >
            <div >
                <RoomManageHeader />
                <h1>TEST manage</h1>
                <div className="h-[1024px] w-full bg-red-300"> 1</div>
            </div>
        </div>
    </>
}