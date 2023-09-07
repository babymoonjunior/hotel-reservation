import '@/app/globals.css'
import CustomerSay from "../components/CustomerSay"
import Cover from "../components/Cover";
import Services from '../components/Services'
import Roomtypes from '../components/Roomtypes'

export const metadata = {
  title: "Home Page",
  description: "หน้าแรกของโรงแรม",
};

  return (
    <>
      <h1 className="title-text">หน้า Localhost Details</h1>

      {/* ใส่ Component2 <Coverpage /> ที่นี่ (Nu) */}
      <Cover />

      {/* ใส่ Component3 <About /> ที่นี่ (Michael) */}

      {/* ใส่ Component4 <Services /> ที่นี่ (Wen) */}
      <Services />

      {/* ใส่ Component5 <Roomtypes /> ที่นี่ (Wen) */}
      <Roomtypes />

      {/* ใส่ Component6 <CustomerSay /> ที่นี่ (Michael) */}

    </>
  );
}
