//localhost:3000/register
"use client";

import '@/app/globals.css'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import imgRegister from '../../../../../public/imgRegister.svg';
import crossImg from '../../../../../public/crossImage.svg';
import countryData from '../../components/countryData.json';
import Link from 'next/link';
import axios from 'axios';


export const metadata = {
    title: 'Register Member',
    description: 'สมัครสมาชิก',
}

export default function RegisterPage() {
    const form = useForm();
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;
    const [ countries, setCountries ] = useState([]);
    
    const onSubmit = async (data) => {
        const formData = new FormData()
        formData.append("fullName", data.fullName)
        formData.append("userName", data.userName)
        formData.append("password", data.password)
        formData.append("email", data.email)
        formData.append("idNumber", data.idNumber)
        formData.append("dateBirth", data.dateBirth)
        formData.append("country", data.country)
        formData.append("cardNumber", data.cardNumber)
        formData.append("cardOwner", data.cardOwner)
        formData.append("expiryDate", data.expiryDate)
        formData.append("cvcCvv", data.cvcCvv)
        
        await axios.post("http://localhost:4000/register", formData,
        { headers: { "Content-Type" : "application/json"}});
    }

    useEffect(() => {
        const data = countryData
        setCountries(data)
    }, [])

    return (
        <div className='h-[1777px] w-screen relative'> {/* background image */}
            <Image
                className=''
                src={imgRegister}
                layout="fill"
                style={
                    {objectFit: 'cover'}
                }
            />
           
            {/* page form register */}
            <div className='relative max-w-[1092px] mx-auto pl-[50px] pt-[50px]
             bg-slate-50 pb-[50px] my-12 '>
                <div className='flex flex-col gap-12 '>
                    <h1 className="font-mono font-medium text-[68px] leading-[85px] text-green-800">
                        Register 
                    </h1>
                    <h4 className='font-sans font-semibold text-[20px] leading-[30px] text-gray-600  pb-10'>
                        Basic Information
                    </h4>
                </div>
                <form 
                    className="mr-[50px]"
                    onSubmit={handleSubmit(onSubmit)}>

                    {/* input fullName register */}
                    <div className="w-full ">
                        <label className='' 
                        htmlFor="fullName">Full Name</label>
                        <input className={`w-full h-[48px] bg-white border-[1px]
                        placeholder-slate-400 rounded p-[12px] focus:outline-none
                        focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                        disabled:shadow-none text-blue-800 border-gray-400
                        ${errors.userName && "border-red-500 ring-red-500 ring-1"}`}                  
                        type="text" id="fullName" placeholder="Enter your name and lastname"
                            {...register("fullName", {
                            required: {
                                value: true,
                                message: '* FullName is required.'
                            },
                            pattern: {
                                value:
                                    /^[ก-๏\s].*\s[ก-๏\s]|[a-zA-Z].*\s[a-zA-z]+$/,
                                message: "* Invalid Fullname."
                            }
                        })} 
                        />
                        <p className='error text-red-500'>{errors.fullName?.message}</p>
                    </div>
                
                    <div className='grid md:grid-cols-[52%_52%] '>
                        <div className='flex flex-col gap-2 mt-10 w-full md:w-11/12'>
                            <label className=''
                            htmlFor='userName'>Username</label>
                            <input className={`w-full h-[48px] bg-white border-[1px]
                            placeholder-slate-400 rounded p-[12px] focus:outline-none
                            focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                            disabled:shadow-none text-blue-800 border-gray-400
                            ${errors.userName && "border-red-500 ring-red-500 ring-1"}`} 
                            type="text" id="userName" placeholder='Enter your username'  
                            {...register("userName", {                         
                                required: {
                                    value: true,
                                    message: '* Username is required.'
                                },
                                pattern: {
                                    value: 
                                        /^[ก-๏\s]|[a-zA-Z]|[0-9]+$/,                              
                                    message: "* Invalid username."
                                }
                            })}
                            />
                            <p className='error text-red-500 border-red-500'>{errors.userName?.message}</p>
                        </div>

                        <div className="flex flex-col gap-2 mt-10 w-full md:w-11/12">
                            <label htmlFor="email">E-mail</label>
                            <input className={`w-full h-[48px] bg-white border-[1px]
                            placeholder-slate-400 rounded p-[12px] focus:outline-none
                            focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                            disabled:shadow-none text-blue-800 border-gray-400
                            ${errors.userName && "border-red-500 ring-red-500 ring-1"}`}
                            type="email" id="email" placeholder="Enter your email"
                            {...register("email", {
                            required: {
                                value: true,
                                message: '* Email is required.'
                            },
                            pattern: {
                                value:
                                    /^[a-zA-Z0-9?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[com]+)*$/,
                                message: "* Invalid email format.",
                            },
                            validate: {
                                notAdmin: (fieldValue) => {
                                    return (
                                        fieldValue !== "admin@example.com" ||
                                        "* Enter a different email address."
                                )},
                                notBlackListed: (fieldValue) => { // map.blackList (Array)
                                    return !fieldValue.endsWith("gmail.com") || 
                                    "* This domain is not supported."   
                                }
                            }
                            })} 
                            />
                            <p className="error text-red-500">{errors.email?.message}</p>
                        </div>

                        <div className='flex flex-col gap-2 mt-10 w-full md:w-11/12'>
                            <label htmlFor='password'>Password</label>
                            <input className={`w-full h-[48px] bg-white border-[1px]
                            placeholder-slate-400 rounded p-[12px] focus:outline-none
                            focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                            disabled:shadow-none text-blue-800 border-gray-400
                            ${errors.userName && "border-red-500 ring-red-500 ring-1"}`}
                            type="password" id="password" placeholder='Enter your password'
                                {...register("password", {
                                required: {
                                    value: true,
                                    message: "* Password is required."
                                },
                                pattern: {
                                    value: true,
                                    message: "* "
                                },
                                minLength: {
                                    value: 12,
                                    message: '* Password less than 12 characters.'
                                }
                            })}
                            />
                            <p className='error text-red-500'>{errors.password?.message}</p>
                        </div>                  

                        <div className='flex flex-col gap-2 mt-10 md:w-11/12'>
                            <label htmlFor='idNumber'>ID Number</label>
                            <input className={`w-full h-[48px] bg-white border-[1px]
                            placeholder-slate-400 rounded p-[12px] focus:outline-none
                            focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                            disabled:shadow-none text-blue-800 border-gray-400
                            ${errors.userName && "border-red-500 ring-red-500 ring-1"}`}
                            type='idNumber' id="idNumber" placeholder='Enter your ID Number'
                            {...register("idNumber", {
                            required: {
                                value: true,
                                message: "* ID Number is required."
                            },
                            minLength: {
                                value: 13,
                                message: "* ID Number less than 13 digit."
                            },
                            maxLength: {
                                value: 13,
                                message: "* ID Number more than 13 digit."
                            }
                            })}
                            />
                            <p className="error text-red-500">{errors.idNumber?.message}</p>
                        </div>
                    
                        {/* input date of birth */}
                        <div className='flex flex-col gap-2 mt-10 w-full md:w-11/12'>
                            <label htmlFor='dateBirth'>Date of Birth</label>
                            <input className={`w-full h-[48px] bg-white border-[1px]
                            placeholder-slate-400 rounded p-[12px] focus:outline-none
                            focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                            disabled:shadow-none text-blue-800 border-gray-400
                            ${errors.userName && "border-red-500 ring-red-500 ring-1"}`}
                            type='date' id='dateBirth'
                            onChange={(e) => {
                                const currentYear = new Date().getFullYear();
                                const year = e.target.value.split("-")[0];
                                const age = currentYear - year; 
                                return age                              
                            }}
                            {...register("dateBirth", {
                                required: {
                                    value: true,
                                    message: "* Date of birth is required."
                                },
                                valueAsDate: true,
                                min: {
                                    value: 18,
                                    message: "* your age less than 18."
                                }
                            })}
                            />
                            <p className='error text-red-500'>{errors.dateBirth?.message}</p>
                        </div>  
         
                        {/* input dropdrown menu country */}
                         <div className='flex flex-col gap-2 mt-10 md:w-11/12'>
                            <label htmlFor='country'>Country</label>
                            <select className={`w-full h-[48px] bg-white border-[1px]
                            placeholder-slate-400 rounded p-[12px] focus:outline-none
                            focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                            disabled:shadow-none text-blue-800 border-gray-400
                            ${errors.userName && "border-red-500 ring-red-500 ring-1"}`}
                            {...register("country", {
                                required: {
                                    value: true,
                                    message: "* Country is required."
                                }
                            })}
                            >
                                <option value='' >Select your country</option>
                                {
                                    countries.map((item) => {
                                        return(
                                            <option key={item.country}>
                                                {item.country}
                                            </option>
                                        )
                                    })
                                }
                            </select>        
                            <p className='error text-red-500'>{errors.country?.message}</p>
                        </div>
                    </div>

                    {/* input upload profile */}
                    <div className='bg-gray-400 h-[1px] w-full mt-10 mb-10'></div>

                    <div className='flex flex-col justify-center '>         
                        <h1 className='mb-10'>Profile Picture</h1>
                        <div className=' bg-gray-200 hover:bg-gray-400 
                        w-[180px] h-[180px] flex flex-col justify-center
                        items-center '>
                            <label htmlFor='file'><Image
                                className='mx-10 cursor-pointer'
                                src={crossImg}
                                style={
                                    {objectFit: 'cover'}
                                }
                                /><h4 className='cursor-pointer py-4 text-orange-500'>Upload photo</h4>
                            </label> 
                            <input type="file" id="file" className='hidden' />                                                       
                        </div>
                    </div>

                    <div className='bg-gray-400 h-[1px] w-full mt-16 mb-10'></div>      

                    <div>
                        <h1>Credit Card</h1>
                    </div>

                    <div className='grid md:grid-cols-[52%_52%]'>
                        <div className='flex flex-col gap-2 mt-10 w-full md:w-11/12'>
                            <label className=''
                                htmlFor='cardNumber'>Card Number</label>   
                            <input className={`w-full h-[48px] bg-white border-[1px]
                            placeholder-slate-400 rounded p-[12px] focus:outline-none
                            focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                            disabled:shadow-none text-blue-800 border-gray-400
                            ${errors.cardNumber && "border-red-500 ring-red-500 ring-1"}`} 
                            type="text" id="cardNumber" placeholder='Enter your card number'  
                            {...register("cardNumber", {                         
                                required: {
                                    value: true,
                                    message: '* Card Number is required.'
                                },
                                pattern: {
                                    value: 
                                        /[0-9]{16}/,                              
                                    message: "* Invalid Card Number."
                                }
                            })}
                            />
                            <p className='error text-red-500 border-red-500'>{errors.cardNumber?.message}</p>
                        </div>

                        <div className='flex flex-col gap-2 mt-10 w-full md:w-11/12'>
                            <label
                                htmlFor='cardOwner'>Card Owner</label>
                            <input className={`w-full h-[48px] bg-white border-[1px]
                            placeholder-slate-400 rounded p-[12px] focus:outline-none
                            focus:border-orange-400 focus:ring-1 focus:ring-orange-50
                            disabled:shadow-none text-blue-800 border-gray-400
                            ${errors.cardOwner && "border-red-500 ring-red-500 ring-1"}`}
                            type='text' id="cardOwner" placeholder='Enter your card name'
                            {...register("cardOwner", {
                                required: {
                                    value: true,
                                    message: '* Card Name is required.'
                                },
                                pattern: {
                                    value: 
                                        /[a-zA-Z]/,
                                    message: "* Invalid Card Owner"
                                }
                            })}
                            />
                            <p className='error text-red-500 border-red-500'>{errors.cardOwner?.message}</p>
                        </div>

                        <div className='flex flex-col gap-2 mt-10 w-full md:w-11/12'>
                            <label
                                htmlFor='expiryDate'>Expiry Date</label>
                            <input className={`w-full h-[48px] bg-white border-[1px]
                            placeholder-slate-400 rounded p-[12px] focus:outline-none
                            focus:border-orange-400 focus:ring-1 focus:ring-orange-50
                            disabled:shadow-none text-blue-800 border-gray-400
                            ${errors.cardOwner && "border-red-500 ring-red-500 ring-1"}`}
                            type='text' id='expiryDate' placeholder='MM/YY'
                            {...register("expiryDate", {
                                required: {
                                    value: true,
                                    message: '* Expiry Date is required.'
                                },
                                pattern: {
                                    value: 
                                        /[0-9]\w/,
                                    message: "* Invalid Expiry Date"
                                }
                            })}
                            />
                            <p className='error text-red-500 border-red-500'>{errors.expiryDate?.message}</p>
                        </div>

                        <div className='flex flex-col gap-2 mt-10 w-full md:w-11/12'>
                            <label
                                htmlFor='cvc-cvv'>CVC/CVV</label>
                            <input className={`w-full h-[48px] bg-white border-[1px]
                            placeholder-slate-400 rounded p-[12px] focus:outline-none
                            focus:border-orange-400 focus:ring-1 focus:ring-orange-50
                            disabled:shadow-none text-blue-800 border-gray-400
                            ${errors.cardOwner && "border-red-500 ring-red-500 ring-1"}`}
                            type="text" id="cvc-cvv" placeholder='CVC/CVV'
                            {...register("cvcCvv", {
                                required: {
                                    value: true,
                                    message: '* CVC/CVV is required.'
                                },
                            })}
                            />
                            <p className='error text-red-500 border-red-500'>{errors.cvcCvv?.message}</p>
                        </div>

                        <div className='mt-[50px] w-full md:w-11/12'>
                            <button className='bg-orange-600 inline-block py-4 w-full'>
                                <h1 className='text-white font-semibold font-sans
                                    leading-4 text-[16px]'>
                                        Register
                                </h1>
                            </button>
                        </div>   
                    </div>                
                </form>
                <div className='py-4'>
                    <span className=''>Already have an account?</span>
                    <Link href="/login">
                        <h1 className='inline-block text-orange-600 mx-4'>Login</h1>
                    </Link>        
                </div>
            
            {/* <Roomtypes /> */}
            {/* ใส่ Component2 <CreditcardForm /> ที่นี่ (Nu) */}

            </div>         
        </div>
    );
}
