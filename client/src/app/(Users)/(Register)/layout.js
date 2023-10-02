import "@/app/globals.css";
import { notoSerif, inter } from "@/app/fonts";
import Navbar from "../components/Navbar";

export default function RegisterGroupLayout({ children }) {
  return (
    <html lang="en" className={`${notoSerif.variable} ${inter.variable}`}>
      <body className="flex flex-col">
        {/* ใส่ Component1 <Navbar /> ที่นี่ (Michael) */}
        <Navbar />
        <hr />
        {children}
        <hr />
        {/* ใส่ Component7 <Footer /> ที่นี่ (Wen) */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
export const dynamic = "force-dynamic";