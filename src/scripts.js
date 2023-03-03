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
const chosenDate = document.getElementById('chooseDate');
const availableRooms = document.getElementById('availableRooms');
const dateTitle = document.getElementById('dateTitle');

// Global Variables
let currentUser, allBookings, allRooms, currentRooms;

// Event listeners
window.addEventListener('load', fetchData().then(data => {
  chosenDate.setAttribute('value', new Date().toISOString().split('T')[0]);
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
  currentRooms = allRooms.filterByBookedStatus(allBookings.findTaken(chosenDate.value));
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

const clear = (element) => {
  element.innerHTML = '';
}

const showModal = () => {
  MicroModal.show('modal-1');
  clear(availableRooms);
  dateTitle.innerText = chosenDate.value;
  currentRooms.forEach(room => {
    availableRooms.innerHTML += 
      `<li>Room ${room.number}</li>
      <li>This ${room.roomType} has ${room.numBeds} bed(s) (${room.bedSize}-sized) and costs $${room.costPerNight.toFixed(2)}.</li>`;
    room.bidet ? availableRooms.innerHTML += 'Plus, this room has a bidet!' : null;
    availableRooms.innerHTML += `<button id="bookNow" class="modal__btn book-now">Book Now!</button>`;
  });
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

  clear(expensesSection);
  expensesSection.innerHTML += `<p>Your total spend on hotel rooms with Overlook Booking is $${currentUser.getTotalCost(allRooms.rooms)}.</p>`;
}