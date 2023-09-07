import Link from "next/link";
//Modal คือ การ์ดด้านหลังสีเทาหลังการ์ด Full image

export default function Modal({ children }) {
  return (
    <div>
      <Link
        href="/search"
        className="modal w-full h-screen bg-black fixed top-0 left-0 z-[99]"
        // style={{ background: "rgba(0, 0, 0, 0.3)" }}
        scroll={false}
        
      />
      {children}
    </div>
  );
}
