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
const expensesSection = document.getElementById('expenses');
const homeButton = document.getElementById('home')
const myBookingsButton = document.getElementById('myBookings');
const getRoom = document.getElementById('getRoom');

// Global Variables
let currentUser, allBookings;

// Event listeners
window.addEventListener('load', fetchData().then(data => {
  currentUser = new User(data[0].customers[0]);
  allBookings = new Bookings(data[2].bookings);
}))

homeButton.addEventListener('click', () => { show(findRoomSection) });

myBookingsButton.addEventListener('click', () => { displayBookings() });

getRoom.addEventListener('click', (event) => {
  event.preventDefault();
  showModal();
});

// Functions
const show = (element) => {
  element.classList.remove('hide');
}

const hide = (element) => {
  element.classList.add('hide');
}

const showModal = () => {
  MicroModal.show('modal-1');
}

const displayBookings = () => {
  hide(findRoomSection);
  bookings.innerHTML = ''
  allBookings.filterBookingByUser(currentUser).forEach(booking => {
    bookings.innerHTML += `<p>You have a booking in room ${booking.roomNumber} on ${booking.date}</p>`
  })
}