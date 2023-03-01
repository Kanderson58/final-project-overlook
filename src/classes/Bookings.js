class Bookings {
  constructor(bookingInfo) {
    this.bookings = bookingInfo;
    this.userBookings;
  }

  filterBookingByUser(user) {
    this.userBookings = this.bookings
      .filter(booking => booking.userID === user.id)
      .sort((a, b) => b.date.replaceAll('/', '') - a.date.replaceAll('/', ''));
    return this.userBookings;
  }

  filterOldBookings() {
    return this.userBookings.filter(booking => {
      return (new Date().toISOString().split('T')[0].replaceAll('-', '') > booking.date.replaceAll('/', ''));
    });
  }

  filterNewBookings() {
    return this.userBookings.filter(booking => {
      return (new Date().toISOString().split('T')[0].replaceAll('-', '') < booking.date.replaceAll('/', ''));
    });
  }
}

export default Bookings;