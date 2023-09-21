"use client"

import { useState, useEffect} from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function paymentUpdatePage() {
    const supabase = createClientComponentClient()
    const [loading, setLoading] = useState(true)
    const [cardNumber, setCardNumber] = useState("")
    const [cardOwner, setCardOwner] = useState("")
    const [cardExpire, setCardExpire] = useState("")
    const [cardCVC, setCardCVC] = useState("")
    const [user, setUser] = useState(null)
    const [formErrors, setFormErrors] = useState(null);

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
            setCardNumber(data.card_number);
            setCardOwner(data.card_owner);
            setCardExpire(data.card_expire);
            setCardCVC(data.card_cvc);        
          }
        };
    
        fetchSmoothie();
    }, [user?.id]);
    
    const updateData = async (e) => {
        e.preventDefault()     
        
        const { data, error } = await supabase
          .from("profiles")
          .update({ 
            card_number: cardNumber, 
            card_owner: cardOwner, 
            card_expire: cardExpire, 
            card_cvc: cardCVC 
          })
          .eq("id", user?.id)
          .select();

        if (error || data === "undefiend") {
          console.log(error);
          setFormErrors({
            error: "Please enter a 16-digit card number",
            cardO: "Please enter name card owner",
            cardE: "Please enter card expire MM/YY",
            cardC: "Please enter a 3-digit CVC/CVV",
        });
        } 
        else {
          alert(`PaymentUpdated Successful!`);
        }   
    }

    return (
    <form 
        onSubmit={updateData}
        className="h-[1087px] w-screen relative bg-slate-50">
    
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
                <div className='flex flex-col w-full gap-2 mt-10 md:w-11/12'>
                    <label 
                        htmlFor="cardNumber"
                        className="text-gray-900 text-[16px] font-sans leading-[24px]
                         font-normal break-words" >
                            Card Number                      
                    </label>
                    <input className = {`w-full h-[48px] bg-white border-[1px]
                        text-[16px] font-sans leading-6 p-[12px] text-black
                        placeholder-slate-400 rounded focus:outline-none
                        focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                        disabled:shadow-none border-gray-400 break-words`} 
                        id="cardNumber"
                        type="text"
                        value={cardNumber || ''}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="Enter card number"
                        pattern= "[0-9]{16}"
                        required
                    />
                    <p className="text-red-500">{formErrors?.cardN}</p>
                </div> 

                <div className='flex flex-col w-full gap-2 mt-10 md:w-11/12'>
                    <label 
                        htmlFor="cardOwner"
                        className="text-gray-900 text-[16px] font-sans leading-[24px]
                         font-normal break-words" >
                            Card Owner
                    </label>
                    <input className = {`w-full h-[48px] bg-white border-[1px]
                        text-[16px] font-sans leading-6 p-[12px] text-black
                        placeholder-slate-400 rounded focus:outline-none
                        focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                        disabled:shadow-none border-gray-400 break-words
                        `} 
                        id="cardOwner"
                        type="text"
                        value={cardOwner || ''}
                        onChange={(e) => setCardOwner(e.target.value)}
                        placeholder="Enter card Owner"
                        pattern= "^[a-zA-Z]+$"
                        required
                    />
                    <p className="text-red-500">{formErrors?.cardO}</p>
                </div> 

                <div className="flex flex-col w-full gap-2 mt-10 md:w-11/12">
                    <label 
                        htmlFor="cardExpire"
                        className="text-gray-900 text-[16px] font-sans leading-[24px]
                         font-normal break-words" >
                            Expiry Date
                    </label>
                    <input className = {`w-full h-[48px] bg-white border-[1px]
                        text-[16px] font-sans leading-6 p-[12px] text-black
                        placeholder-slate-400 rounded focus:outline-none
                        focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                        disabled:shadow-none border-gray-400 break-words`} 
                        id="cardExpire"
                        type="text"
                        value={cardExpire || ''}
                        onChange={(e) => setCardExpire(e.target.value)}
                        placeholder="Enter card Expire"
                        pattern="^\d{2}\/\d{2}$"
                        required
                    />
                    <p className="text-red-500">{formErrors?.cardE}</p>
                </div>  

                <div className="flex flex-col w-full gap-2 mt-10 md:w-11/12">
                    <label 
                        htmlFor="cardCvc"
                        className="text-gray-900 text-[16px] font-sans leading-[24px]
                         font-normal break-words" >                       
                            CVC/CVV
                    </label>
                    <input className = {`w-full h-[48px] bg-white border-[1px]
                        text-[16px] font-sans leading-6 p-[12px] text-black
                        placeholder-slate-400 rounded focus:outline-none
                        focus:border-orange-400 focus:ring-1 focus:ring-orange-400
                        disabled:shadow-none border-gray-400 break-words`} 
                        id="cardCvc"
                        type="text"
                        value={cardCVC || ''}
                        onChange={(e) => setCardCVC(e.target.value)}
                        placeholder="Enter card CVC/CVV"
                        pattern="[0-9]{3}"
                        required
                    />
                    <p className="text-red-500">{formErrors?.cardC}</p>
                </div> 

            </div>
        </div>
    </form>
    )
}
