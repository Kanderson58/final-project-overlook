class Room {
  constructor(rooms) {
    this.allRooms = rooms;
    this.availableRooms;
  }
  
  getAllRoomTypes() {
    return [...new Set(this.rooms.map(room => room.roomType))];
  }

  filterByBookedStatus(booked) {
    this.availableRooms = this.allRooms.filter(room => !booked.map(booked => booked.roomNumber).includes(room.number));
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