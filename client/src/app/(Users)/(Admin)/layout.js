import "@/app/globals.css";
import { notoSerif, inter } from "@/app/fonts";

export default function AdminDashboardLayout({ children }) {
    return (
        <html lang="en" className={`${notoSerif.variable} ${inter.variable}`}>
            <body>
                {children}</body>
        </html>
    )
}
