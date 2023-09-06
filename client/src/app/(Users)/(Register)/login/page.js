import '@/app/globals.css'
import LoginFrom from '../../components/loginFrom.jsx';
import Image from 'next/image.js';

export const metadata = {
  title: 'Login Page',
  description: 'เข้าสู่ระบบ',
}

export default function LoginPage() {
  return (
    <div className='flex bg-utility-bg text-gray-900 h-full w-full'>
      {/* ใส่ Component1 <RegisterForm /> ที่นี่ (Pond) */}
      <div className=" h-full w-1/2 relative">
        <Image
          className=' object-cover'
          src="/loginphoto.svg"
          width={708}
          height={924}
          alt="photo-login"
        />
      </div>
      <LoginFrom />
    </div>
  );
}