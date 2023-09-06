import '@/app/globals.css'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'


export const metadata = {
  title: 'Home Page',
  description: 'หน้าแรกของโรงแรม',
}

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.from("users").select();

  return (
    <>
      <h1 className="title-text">หน้า Localhost Details</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>
      {/* ใส่ Component2 <Coverpage /> ที่นี่ (Nu) */}

      {/* ใส่ Component3 <About /> ที่นี่ (Michael) */}

      {/* ใส่ Component4 <Services /> ที่นี่ (Wen) */}
      {/* <Services /> */}

      {/* ใส่ Component5 <Roomtypes /> ที่นี่ (Wen) */}
      {/* <Roomtypes /> */}

      {/* ใส่ Component6 <CustomerSay /> ที่นี่ (Michael) */}

    </>

  )
}
