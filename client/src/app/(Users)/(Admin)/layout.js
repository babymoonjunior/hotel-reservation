import "@/app/globals.css";
import { notoSerif, inter } from "@/app/fonts";
import Sidebar from "../components/(dashboard)/Sidebar";

export default function AdminDashboardLayout({ children }) {
    return (
        <html lang="en" className={`${notoSerif.variable} ${inter.variable}`}>
            <body>
                <Sidebar />
                {children}</body>
        </html>
    )
}
