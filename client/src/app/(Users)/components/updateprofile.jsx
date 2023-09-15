//localhost:3000/register
"use client";

import "@/app/globals.css";
import { useCallback, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import countryData from "../components/countryData.json";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Avatar from "./Avatar";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import useUserAddress from "@/lib/getUsers";
import { useUser } from "@/context/user";
import axios from "axios";
import Image from "next/image";

// Import statements go here

export default function ProfileUP({ session }) {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true);
  const [full_name, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [id_card, setIdNumber] = useState("");
  const [country, setCountry] = useState("");
  const [avatar_url, setAvatar] = useState("");
  const [countries, setCountries] = useState([]);
  const { formState, control, register } = useForm();
  const { errors } = formState;
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [userProfile, setUserprofile] = useState([]);

  const [showPicture, setShowPicture] = useState(true); // Initialize showPicture as true initially

  const handleDelete = async () => {
    // When the delete button is clicked, toggle the value of showPicture
    const url = avatar_url.split("?")[0];
    const pic = url.split("/");
    const result = pic[pic.length - 1];
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .remove([result]);
      setShowPicture(!showPicture);
      setAvatar(null);
    } catch (error) {}
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.auth.getSession();
        console.log("data:", data);
        if (error) {
          alert(error.message);
        }
        if (data.session === null) {
          window.location.href = "/login";
        } else {
          setUser(data.session.user);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching login status:", error);
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select(`full_name, email, id_card, birthdate, country,avatar_url`)
        .eq("id", user?.id)
        .single();
      if (error) {
        throw error;
      }
      if (data) {
        setFullname(data.full_name);
        setEmail(data.email);
        setIdNumber(data.id_card);
        setBirthdate(data.birthdate);
        setCountry(data.country);
        setAvatar(data.avatar_url);
      }
    };

    fetchSmoothie();
  }, [user?.id]);

  useEffect(() => {
    const data = countryData;
    setCountries(data);
  });

  // const handleSubmit = async (data, e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("fullName", data.fullName);
  //   formData.append("email", data.email);
  //   formData.append("id_card", data.id_card);
  //   formData.append("dateBirth", data.dateBirth);
  //   formData.append("country", data.country);

  //   try {
  //     setLoading(true);
  //     const { data, error } = await supabase
  //       .from("profiles")
  //       .update({
  //         full_name: formData.get("fullName"),
  //         email: formData.get("email"),
  //         id_card: formData.get("id_card"),
  //         birthdate: formData.get("dateBirth"),
  //         country: formData.get("country"),
  //         avatar_url: avatar_url,
  //       })
  //       .eq("id", user?.id)
  //       .select();
  //     if (error) {
  //       console.log(error);
  //       setFormError("Error updating profile.");
  //     } else if (data) {
  //       console.log(data);
  //       console.log(data[0].avatar_url);
  //       alert("Successfully updated profile.");
  //       setFormError(null);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert("An error occurred while updating the profile.");
  //   }
  // };

  const [formError, setFormError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !full_name ||
      !email ||
      !birthdate ||
      !id_card ||
      !country ||
      !avatar_url
    ) {
      setFormError("กรุณาใส่รูปโปรไฟล์");
      return;
    }
    const { data, error } = await supabase
      .from("profiles")
      .update({ full_name, email, id_card, birthdate, country, avatar_url })
      .eq("id", user?.id)
      .select();

    if (error || data === "undefiend") {
      console.log(error);
      setFormError("Please fill in all field correctly");
    }
    if (data) {
      console.log(data);
      console.log(data[0].avatar_url);
      alert("สำเร็จ");
      setFormError(null);
    }
  };

  //   const onSubmit = async (data, e) => {
  //     e.preventDefault();

  //     try {
  //       setLoading(true);
  //       const response = await axios.post(
  //         `http://localhost:4000/users/updateprofile/${user?.id}`,
  //         {
  //           full_name: data.fullName,
  //           email: data.email,
  //           id_card: data.idNumber,
  //           birthdate: data.dateBirth,
  //           country: data.country,
  //           avatar_url,
  //           updated_at: new Date().toISOString(), // Include updated_at with the current timestamp
  //         }
  //       );

  //       if (response.status === 200) {
  //         alert("Profile updated successfully!");
  //       } else {
  //         alert("Error updating the profile.");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       alert("An error occurred while updating the profile.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="relative max-w-[1092px] h-[1000px] mx-auto pl-[50px] pr-[50px] pt-[50px]
             bg-slate-50 pb-[50px] my-12  "
      >
        <div className="flex flex-col gap-12 ">
          <div className="flex justify-between">
            <h1 className="font-mono font-medium text-[68px] leading-[85px] text-green-800">
              Profile
            </h1>

            <div>
              <Button
                className={`${buttonVariants({
                  variant: "primary",
                })} w-[176px] h-[48px] mx-8  `}
              >
                {loading ? `Loading...` : `Update Profie`}
              </Button>
            </div>
          </div>
          <div>
            <h4 className="font-sans  font-semibold text-[20px] leading-[30px] text-gray-600  pb-10">
              Basic Information
            </h4>
          </div>
        </div>
        {/* form */}

        <div className="w-full ">
          <label className="" htmlFor="fullName">
            Full Name
          </label>
          <Controller
            name="full_name"
            control={control}
            render={({ field }) => (
              <input
                className={`w-full h-[48px] bg-white border-[1px]
                        placeholder-slate-400 rounded p-[12px] focus:outline-none
                        focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                        disabled:shadow-none text-blue-800 border-gray-400
                        ${
                          errors.userName &&
                          "border-red-500 ring-red-500 ring-1"
                        }`}
                id="fullName"
                type="text"
                value={full_name}
                onChange={(e) => setFullname(e.target.value)}
                // {...register}
              />
            )}
            {...register("fullName", {
              required: {
                value: true,
                message: "* FullName is required.",
              },
              pattern: {
                value: /^[ก-๏\s].*\s[ก-๏\s]|[a-zA-Z].*\s[a-zA-z]+$/,
                message: "* Invalid Fullname.",
              },
            })}
          />
          <p className="text-red-500 error">
            {" "}
            {formError && <p className="error">{formError}</p>}
          </p>
        </div>

        <div className="grid md:grid-cols-[52%_52%] ">
          <div className="flex flex-col w-full gap-2 mt-10 md:w-11/12">
            <label htmlFor="email">E-mail</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className={`w-full h-[48px] bg-white border-[1px]
                            placeholder-slate-400 rounded p-[12px] focus:outline-none
                            focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                            disabled:shadow-none text-blue-800 border-gray-400
                            ${
                              errors.userName &&
                              "border-red-500 ring-red-500 ring-1"
                            }`}
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}
              {...register("email", {
                required: {
                  value: true,
                  message: "* Email is required.",
                },
                pattern: {
                  value: /^[a-zA-Z0-9?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[com]+)*$/,
                  message: "* Invalid email format.",
                },
                validate: {
                  notAdmin: (fieldValue) => {
                    return (
                      fieldValue !== "admin@example.com" ||
                      "* Enter a different email address."
                    );
                  },
                },
              })}
            />
            <p className="text-red-500 error">{errors.email?.message}</p>
          </div>

          <div className="flex flex-col gap-2 mt-10 md:w-11/12">
            <label htmlFor="id_card">ID Number</label>
            <Controller
              name="id_card"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className={`w-full h-[48px] bg-white border-[1px]
                            placeholder-slate-400 rounded p-[12px] focus:outline-none
                            focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                            disabled:shadow-none text-blue-800 border-gray-400
                            ${
                              errors.userName &&
                              "border-red-500 ring-red-500 ring-1"
                            }`}
                  id="id_card"
                  value={id_card}
                  onChange={(e) => setIdNumber(e.target.value)}
                />
              )}
              {...register("id_card", {
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
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
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
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
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
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Select your country</option>
                  {countries.map((item) => {
                    return <option key={item.country}>{item.country}</option>;
                  })}
                </select>
              )}
            />
            <p className="text-red-500 error">{errors.country?.message}</p>
          </div>
        </div>

        <div className="bg-gray-400 h-[1px] w-full mt-10 mb-10"></div>

        <div className="flex flex-col justify-center ">
          <h1 className="mb-10">Profile Picture</h1>
          <div>
            {showPicture ? (
              <div className="relative w-fit">
                <Image
                  className="object-cover cursor-pointer w-44 h-44"
                  alt="avatar"
                  src={avatar_url}
                  width={150}
                  height={150}
                />
                <button
                  type="button"
                  onClick={handleDelete}
                  className="absolute px-3 py-1 font-bold text-white bg-orange-500 rounded-full -right-4 -top-4"
                >
                  X
                </button>
              </div>
            ) : (
              <div className="bg-gray-200 hover:bg-gray-400 w-[180px] h-[180px] flex flex-col justify-center items-center cursor-pointer">
                <Avatar
                  url={avatar_url}
                  size={150}
                  onUpload={(url) => {
                    setAvatar(url);
                  }}
                  setAvatar={setAvatar}
                />
              </div>
            )}
          </div>
        </div>

        {formError && <p className="error">{formError}</p>}
      </div>
    </form>
  );
}
