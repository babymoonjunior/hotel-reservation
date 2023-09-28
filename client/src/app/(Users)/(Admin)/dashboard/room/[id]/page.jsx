"use client";

import "@/app/globals.css";
import { useState, useEffect} from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";

export const metadata = {
    title: "Dashboard",
    description: "หน้าแรกของAdmin",
};

export default function AdminDashboard({ params, folder }) {
    const supabase = createClientComponentClient();
    const [ user, setUser ] = useState(null);
    const [ uploading, setUploading ] = useState(false);
    const [ link, setLink ] = useState("");
    const [values, setValues] = useState({
        roomType: "",
        roomSize: "",
        bedType: "",
        guest: "",
        pricePerNight: "",
        promotionPrice: "",
        roomDescription: "",
        mainImage: "",
        roomImage: [],
        amenities: [],
    });

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                // setLoading(true)
                const { data, error } = await supabase.auth.getSession();              
                if(error){
                    alert(error.message)
                }
                if(data.session === null){
                    window.location.href = '/login'
                }else{
                    setUser(data.session.user)
                    setLoading(false)
                }
            }
            catch(error){
                console.error('Error fetching login status: ', error)
            }
        }
        checkLoginStatus();
    }, [])

    useEffect(() => {
        const fetchSmoothie = async () => {
            const { data, error } = await supabase
                .from('room_types')
                .select(`roomtypetitle, description, bedtype, guests, fullprice,
                discountprice, description, main_image, room_image, amenities`)
                .eq('room_type_id', params.id)
                .single()

            if(error){
                throw error
            }
            if(data){
                setValues({
                    roomType: String(data.roomtypetitle),
                    roomSize: String(data.description.match(/\d+/)[0]),
                    bedType: String(data.bedtype),
                    guest: String(data.guests),
                    pricePerNight: String(data.fullprice),
                    promotionPrice: String(data.discountprice),
                    roomDescription: String(data.description),
                    mainImage: data.main_image,
                    roomImage: data.room_image,
                    amenities: data.amenities,
                })                           
            }
        }
        
        fetchSmoothie()
      
    }, [user?.id])
    console.log(values)

    async function downloadImage(path){
        try{
            const { data, error } = await supabase.storage
                .from('mainimage')
                .createSignedUrl(path, 31536000);
            if(error){
                throw error;
            }
            const url = data.signedUrl;
            setValues.mainImage = url
        }
        catch(error){
            console.log(`Error downloading image: `, error.message);
        }
    }

    async function uploadAvatar(event) {
        try{
            setUploading(true);
            if(!event.target.files || event.target.files.length === 0){
                throw new Error(`You must select an image to upload`)
            }
            const file = event.target.files[0];
            const fileExt = file.name.split(".").pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            let { error: uploadError } = await supabase.storage
                .from('mainimage')
                .upload(filePath, file);
            if(uploadError) {
                throw uploadError;
            }
            await downloadImage(filePath);
            setLink(filePath);
        }
        catch(error){
            alert(error.message);
        }
        finally {
            setUploading(false);
        }
    }

    const handleDeleted = async () => {
        try{
            const { data, error } = await supabase.storage
                .from(folder)
                .remove([link]);

            setValues.mainImage = null
            console.log("ลบจาก Main Image");
            
            if(error) {
                throw new Error(`Cannot Delete Profile Image: ${error.message}`);
            }
        }
        catch(error){
            console.log(`Error deleting profile image: `, error.message);
        }
    }

    return (
        <section 
        className={`min-h-screen bg-gray-300 bg-opacity-80`}>
            <form >
                <article className={`w-full bg-utility-bg`}>
                    <nav className={`flex items-center justify-between px-16 py-6`}>
                        <span><FontAwesomeIcon 
                        icon={faArrowLeft}
                        className={`pr-4`}
                        /></span>
                        <h2 className={`flex-1 text-xl font-semibold text-gray-900`}>
                            Create New Room
                        </h2>
                        <div className={`flex item-center justify-end flex-1 gap-4`}>
                            <button
                            type="submit"
                            >
                                <h1
                                className={``}
                                >Update</h1>
                            </button>
                        </div>
                    </nav>
                </article>
                {/* End Navbar */}
                {/* Start Input Field*/}
                <article className={`max-w-6xl px-[60px] mx-auto my-10 bg-white
                `}>
                    {/* Start Basic Information */}
                    <div className={`flex flex-col gap-10 pb-10 border-b
                    border-gray-300`}>
                        <h1 className={`text-xl font-semibold leading-normal
                        text-gray-600 -tracking-wider mt-10`}
                        >
                            Basic Information
                        </h1>
                        <div className={`flex flex-col gap-1 mt-8
                        w-full `}>
                            <label 
                            htmlFor="roomType"
                            className={`text-gray-900`}>
                                RoomType*
                            </label>
                            <input
                            type="text"       
                            id="roomType"   
                            value={values.roomType}   
                            onChange={(e) => e.target.value}               
                            className={`p-3 border border-gray-400 rounded-sm 
                            outline-none w-full`}
                            />
                        </div>

                        <div className={`grid md:grid-cols-[52%_52%]`}>
                            <div className={`flex flex-col flex-1 w-full 
                            md:w-11/12`}>
                                <label 
                                htmlFor="roomSize"
                                className={`text-gray-900`} 
                                >
                                    Room size(sqm)*
                                </label>
                                <input
                                type="text"
                                id="roomSize"
                                value={values.roomSize}
                                onChange={(e) => setValues(e.target.value)}
                                className={`p-3 border border-gray-400 rounded-sm 
                                outline-none w-full `} 
                                />
                            </div>
                            <div className={`flex flex-col flex-1 w-full 
                            md:w-11/12 `}>
                                <label
                                htmlFor="bedType"
                                className={`text-gray-900`}
                                >
                                    Bed Type*
                                </label>
                                <select
                                className={`p-3 border border-gray-400 rounded-sm
                                outline-none w-full`}              
                                >
                                    <option>{values.bedType}</option>
                                    <option>Single Bed</option>
                                    <option>Double Bed</option>
                                    <option>King Size</option>              
                                    <option>Twin Bed</option>                  
                                </select>                                                   
                            </div>

                            <div className={`flex flex-col flex-1 w-full
                            md:w-11/12 mt-10`}>
                            <label 
                            htmlFor="guests"
                            className={`text-gray-900`}
                            >
                                Guest(s)*
                            </label>
                            <select
                                className={`p-3 border border-gray-400 rounded-sm
                                outline-none w-full`}              
                                >
                                    <option>{values.guest}</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>              
                                    <option>4</option>         
                                    <option>5</option>
                                    <option>6</option>                                                                                             
                                </select> 
                            </div>
                        </div>
                   
                        <div className={`grid md:grid-cols-[52%_48%]`}>
                            <div className={`flex flex-col flex-1 
                            w-full md:w-11/12`}>
                                <label 
                                htmlFor="price"
                                className={`text-gray-900`}>
                                    Price per Night(THB)*
                                </label>
                                <input
                                type="text"
                                id="price"
                                value={values.pricePerNight}
                                className={`p-3 border border-gray-400 rounded-sm
                                outline-none w-full`}
                                />
                            </div>   
                            <div className={`flex md:flex-row flex-col items-center flex-1 gap-4 pt-6`}>
                                <input
                                type="checkbox"
                                id="promotion"
                                className={`w-6 h-6 p-2 outline-none border 
                                border-gray-400 rounded-sm data-[state=checked]:text-white 
                                data-[state=checked]:border-orange-300  
                                data-[state=checked]:bg-orange-500
                                accent-orange-500`} 
                                />
                                <label 
                                htmlFor="promotionPrice"
                                className={``}
                                >
                                    Promotion
                                </label>
                                <input 
                                type="text"
                                id="promotionPrice"
                                disabled
                                className={`p-3 border border-gray-400 
                                rounded-sm outline-none md:w-11/12 w-full`}
                                />
                            </div> 
                        </div>
                        <div className={`flex flex-col justify-center gap-1`}>
                            <label 
                            htmlFor="description"
                            className={`text-gray-900`}
                            >
                                Room Description*
                            </label>
                            <textarea
                            rows={4}
                            type="text"
                            id="description"
                            value={values.roomDescription}
                            onChange={(e) => e.target.value}
                            className={`w-full p-3 text-lg border 
                            border-gray-400 outline-none resize-none
                            rounded-sm focus:border-orange-500`}                              
                            >
                            </textarea>
                        </div>
                    </div>
                    {/* End Basic Information */}
                    {/* Start Room Image */}
                    <div className={`flex flex-col gap-10 py-10 border-b
                    border-gray-300`}>
                        <h2 className={`text-xl font-semibold leading-normal
                        text-gray-600 -tracking-wider`}>
                            Room Image
                        </h2>
                        <div className={`flex flex-col justify-center gap-1`}>
                            <label                         
                            className={`text-gray-900 mb-2`}
                            >
                                Main Image*
                            </label>                                      
                            {values.mainImage ? (
                                <label 
                                htmlFor="mainImage"
                                className={`inline-block w-[240px] h-[240px]
                                `}                            
                                >
                                    <div className={`flex flex-col justify-center
                                    items-center w-[240px] h-[240px] bg-gray-400
                                    hover:bg-gray-300 cursor-pointer`}>
                                        <FontAwesomeIcon 
                                        icon={faPlus} 
                                        className={`inline-block text-orange-500`}
                                        />
                                        <h1 
                                        className={`inline-block text-orange-500`}
                                        >
                                            Upload Photo
                                        </h1>
                                    </div>
                                    <input 
                                type="file"
                                id="mainImage" 
                                onChange={(e) => setValues({mainImage: e.target.value})}                   
                                className={`hidden`}                  
                                />                                    
                                </label>                               
                            ) : (
                                <label 
                                htmlFor="mainImage"
                                className={`inline-block w-[240px] h-[240px]`}                                                       
                                >
                                <div className={`flex flex-col justify-center
                                items-center w-[240px] h-[240px] bg-gray-400
                                hover:bg-gray-300 cursor-pointer`}>
                                    <FontAwesomeIcon 
                                    icon={faPlus} 
                                    className={`inline-block text-orange-500`}
                                    />
                                    <h1 
                                    className={`inline-block text-orange-500`}
                                    >
                                        Upload Photo
                                    </h1>
                                </div>
                                <input 
                                type="file"
                                id="mainImage"                    
                                className={`hidden`}                  
                                />                                   
                            </label>
                            )}                                                                              
                        </div>
                
                        <div className={`flex flex-col justify-center gap-1`}>
                            <label
                            className={`text-gray-900 mb-2`}
                            >
                                Image Gallery(At least 4 pictures)*
                            </label>                                                 
                            <label
                            htmlFor="roomImages"
                            className={`inline-block w-[167px] h-[167px]`}
                            >
                                <div
                                className={`w-[167px] h-[167px] flex flex-col 
                                justify-center items-center bg-gray-400
                                cursor-pointer hover:bg-gray-300`}
                                >
                                    <FontAwesomeIcon
                                    icon={faPlus}
                                    className={`text-orange-500`}
                                    />
                                    <h1
                                    className={`text-orange-500`}
                                    >
                                    Upload Photo
                                    </h1> 
                                </div>                           
                            </label>
                            <input
                            type="file"
                            id="roomImages"
                            className={`hidden`}
                            />
                        </div>                     
                    </div>

                    <div className={`flex flex-col mt-10`}>
                        <label>
                            Room Amenities
                        </label>
                        <input />
                        <label>

                        </label>
                    </div>

                </article>
            </form>
        </section>
    )
}