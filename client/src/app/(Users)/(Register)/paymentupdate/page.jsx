"use client"
import React from 'react';
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import imgRegister from "../../../../../public/imgRegister.svg";
import countryData from "../../components/countryData.json";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
// import { supabase } from '@/supabase';

export default function paymentUpdatePage() {

//   const fetchOrders = async () => {
//     try {
//         let data = await supabase
//             .from('profile')
//             .select('*')
//     }
//     catch(error) {

//     }
//   }

  return (
    <div className="h-[1087px] w-screen relative bg-slate-50">
        <div className="max-w-[930px] mx-auto pl-[1px] pr-[2px]
             bg-slate-50 my-12 mt-20">

            <div className='flex flex-col md:flex-row items-center mx-auto
             justify-between text-center md:text-left'>
                <h1 className="font-serif font-medium text-[68px] leading-[85px]
                    text-green-800 break-words w-[70%]">
                        Payment Method
                </h1>
                <button 
                    className='bg-orange-600 px-[34px] h-[48px] rounded-[4px]'>
                    <h1 className='text-white text-[16px] font-openSans font-semibold
                     leading-[16px] break-words'>
                        Update payment method
                    </h1> 
                </button>           
            </div>
            <div className='md:text-left text-center'>
                <h4 className='font-sans font-semibold text-[20px] leading-[30px]
                 text-gray-600 mt-[100px]'>
                    Credit Card
                </h4>
            </div>
            <form className="grid md:grid-cols-[52%_52%]">               
                <div className='flex flex-col w-full gap-2 mt-10 md:w-11/12'>
                    <label 
                        htmlFor="card-number"
                        className="text-gray-900 text-[16px] font-sans leading-[24px]
                         font-normal break-words" >
                            Card Number                      
                    </label>
                    <input className = {`w-full h-[48px] bg-white border-[1px]
                        text-[16px] font-sans leading-6 p-[12px] text-black
                        placeholder-slate-400 rounded focus:outline-none
                        focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                        disabled:shadow-none border-gray-400 break-words`} 
                    />
                </div>   
                <div className='flex flex-col w-full gap-2 mt-10 md:w-11/12'>
                    <label 
                        htmlFor="card-owner"
                        className="text-gray-900 text-[16px] font-sans leading-[24px]
                         font-normal break-words" >
                            Card Owner
                    </label>
                    <input className = {`w-full h-[48px] bg-white border-[1px]
                        text-[16px] font-sans leading-6 p-[12px] text-black
                        placeholder-slate-400 rounded focus:outline-none
                        focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                        disabled:shadow-none border-gray-400 break-words`} 
                    />
                </div>   
                <div className="flex flex-col w-full gap-2 mt-10 md:w-11/12">
                    <label 
                        htmlFor="expiry-date"
                        className="text-gray-900 text-[16px] font-sans leading-[24px]
                         font-normal break-words" >
                            Expiry Date
                    </label>
                    <input className = {`w-full h-[48px] bg-white border-[1px]
                        text-[16px] font-sans leading-6 p-[12px] text-black
                        placeholder-slate-400 rounded focus:outline-none
                        focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                        disabled:shadow-none border-gray-400 break-words`} 
                    />
                </div>   
                <div className="flex flex-col w-full gap-2 mt-10 md:w-11/12">
                    <label 
                        htmlFor="fullName"
                        className="text-gray-900 text-[16px] font-sans leading-[24px]
                         font-normal break-words" >                       
                            CVC/CVV
                    </label>
                    <input className = {`w-full h-[48px] bg-white border-[1px]
                        text-[16px] font-sans leading-6 p-[12px] text-black
                        placeholder-slate-400 rounded focus:outline-none
                        focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                        disabled:shadow-none border-gray-400 break-words`} 
                    />
                </div>                
            </form>
        </div>
    </div>
    )
}
