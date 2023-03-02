// Imports
import './css/styles.css';
import './css/micromodal.css';
import './images/lobby.jpg';
import { fetchData } from './apiCalls';
import MicroModal from 'micromodal';
import User from './classes/User.js';
import Room from './classes/Room.js';
import Bookings from './classes/Bookings.js';

// Query selectors
const findRoomSection = document.getElementById('findRoom');
const bookingsSection = document.getElementById('bookings');
const oldBookings = document.getElementById('old');
const newBookings = document.getElementById('new');
const expensesSection = document.getElementById('expenses');
const homeButton = document.getElementById('home')
const myBookingsButton = document.getElementById('myBookings');
const myExpensesButton = document.getElementById('myExpenses');
const getRoom = document.getElementById('getRoom');
const calendarDate = document.getElementById('chooseDate');

// Global Variables
let currentUser, allBookings, allRooms;

// Event listeners
window.addEventListener('load', fetchData().then(data => {
  calendarDate.setAttribute('value', new Date().toISOString().split('T')[0]);
  currentUser = new User(data[0].customers[3]);
  allRooms = new Room(data[1].rooms);
  allBookings = new Bookings(data[2].bookings);
}))

homeButton.addEventListener('click', () => { 
  show(findRoomSection);
  hide(bookingsSection);
  hide(expensesSection)
});

myBookingsButton.addEventListener('click', () => { displayBookings() });

myExpensesButton.addEventListener('click', () => { displayExpenses() });

getRoom.addEventListener('click', (event) => {
  event.preventDefault();
  showModal();
});

// Functions
const show = (element) => {
  element.classList.remove('hidden');
  element.setAttribute('aria-hidden', 'false');
}

const hide = (element) => {
  element.classList.add('hidden');
  element.setAttribute('aria-hidden', 'true');
}

const showModal = () => {
  MicroModal.show('modal-1');
}

const displayBookings = () => {
  hide(findRoomSection);
  hide(expensesSection);
  show(bookingsSection);

  oldBookings.innerHTML = '<h3>Your Past Bookings:</h3>';
  newBookings.innerHTML = '<h3>Your Upcoming Bookings:</h3>';

  currentUser.filterBookingByUser(allBookings.bookings);

  currentUser.filterOldBookings().forEach(booking => {
    oldBookings.innerHTML += `<p>You had a previous booking in room ${booking.roomNumber} on ${booking.date}</p>`;
  });

  currentUser.filterNewBookings().forEach(booking => {
    newBookings.innerHTML += `<p>You have an upcoming booking in Room ${booking.roomNumber} on ${booking.date}</p>`;
  });
}

const displayExpenses = () => {
  hide(findRoomSection);
  hide(bookingsSection);
  show(expensesSection);

  currentUser.filterBookingByUser(allBookings.bookings);

  expensesSection.innerHTML = '';
  expensesSection.innerHTML += `<p>Your total spend on hotel rooms with Overlook Booking is $${currentUser.getTotalCost(allRooms.rooms)}.</p>`;
}