class Room {
  constructor(rooms) {
    this.rooms = rooms;
    // is it ok to pass in the whole dataset?  should this be somewhere else?
    this.availableRooms;
    this.roomTypes;
  }
  
  getAllRoomTypes() {
    this.roomTypes = [...new Set(this.rooms.map(room => room.roomType))];
    // or I could just return this?  Do I need a this.roomTypes?
    return this.roomTypes;
  }

  filterByBookedStatus(booked) {
    this.availableRooms = this.rooms.filter(room => !booked.map(booked => booked.roomNumber).includes(room.number));
    return this.availableRooms;
  }

  filterByRoomType(roomType)  {
    return this.availableRooms.filter(room => room.roomType === roomType);
  }

  filterByBidet() {
    return this.availableRooms.filter(room => room.bidet);
  }

  filterByBedSize(size) {
    return this.availableRooms.filter(room => room.bedSize === size);
  }

  filterByNumBeds(num) {
    return this.availableRooms.filter(room => room.numBeds === num);
  }

  filterByCost(max) {
    return this.availableRooms.filter(room => room.costPerNight < max);
  }
}

export default Room;