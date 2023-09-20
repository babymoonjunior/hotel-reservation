
import HotelInfoUpdate from "@/app/(Users)/components/HotelInfoUpdate";
import "@/app/globals.css";

export const metadata = {
  title: "Hotel Information",
  description: "รายละเอียดของโรงแรม",
};

export default async function HotelInfo() {
  return (
    <div>
      <div>
        <HotelInfoUpdate />
      </div>
    </div>
  );
}
