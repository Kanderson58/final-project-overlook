class Room {
  constructor(rooms) {
    this.allRooms = rooms;
    this.availableRooms;
    this.userRooms;
  }

  filterByBookedStatus(booked) {
    this.availableRooms = this.allRooms.filter(room => !booked.map(booked => booked.roomNumber).includes(room.number));
    return this.availableRooms;
  }

  filterByRoomType()  {

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