const mockBookings = [
  {
    checkin_date: "2023-09-15",
    checkout_date: "2023-09-18",
    total_price: 600, // 2 guests in a king room (300 per person)
    profile_id: 1,
    room_id: 1,
    guests: 2,
  },
  {
    checkin_date: "2023-09-20",
    checkout_date: "2023-09-25",
    total_price: 750, // 3 guests in a queen room (250 per person)
    profile_id: 2,
    room_id: 2,
    guests: 3,
  },
  // Add more booking mock data here...
  {
    checkin_date: "2023-09-22",
    checkout_date: "2023-09-23",
    total_price: 300, // 1 guest in a king room (300 per person)
    profile_id: 3,
    room_id: 3,
    guests: 1,
  },
  {
    checkin_date: "2023-09-25",
    checkout_date: "2023-09-28",
    total_price: 400, // 2 guests in a jack room (200 per person)
    profile_id: 4,
    room_id: 4,
    guests: 2,
  },
  // Add more booking mock data here...
];

const mockProfiles = [
  {
    id: 1,
    full_name: "John Doe",
    email: "john@example.com",
    id_card: "1234567890123",
    birthdate: "1990-01-15",
    country: "USA",
    avatar_url: "avatar1.jpg",
  },
  {
    id: 2,
    full_name: "John Cena",
    email: "johncena@example.com",
    id_card: "1234567890456",
    birthdate: "1985-04-23",
    country: "USA",
    avatar_url: "avatar2.jpg",
  },
  // Add more profile mock data here...
];

const mockRooms = [
  {
    id: 1,
    room_type_id: 1, // King room
  },
  {
    id: 2,
    room_type_id: 2, // Queen room
  },
  {
    id: 3,
    room_type_id: 1, // King room
  },
  {
    id: 4,
    room_type_id: 3, // Jack room
  },
  // Add more room mock data here...
];

const mockRoomTypes = [
  {
    room_type_id: 1,
    roomtype_title: "King Suite",
    bedtype: "King Size",
    guests: 2, // Price per person: 300
  },
  {
    room_type_id: 2,
    roomtype_title: "Queen Suite",
    bedtype: "Queen Size",
    guests: 3, // Price per person: 250
  },
  {
    room_type_id: 3,
    roomtype_title: "Jack Suite",
    bedtype: "Jack Size",
    guests: 2, // Price per person: 200
  },
  // Add more room type mock data here...
];

export { mockBookings, mockProfiles, mockRooms, mockRoomTypes };
