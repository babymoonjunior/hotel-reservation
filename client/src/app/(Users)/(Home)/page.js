import "@/app/globals.css";
import Cover from "../components/Cover";
import Services from "../components/Services";
import Roomtypes from "../components/Roomtypes";
import CustomerSay from "../components/CustomerSay";
import AboutMain from "../components/AboutMain";
import AboutRow from "../components/AboutRow";
import customers from "@/data/customers";

export const metadata = {
  title: "Home Page",
  description: "หน้าแรกของโรงแรม",
};

export default async function Home() {
  return (
    <>
      {/* ใส่ Component2 <Coverpage /> ที่นี่ (Nu) */}
      <Cover />

      {/* ใส่ Component3 <About /> ที่นี่ (Michael) */}
      <AboutMain customers={customers} />
      {/* <AboutRow customers={customers} /> */}
      {/* ใส่ Component4 <Services /> ที่นี่ (Wen) */}
      <Services />

      {/* ใส่ Component5 <Roomtypes /> ที่นี่ (Wen) */}
      <Roomtypes />

      {/* ใส่ Component6 <CustomerSay /> ที่นี่ (Michael) */}
      <CustomerSay />
    </>
  );
}
