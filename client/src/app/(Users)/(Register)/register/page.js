//localhost:3000/register
"use client";

import "@/app/globals.css";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import imgRegister from "../../../../../public/imgRegister.svg";
import countryData from "../../components/countryData.json";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Avatar from "../../components/Avatar";
import { useRouter } from "next/navigation";

export const metadata = {
  title: "Register Member",
  description: "สมัครสมาชิก",
};

export default function RegisterPage() {
  const form = useForm();
  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [avatar_url, setAvatar] = useState(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("userName", data.userName);
    formData.append("password", data.password);
    formData.append("email", data.email);
    formData.append("idNumber", data.idNumber);
    formData.append("dateBirth", data.dateBirth);
    formData.append("country", data.country);
    formData.append("cardNumber", data.cardNumber);
    formData.append("cardOwner", data.cardOwner);
    formData.append("expiryDate", data.expiryDate);
    formData.append("cvcCvv", data.cvcCvv);
    const avartarImage =
      avatar_url !== null ? avatar_url : "https://picsum.photos/200";

    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: formData.get("email"),
        password: formData.get("password"),
        options: {
          data: {
            full_name: formData.get("fullName"),
            username: formData.get("userName"),
            avatar_url: avartarImage,
            id_card: formData.get("idNumber"),
            birthdate: formData.get("dateBirth"),
            country: formData.get("country"),
            card_number: formData.get("cardNumber"),
            card_owner: formData.get("cardOwner"),
            card_expire: formData.get("expiryDate"),
            card_cvc: formData.get("cvcCvv"),
          },
        },
      });

      if (error) {
        alert(`Register Not Successfully`);
        setLoading(false);
      } else {
        alert(`Register Successfull`);
        setLoading(false);
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const data = countryData;
    setCountries(data);
  }, []);

  return (
    <div className="h-[1777px] w-screen relative">
      {" "}
      {/* background image */}
      <Image
        className=""
        src={imgRegister}
        alt="bg"
        layout="fill"
        style={{ objectFit: "cover" }}
      />
      {/* page form register */}
      <div
        className="relative max-w-[1092px] mx-auto pl-[50px] pt-[50px]
             bg-slate-50 pb-[50px] my-12 "
      >
        <div className="flex flex-col gap-12 ">
          <h1 className="font-mono font-medium text-[68px] leading-[85px] text-green-800">
            Register
          </h1>
          <h4 className="font-sans font-semibold text-[20px] leading-[30px] text-gray-600  pb-10">
            Basic Information
          </h4>
        </div>
        <form className="mr-[50px]" onSubmit={handleSubmit(onSubmit)}>
          {/* input fullName register */}
          <div className="w-full ">
            <label className="" htmlFor="fullName">
              Full Name
            </label>
            <input
              className={`w-full h-[48px] bg-white border-[1px]
                        placeholder-slate-400 rounded p-[12px] focus:outline-none
                        focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                        disabled:shadow-none text-blue-800 border-gray-400
                        ${
                          errors.userName &&
                          "border-red-500 ring-red-500 ring-1"
                        }`}
              type="text"
              id="fullName"
              placeholder="Enter your name and lastname"
              {...register("fullName", {
                required: {
                  value: true,
                  message: "* FullName is required.",
                },
                pattern: {
                  value: /^[ก-๏].*\s[ก-๏]|[a-zA-Z].*\s[a-zA-z]+$/,
                  message: "* Invalid Fullname.",
                },
              })}
            />
            <p className="text-red-500 error">{errors.fullName?.message}</p>
          </div>

          <div className="grid md:grid-cols-[52%_52%] ">
            <div className="flex flex-col w-full gap-2 mt-10 md:w-11/12">
              <label className="" htmlFor="userName">
                Username
              </label>
              <input
                className={`w-full h-[48px] bg-white border-[1px]
                            placeholder-slate-400 rounded p-[12px] focus:outline-none
                            focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                            disabled:shadow-none text-blue-800 border-gray-400
                            ${
                              errors.userName &&
                              "border-red-500 ring-red-500 ring-1"
                            }`}
                type="text"
                id="userName"
                placeholder="Enter your username"
                {...register("userName", {
                  required: {
                    value: true,
                    message: "* Username is required.",
                  },
                  pattern: {
                    value: /^[ก-๏\s]|[a-zA-Z]|[0-9]+$/,
                    message: "* Invalid username.",
                  },
                })}
              />
              <p className="text-red-500 border-red-500 error">
                {errors.userName?.message}
              </p>
            </div>

            <div className="flex flex-col w-full gap-2 mt-10 md:w-11/12">
              <label htmlFor="email">E-mail</label>
              <input
                className={`w-full h-[48px] bg-white border-[1px]
                            placeholder-slate-400 rounded p-[12px] focus:outline-none
                            focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                            disabled:shadow-none text-blue-800 border-gray-400
                            ${
                              errors.userName &&
                              "border-red-500 ring-red-500 ring-1"
                            }`}
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "* Email is required.",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[com]+)*$/,
                    message: "* Invalid email format.",
                  },
                })}
              />
              <p className="text-red-500 error">{errors.email?.message}</p>
            </div>

            <div className="flex flex-col w-full gap-2 mt-10 md:w-11/12">
              <label htmlFor="password">Password</label>
              <input
                className={`w-full h-[48px] bg-white border-[1px]
                            placeholder-slate-400 rounded p-[12px] focus:outline-none
                            focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                            disabled:shadow-none text-blue-800 border-gray-400
                            ${
                              errors.userName &&
                              "border-red-500 ring-red-500 ring-1"
                            }`}
                type="password"
                id="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "* Password is required.",
                  },
                  pattern: {
                    value: true,
                    message: "* ",
                  },
                  minLength: {
                    value: 10,
                    message: "* Password less than 10 characters.",
                  },
                })}
              />
              <p className="text-red-500 error">{errors.password?.message}</p>
            </div>

            <div className="flex flex-col gap-2 mt-10 md:w-11/12">
              <label htmlFor="idNumber">ID Number</label>
              <input
                className={`w-full h-[48px] bg-white border-[1px]
                            placeholder-slate-400 rounded p-[12px] focus:outline-none
                            focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                            disabled:shadow-none text-blue-800 border-gray-400
                            ${
                              errors.userName &&
                              "border-red-500 ring-red-500 ring-1"
                            }`}
                type="idNumber"
                id="idNumber"
                placeholder="Enter your ID Number"
                {...register("idNumber", {
                  required: {
                    value: true,
                    message: "* ID Number is required.",
                  },
                  minLength: {
                    value: 13,
                    message: "* ID Number less than 13 digit.",
                  },
                  maxLength: {
                    value: 13,
                    message: "* ID Number more than 13 digit.",
                  },
                })}
              />
              <p className="text-red-500 error">{errors.idNumber?.message}</p>
            </div>

            {/* input date of birth */}
            <div className="flex flex-col w-full gap-2 mt-10 md:w-11/12">
              <label htmlFor="dateBirth">Date of Birth</label>
              <Controller
                name="dateBirth"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className={`w-full h-[48px] bg-white border-[1px]
                                placeholder-slate-400 rounded p-[12px] focus:outline-none
                                focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                                disabled:shadow-none text-black border-gray-400
                                ${
                                  errors.dateBirth &&
                                  "border-red-500 ring-red-500 ring-1"
                                }`}
                    type="date"
                    placeholder="dd-mm-yyyy"
                  />
                )}
                rules={{
                  required: "* Date of birth is required.",
                  validate: (value) => {
                    const currentYear = new Date().getFullYear();
                    const year = value.split("-")[0];
                    const age = currentYear - year;
                    return age >= 18 || "* Your age must be at least 18.";
                  },
                }}
              />
              <p className="text-red-500 error">{errors.dateBirth?.message}</p>
            </div>

            {/* input dropdrown menu country */}
            <div className="flex flex-col gap-2 mt-10 md:w-11/12">
              <label htmlFor="country">Country</label>
              <select
                className={`w-full h-[48px] bg-white border-[1px]
                            placeholder-slate-400 rounded p-[12px] focus:outline-none
                            focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                            disabled:shadow-none text-blue-800 border-gray-400
                            ${
                              errors.userName &&
                              "border-red-500 ring-red-500 ring-1"
                            }`}
                {...register("country", {
                  required: {
                    value: true,
                    message: "* Country is required.",
                  },
                })}
              >
                <option value="">Select your country</option>
                {countries.map((item) => {
                  return <option key={item.country}>{item.country}</option>;
                })}
              </select>
              <p className="text-red-500 error">{errors.country?.message}</p>
            </div>
          </div>

          {/* input upload profile */}
          <div className="bg-gray-400 h-[1px] w-full mt-10 mb-10"></div>

          <div className="flex flex-col justify-center ">
            <h1 className="mb-10">Profile Picture</h1>
            <Avatar
              url={avatar_url}
              size={150}
              onUpload={(url) => {
                setAvatar(url);
              }}
              setAvatar={setAvatar}
            />
          </div>

          <div className="bg-gray-400 h-[1px] w-full mt-16 mb-10"></div>

          <div>
            <h1>Credit Card</h1>
          </div>

          <div className="grid md:grid-cols-[52%_52%]">
            <div className="flex flex-col w-full gap-2 mt-10 md:w-11/12">
              <label className="" htmlFor="cardNumber">
                Card Number
              </label>
              <input
                className={`w-full h-[48px] bg-white border-[1px]
                            placeholder-slate-400 rounded p-[12px] focus:outline-none
                            focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                            disabled:shadow-none text-blue-800 border-gray-400
                            ${
                              errors.cardNumber &&
                              "border-red-500 ring-red-500 ring-1"
                            }`}
                type="text"
                id="cardNumber"
                placeholder="Enter your card number"
                {...register("cardNumber", {
                  required: {
                    value: true,
                    message: "* Card Number is required.",
                  },
                  pattern: {
                    value: /[0-9]{16}/,
                    message: "* Invalid Card Number.",
                  },
                })}
              />
              <p className="text-red-500 border-red-500 error">
                {errors.cardNumber?.message}
              </p>
            </div>

            <div className="flex flex-col w-full gap-2 mt-10 md:w-11/12">
              <label htmlFor="cardOwner">Card Owner</label>
              <input
                className={`w-full h-[48px] bg-white border-[1px]
                            placeholder-slate-400 rounded p-[12px] focus:outline-none
                            focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                            disabled:shadow-none text-blue-800 border-gray-400
                            ${
                              errors.cardOwner &&
                              "border-red-500 ring-red-500 ring-1"
                            }`}
                type="text"
                id="cardOwner"
                placeholder="Enter your card name"
                {...register("cardOwner", {
                  required: {
                    value: true,
                    message: "* Card Name is required.",
                  },
                  pattern: {
                    value: /^[a-zA-Z].*\s[a-zA-Z]+$/,
                    message: "* Invalid Card Owner",
                  },
                })}
              />
              <p className="text-red-500 border-red-500 error">
                {errors.cardOwner?.message}
              </p>
            </div>

            <div className="flex flex-col w-full gap-2 mt-10 md:w-11/12">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                className={`w-full h-[48px] bg-white border-[1px]
                            placeholder-slate-400 rounded p-[12px] focus:outline-none
                            focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                            disabled:shadow-none text-blue-800 border-gray-400
                            ${
                              errors.expiryDate &&
                              "border-red-500 ring-red-500 ring-1"
                            }`}
                type="text"
                id="expiryDate"
                placeholder="MM/YY"
                {...register("expiryDate", {
                  required: {
                    value: true,
                    message: "* Expiry Date is required.",
                  },
                  pattern: {
                    value: /^\d{2}\/\d{2}$/,
                    message: "* Invalid Expiry Date (use MM/YY format)",
                  },
                })}
              />
              <p className="text-red-500 border-red-500 error">
                {errors.expiryDate?.message}
              </p>
            </div>

            <div className="flex flex-col w-full gap-2 mt-10 md:w-11/12">
              <label htmlFor="cvc-cvv">CVC/CVV</label>
              <input
                className={`w-full h-[48px] bg-white border-[1px]
                            placeholder-slate-400 rounded p-[12px] focus:outline-none
                            focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                            disabled:shadow-none text-blue-800 border-gray-400
                            ${
                              errors.cardOwner &&
                              "border-red-500 ring-red-500 ring-1"
                            }`}
                type="text"
                id="cvc-cvv"
                placeholder="CVC/CVV"
                {...register("cvcCvv", {
                  required: {
                    value: true,
                    message: "* CVC/CVV is required.",
                  },
                })}
              />
              <p className="text-red-500 border-red-500 error">
                {errors.cvcCvv?.message}
              </p>
            </div>

            <div className="mt-[50px] w-full md:w-11/12">
              <button className="inline-block w-full py-4 bg-orange-600">
                <h1
                  className="text-white font-semibold font-sans
                                    leading-4 text-[16px]"
                >
                  {loading ? `Loading...` : `Register`}
                </h1>
              </button>
            </div>
          </div>
        </form>
        <div className="py-4">
          <span className="">Already have an account?</span>
          <Link href="/login">
            <h1 className="inline-block mx-4 text-orange-600">Login</h1>
          </Link>
        </div>

        {/* <Roomtypes /> */}
        {/* ใส่ Component2 <CreditcardForm /> ที่นี่ (Nu) */}
      </div>
    </div>
  );
}
