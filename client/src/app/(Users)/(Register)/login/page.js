import '@/app/globals.css'
import LoginFrom from '../../components/loginFrom.jsx';
import Image from 'next/image.js';

export const metadata = {
  title: 'Login Page',
  description: 'เข้าสู่ระบบ',
}

export default function LoginPage() {
  return (
    <div className='flex text-gray-900 h-full w-full'>
      {/* ใส่ Component1 <RegisterForm /> ที่นี่ (Pond) */}
      <div className=" flex-1 h-[924px] w-[708px] relative">
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