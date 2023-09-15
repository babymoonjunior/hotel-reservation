"use client";
// Import statements go here
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Avatar from "./Avatar.jsx";
import countryData from "../components/countryData.json";
import { Button, buttonVariants } from "@/components/ui/button";
import "@/app/globals.css";

export default function ProfileUP({ session }) {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true);
  const [full_name, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [id_card, setIdNumber] = useState("");
  const [country, setCountry] = useState("");
  const [formError, setFormError] = useState(null);
  const [avatar_url, setAvatarUrl] = useState("");
  const [countries, setCountries] = useState([]);
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
  } = useForm();
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          alert(error.message);
        }
        if (data.session === null) {
          window.location.href = "/login";
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching login status:", error);
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    const data = countryData;
    setCountries(data);
  }, []);

  useEffect(() => {
    // Fetch user data and set it as default values
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("profiles")
          .select(`full_name, email, id_card, birthdate, country, avatar_url`)
          .eq("id", session?.user?.id)
          .single();

        if (!error && data) {
          reset({
            fullName: data.full_name,
            email: data.email,
            idNumber: data.id_card,
            dateBirth: data.birthdate,
            country: data.country,
          });

          setAvatarUrl(data.avatar_url);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchUserData();
    }
  }, [session?.user]);

  const onSubmit = async (data) => {
    const { fullName, email, idNumber, dateBirth, country } = data;

    if (
      !fullName ||
      !email ||
      !idNumber ||
      !dateBirth ||
      !country ||
      !avatar_url
    ) {
      setFormError("Please fill in all fields correctly");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          email,
          id_card: idNumber,
          birthdate: dateBirth,
          country,
        })
        .eq("id", session?.user?.id)
        .single();

      if (error) {
        console.log(error);
        setFormError("Please fill in all fields correctly");
      } else {
        console.log("Updated successfully");
        alert("Profile updated successfully!");
        setFormError(null);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating the profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className="relative max-w-[1092px] h-[1000px] mx-auto pl-[50px] pr-[50px] pt-[50px]
             bg-slate-50 pb-[50px] my-12 "
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
                {loading ? `Loading...` : `Update Profile`}
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
        <div className="w-full">
          <label htmlFor="fullName">Full Name</label>
          <Controller
            name="fullName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                className={`w-full h-[48px] bg-white border-[1px]
                  placeholder-slate-400 rounded p-[12px] focus:outline-none
                  focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                  disabled:shadow-none text-blue-800 border-gray-400
                  ${errors.fullName && "border-red-500 ring-red-500 ring-1"}`}
                id="fullName"
                type="text"
                placeholder="Full Name"
              />
            )}
          />
          <p className="text-red-500 error">{errors.fullName?.message}</p>
        </div>

        <div className="grid md:grid-cols-[52%_52%]">
          {/* Other input fields go here using similar structure */}
          <div className="flex flex-col w-full gap-2 mt-10 md:w-11/12">
            <label htmlFor="email">E-mail</label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
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
                  type="text"
                />
              )}
            />
            <p className="text-red-500 error">{errors.email?.message}</p>
          </div>

          {/* Input fields for ID Number, Date of Birth, and Country */}
          <div className="flex flex-col gap-2 mt-10 md:w-11/12">
            <label htmlFor="idNumber">ID Number</label>
            <Controller
              name="id_number"
              control={control}
              defaultValue=""
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
                  id="id_number"
                  value={id_card}
                  onChange={(e) => setIdNumber(e.target.value)}
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
              )}
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
              defaultValue=""
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
        {/* Separator */}
        <div className="bg-gray-400 h-[1px] w-full mt-10 mb-10"></div>
        <div className="flex flex-col justify-center ">
          <h1 className="mb-10">Profile Picture</h1>
          <Avatar
            preventDefault={avatar_url}
            url={avatar_url || "default_avatar_url"}
            size={150}
            value={avatar_url}
            onUpload={(url) => {
              setAvatarUrl(url);
            }}
          />
        </div>
        {formError && <p className="error">{formError}</p>}
      </div>
    </form>
  );
}
