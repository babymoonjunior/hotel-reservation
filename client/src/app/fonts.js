import { Noto_Serif, Inter } from 'next/font/google'
 
export const notoSerif = Noto_Serif({ 
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    display: 'swap',
    variable: '--font-notoSerif',
  });
  
export const inter = Inter({ 
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    display: 'swap',
    variable: '--font-inter',
  });