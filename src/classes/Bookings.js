class Bookings {
  constructor(bookingInfo) {
    this.bookings = bookingInfo;
    this.currentBookings = [];
  }

  findAvailable(chosenDate) {
    this.currentBookings = this.bookings.filter(booking => booking.date !== chosenDate.replaceAll('-', '/'));
    return this.currentBookings;
  }
}

export default Bookings;