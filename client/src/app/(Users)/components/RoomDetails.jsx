export default function RoomDetails(props) {
    const {roomTypeTitle, guests, bedType, roomArea, description} = props
  return (
      <div className="room-details bg-[#F7F7FB] w-full max-w-[320px] text-base py-5">
            <h1 className="room-type-title col-span-3 text-[28px] font-semibold leading-[150%]">
              {roomTypeTitle}
            </h1>
            <div className="size-box flex text-[#646D89] my-2">
              <div className="amount-person border-r border-[#C8CCDB] flex items-center font-normal pr-4">
                {guests} Guests
              </div>
              <div className="type-bed border-r border-[#C8CCDB] flex items-center font-normal px-4">
                {bedType}
              </div>
              <div className="room-area flex items-center font-normal px-4">
                {roomArea} sqm
              </div>
            </div>
            <p className="rooms-description col-span-3 font-normal text-[#646D89] py-6">
              {description}
            </p>
          </div>
  );
}