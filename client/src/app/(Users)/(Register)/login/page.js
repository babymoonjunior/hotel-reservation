import '@/app/globals.css'
import LoginFrom from '../../components/loginFrom.jsx';

export const metadata = {
  title: 'Login Page',
  description: 'เข้าสู่ระบบ',
}

export default function LoginPage() {
  return (
    <div>
      {/* ใส่ Component1 <RegisterForm /> ที่นี่ (Pond) */}
      <LoginFrom />
    </div>
  );
}