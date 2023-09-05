import '@/app/globals.css'
import LoginFrom from '../../components/loginFrom.jsx';
import Image from 'next/image.js';

export const metadata = {
  title: 'Login Page',
  description: 'เข้าสู่ระบบ',
}

export default function LoginPage() {
  return (
    <div className='flex bg-utility-bg text-gray-900 h-full w-[1440px]'>
      {/* ใส่ Component1 <RegisterForm /> ที่นี่ (Pond) */}
      <div className=" h-[924px] w-1/2 relative">
        <Image
          className=""
          src="/loginphoto.svg"
          objectFit="cover"
          layout="fill"
          alt="photo-login"
        />
      </div>
      <LoginFrom />
    </div>
  );
}