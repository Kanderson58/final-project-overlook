class Bookings {
  constructor(bookingInfo) {
    this.allBookings = bookingInfo;
    this.currentBookings = [];
  }

  findTaken(chosenDate) {
    this.currentBookings = this.allBookings.filter(booking => booking.date === chosenDate.replaceAll('-', '/'));
    return this.currentBookings;
  }
}

export default Bookings;