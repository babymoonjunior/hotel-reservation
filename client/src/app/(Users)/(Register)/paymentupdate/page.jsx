"use client"

import { useState, useEffect} from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function paymentUpdatePage() {
    const supabase = createClientComponentClient()
    const [ loading, setLoading ] = useState(true)
    const [ user, setUser ] = useState(null)
    const [ values, setValues ] = useState({
      cardNumber: "",
      cardOwner: "",
      cardExpire: "",
      cardCvc: "",
    })

    const inputs = [
      {
        id: 1,
        name: "cardNumber",
        type: "text",
        placeholder: "Enter card Number",
        errormessage: "Please enter a 16-digit card number",
        label: "Card Number",
        pattern: "[0-9]{16}",
        required: true,
        maxlength: "16"
      },
      {
        id: 2,
        name: "cardOwner",
        type: "text",
        placeholder: "Please enter card owner",
        errormessage: "Please enter card owner",  
        label: "Card Owner",
        pattern: "^[a-zA-z]+$",
        required: true,
        maxlength: "25"
      },
      {
        id: 3,
        name: "cardExpire",
        type: "text",
        placeholder: "Enter card expire",
        errormessage: "Please enter card expire MM/YY", 
        label: "Expire Date",
        pattern: "[0-9]{2}/[0-9]{2}",
        required: true,
        maxlength: "5"
      },
      {
        id: 4,
        name: "cardCvc",
        type: "text",
        placeholder: "Enter CVC/CVV",
        errormessage: "Please enter a 3-digit CVC/CVV", 
        label: "CVC/CVV",
        pattern: "[0-9]{3}",
        required: true,
        maxlength: "3"
      }
    ]

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
            .select('card_number, card_owner, card_expire, card_cvc')
            .eq("id", user?.id)
            .single();
          if (error) {
            throw error;
          }
          if (data) {
            setValues({
              cardNumber: String(data.card_number),
              cardOwner: String(data.card_owner),
              cardExpire: String(data.card_expire),
              cardCvc: String(data.card_cvc),
            }) 
          }
        }

        fetchSmoothie()
    }, [user?.id]);

    const onChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
    }

    const [ focused, setFocused ] = useState(false)
    const handleFocus = () => {
      setFocused(true)
    }
    
    const updateData = async (e) => {
      e.preventDefault();
      try{
        const { data, error } = await supabase
        .from("profiles")
        .update({ 
          card_number: values.cardNumber, 
          card_owner: values.cardOwner, 
          card_expire: values.cardExpire, 
          card_cvc: values.cardCvc
        })
        .eq("id", user?.id)
        .select();
    
        if(error) {
          alert(`Payment Updated Failed!`);
          setLoading(false);
        } 
        else {
          alert(`Payment Updated Successfully`);
          setLoading(false);
        }
      } 
      catch (error) {
        console.log(error);
      }
    }
    
    return (
    <form 
        onSubmit={updateData}
        className="h-[1087px] w-screen relative bg-slate-50"
    >
      <div className="max-w-[930px] mx-auto pl-[1px] pr-[2px]
        bg-slate-50 my-12 mt-20">

        <div className='flex flex-col md:flex-row items-center mx-auto
          justify-between text-center md:text-left'>
          <h1 className="font-serif font-medium text-[68px] leading-[85px]
            text-green-800 break-words w-[70%]">
                Payment Method
            </h1>
            <button 
              type="submit"
              className='bg-orange-600 px-[34px] h-[48px] rounded-[4px]'
            >               
              <h1 className='text-white text-[16px] font-openSans font-semibold
                leading-[16px] break-words'>
                {loading ? 'Loading ...' : 'Update payment method'}
              </h1> 
            </button>           
      </div>

      <div className='md:text-left text-center'>
        <h4 className='font-sans font-semibold text-[20px] leading-[30px]
          text-gray-600 mt-[100px]'>
            Credit Card
        </h4>
      </div>

      <div className="grid md:grid-cols-[52%_52%]">
        {inputs.map((input) => {
          return (
              <div 
                className='flex flex-col w-full gap-2 mt-10 md:w-11/12'
                key={input.id}
              >
                <label 
                  className="text-gray-900 text-[16px] font-sans leading-[24px]
                    font-normal break-words" >
                      {input.label}                      
                </label>
                <input 
                  className = {`w-full h-[48px] bg-white border-[1px]
                    text-[16px] font-sans leading-6 p-[12px] text-black
                  placeholder-slate-400 rounded focus:outline-none
                  focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                    disabled:shadow-none border-gray-400 break-words
                    ${
                      focused && !values[input.name].match(input.pattern) ? 
                      "border-red-500 ring-1 ring-red-500" : ""
                    } `}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                  onBlur={handleFocus}
                  focused={focused.toString()}
                />
                <span className={`${
                      focused && !values[input.name].match(input.pattern) ? 
                      "text-red-500 " : "hidden"} `}
                >
                  {input.errormessage}
                </span>
              </div> 
            )
        })}                 
      </div>
    </div>
  </form>
  )
}
