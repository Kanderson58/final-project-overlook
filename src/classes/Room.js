class Room {
  constructor(rooms) {
    this.rooms = rooms;
    this.availableRooms;
    this.userRooms;
  }
  
  getAllRoomTypes() {
    return [...new Set(this.rooms.map(room => room.roomType))]
  }

  filterByBookedStatus(booked) {
    this.availableRooms = this.rooms.filter(room => !booked.map(booked => booked.roomNumber).includes(room.number));
    return this.availableRooms;
  }

  filterByRoomType(roomType)  {
    return this.availableRooms.filter(room => room.roomType === roomType);
  }

  filterByBidet() {

  }

  filterByBedSize() {

  }

  filterByNumBeds() {

  }

  filterByCost() {

  }
}

export default Room;