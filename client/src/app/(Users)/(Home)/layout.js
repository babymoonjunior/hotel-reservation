import "@/app/globals.css";
import { notoSerif, inter } from "@/app/fonts";
import Navbar from "../components/Navbar";
import SearchRoomProvider from "@/context/searchRoom";

export const metadata = {
  title: "Home Page",
  description: "Neatly Hotel Booking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${notoSerif.variable} ${inter.variable}`}>
      <body className="flex flex-col">
        <SearchRoomProvider>
          {/* ใส่ Component1 <Navbar /> ที่นี่ (Michael) */}
          <Navbar />

          {children}

          {/* ใส่ Component7 <Footer /> ที่นี่ (Wen) */}
          {/* <Footer /> */}
        </SearchRoomProvider>
      </body>
    </html>
  );
}
