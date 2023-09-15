import { Button } from "@/components/ui/button";

export default function ChangeDatePopUp() {
  let changeDate = false; // สมมติว่ามีการกดปุ่ม change date
  let cancel = true; // สมมติว่ามีการกดปุ่ม cancel
  let refund = false; // สมมติว่าขอคืนเงินได้

  let title = "";
  let questionText = "";
  let leftButtonText = "";
  let rightButtonText = "";

  if (changeDate) {
    title = "Change Date";
    questionText =
      "Are you sure you want to change your check-in and check-out date?";
    leftButtonText = "No, I don’t";
    rightButtonText = "Yes, I want to change";
  } else if (cancel) {
    if (refund) {
      title = "Cancel Booking";
      questionText =
        "Are you sure you want to cancel this booking and request a refund?";
      leftButtonText = "Yes, I want to cancel and request refund";
      rightButtonText = "No, Don’t Cancel";
    } else {
      title = "Cancel Booking";
      questionText =
        "Cancellation of the booking now will not be able to request a refund. Are you sure you would like to cancel this booking?";
      leftButtonText = "Yes, I want to cancel without refund";
      rightButtonText = "No, Don’t Cancel";
    }
  }

  return (
    <>
      <div className="popup bg-white max-w-[550px] w-full font-sans drop-shadow-xl">
        <div className="flex flex-row justify-between items-center border-b border-[#E4E6ED] px-4 py-2">
          <span className="modal-titile text-xl font-semibold leading-[150%] tracking-[-0.4px]">
            {title}
          </span>
          <span className="text-[#C8CCDB]">X</span>
        </div>
        <div className="p-4">
          <p className="modal-question text-[#646D89] text-base font-normal leading-[150%] tracking-[-0.32px] pb-4">
            {questionText}
          </p>
          <div className="flex flex-row justify-end">
            <Button variant="secondary" className="left-button w-fit mr-3">
            {leftButtonText}
            </Button>
            <Button className="right-button w-fit">{rightButtonText}</Button>
          </div>
        </div>
      </div>
    </>
  );
}
