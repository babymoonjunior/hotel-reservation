import "@/app/globals.css";
import { notoSerif, inter } from "@/app/fonts";
import Sidebar from "../components/(dashboard)/Sidebar";

export default function AdminDashboardLayout({ children }) {
    return (
        <html lang="en" className={`${notoSerif.variable} ${inter.variable}`}>
            <body style={{ overflow: 'hidden' }}>
                <div className=" h-screen">
                    <div className="flex h-full">
                        <Sidebar />
                        <div className="h-full w-full overflow-y-auto">
                            {children}
                        </div>
                    </div>
                </div>

            </body>
        </html>
    )
}
