"use client";
import React, { useEffect, useState } from "react";
import BasicInformation from "./BasicInformation";
import SpecialRequest from "./SpecialRequest";
import PaymentMethod from "./PaymentMethod";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useSearchContext } from "@/context/searchRoom";
import axios from "axios";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Spinner from "@/components/ui/Spinner";
import ThankYou from "./ThankYou";
import BookingDetail from "./BookingDetail";
import StepHeader from "./StepHeader";
import useBookingHook from "@/hook/useBookingHook";
import ModalError from "./ModalError";

export default function page({ params }) {
  const supabase = createClientComponentClient();
  const [step, setStep] = useState(1);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [specialRequest, setSpecialRequest] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("creditcard");
  const [roomDetail, setRoomDetail] = useState([]);
  const [roomPrice, setRoomPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [night, setNight] = useState(1);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [thankYou, setThankYou] = useState(true);
  const [supabaseData, setSupabaseData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let charge_id;
  const { checkedIn, checkedOut, rooms } = useSearchContext();
  const { convertPrice, formatNumberWithCommasAndTwoDecimals, convertDate } =
    useBookingHook(
      roomPrice,
      specialRequest,
      checkedIn,
      checkedOut,
      setTotalPrice,
      setNight,
      night,
      rooms
    );

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        setLoading(true);

        // Get the session data
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          setErrorMessage(error.message);
          setModalOpen(true);
          return;
        }

        // If the user is not authenticated, redirect to the login page
        if (!data.session) {
          window.location.href = "/login";
          return;
        }

        // Get the user data
        const userId = data.session.user.id;
        if (userId) {
          const { data: data2, error: error2 } = await supabase
            .from("profiles")
            .select()
            .eq("id", userId);

          if (error2) {
            setErrorMessage(error2.message);
            setModalOpen(true);
          } else {
            setSupabaseData(data2);
          }
        }

        setUserData(data.session.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching login status:", error);
        setErrorMessage(error.message);
        setModalOpen(true);
      }
    };

    checkLoginStatus();
  }, []);

  // initial default value
  const methods = useForm({
    defaultValues: {
      profile_id: userData.id,
      total_price: totalPrice,
      standardRequest: selectedRequests,
      specialRequest: specialRequest,
      checkin_date: checkedIn,
      checkout_date: checkedOut,
      rooms: rooms,
      room_type_id: params.id,
      payment_method: paymentMethod,
      promotion: null,
      additional: "",
    },
  });

  // fetch data
  const getData = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4000/rooms/roomdetail/${params.id}`
      );
      setRoomDetail(result.data.data);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      setModalOpen(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // เช็ค discount price
  useEffect(() => {
    const getPrice =
      roomDetail.discountprice !== ""
        ? roomDetail.discountprice
        : roomDetail.fullprice;
    setRoomPrice(parseFloat(getPrice));
  }, [roomDetail]);

  //  onChangeState
  const additional = useWatch({
    control: methods.control,
    name: "additional",
  });

  const onSubmit = async (data) => {
    data.profile_id = userData.id;
    data.standardRequest = selectedRequests;
    data.specialRequest = specialRequest;
    data.total_price = totalPrice;
    data.payment_method = paymentMethod;

    try {
      if (paymentMethod === "creditcard") {
        const payment = await axios.post(
          `http://localhost:4000/payment/create-charge/`,
          {
            name: supabaseData[0].full_name,
            city: supabaseData[0].country,
            postal_code: 50000,
            number: supabaseData[0].card_number,
            expiration_month: supabaseData[0].card_expire.split("/")[0],
            expiration_year: supabaseData[0].card_expire.split("/")[1],
            security_code: supabaseData[0].card_cvc,
            amount: data.total_price,
          }
        );
        charge_id = payment.data.chargeId;

        if (payment.status === 200) {
          await createBooking(data);
        } else {
          setErrorMessage(
            "We apologize for any inconvenience, your credit card encountered an error and cannot be used for payment. Please verify the card details or consider an alternative payment method."
          );
          setModalOpen(true);
        }
      } else {
        await createBooking(data);
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(
        `We apologize for any inconvenience, your credit card encountered an error and cannot be used for payment. Please verify the card details or consider an alternative payment method.`
      );
      setModalOpen(true);
    }
  };

  const createBooking = async (data) => {
    try {
      await axios.post(`http://localhost:4000/rooms/booking`, {
        profile_id: data.profile_id,
        total_price: data.total_price,
        checkin_date: data.checkin_date,
        checkout_date: data.checkout_date,
        payment_method: data.payment_method,
        room: data.rooms,
        special_request: data.specialRequest,
        standard_request: data.standardRequest,
        promotion: data.promotion,
        room_type_id: data.room_type_id,
        night: night,
        additional: data.additional,
        charge_id,
      });

      setErrorMessage(`Booking Successfully 🥰`);
      setModalOpen(true);
      setThankYou(!thankYou);
    } catch (error) {
      console.log(error.message);
      setErrorMessage(
        `We apologize for any inconvenience. An error has occurred during the booking process.`
      );
      setModalOpen(true);
    }
  };

  const formStep = () => {
    switch (step) {
      case 1:
        return (
          <BasicInformation
            setStep={setStep}
            step={step}
            supabaseData={supabaseData}
          />
        );
      case 2:
        return (
          <SpecialRequest
            setStep={setStep}
            step={step}
            selectedRequests={selectedRequests}
            setSelectedRequests={setSelectedRequests}
            specialRequest={specialRequest}
            setSpecialRequest={setSpecialRequest}
          />
        );
      case 3:
        return (
          <PaymentMethod
            setStep={setStep}
            step={step}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            supabaseData={supabaseData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className="min-h-screen p-32 bg-gray-200">
      {loading && <Spinner />}
      {!loading && (
        <main>
          {thankYou ? (
            <>
              {/* Step */}
              <StepHeader step={step} />
              {/* End Step */}
              {/* Form */}
              <FormProvider {...methods}>
                <article className="relative flex w-full gap-6 mx-auto my-10 max-w-7xl">
                  {/* Form Detail */}
                  <div className="w-full max-w-4xl bg-white rounded-sm ">
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                      {formStep()}
                    </form>
                  </div>
                  {/* End Form Detail */}
                  {/* Form Result */}
                  <BookingDetail
                    convertDate={convertDate}
                    roomDetail={roomDetail}
                    userData={userData}
                    rooms={rooms}
                    night={night}
                    specialRequest={specialRequest}
                    selectedRequests={selectedRequests}
                    roomPrice={roomPrice}
                    additional={additional}
                    totalPrice={totalPrice}
                    checkedIn={checkedIn}
                    checkedOut={checkedOut}
                    paymentMethod={paymentMethod}
                    convertPrice={convertPrice}
                    formatNumberWithCommasAndTwoDecimals={
                      formatNumberWithCommasAndTwoDecimals
                    }
                  />
                  {/* End Form Result */}
                </article>
              </FormProvider>
              {/* End Form */}
            </>
          ) : (
            <ThankYou
              convertDate={convertDate}
              roomDetail={roomDetail}
              userData={userData}
              rooms={rooms}
              night={night}
              specialRequest={specialRequest}
              selectedRequests={selectedRequests}
              roomPrice={roomPrice}
              additional={additional}
              totalPrice={totalPrice}
              checkedIn={checkedIn}
              checkedOut={checkedOut}
              paymentMethod={paymentMethod}
              convertPrice={convertPrice}
              formatNumberWithCommasAndTwoDecimals={
                formatNumberWithCommasAndTwoDecimals
              }
            />
          )}
        </main>
      )}
      <ModalError
        open={modalOpen}
        setOpen={setModalOpen}
        errorMessage={errorMessage}
      />
    </section>
  );
}
