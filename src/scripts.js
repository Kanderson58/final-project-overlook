// Imports
import './css/styles.css';
import './css/micromodal.css';
import './images/lobby.jpg';
import { fetchData, postBooking, getSingleUser } from './apiCalls';
import MicroModal from 'micromodal';
import User from './classes/User.js';
import Room from './classes/Room.js';
import Bookings from './classes/Bookings.js';
import Manager from './classes/Manager';

// Query selectors
const findRoomSection = document.getElementById('findRoom');
const bookingsSection = document.getElementById('bookings');
const bookingsContent = document.getElementById('bookingsContent');
const expensesSection = document.getElementById('expenses');
const homeButton = document.getElementById('home')
const myBookingsButton = document.getElementById('myBookings');
const myExpensesButton = document.getElementById('myExpenses');
const getRoom = document.getElementById('getRoom');
const chosenDate = document.getElementById('chooseDate');
const availableRooms = document.getElementById('availableRooms');
const dateTitle = document.getElementById('dateTitle');
const chooseType = document.getElementById('chooseType');
const modalFooter = document.getElementById('modalFooter');
const modalFooter2 = document.getElementById('modalFooter2');
const loginButton = document.getElementById('loginButton');
const password = document.getElementById('password');
const seeAllButton = document.getElementById('seeAllBookings');
const nav = document.getElementById('nav');
const revenue = document.getElementById('revenue');

// Manager dashboard query selectors
const managerDashboard = document.getElementById('managerDashboard');
const managerAvailable = document.getElementById('managerAvailable')
const numAvailable = document.getElementById('numAvailable');

// Global variables
let currentUser, allBookings, allRooms, currentRooms, manager;

// Event listeners
window.addEventListener('load', fetchData().then(data => {
  chosenDate.setAttribute('value', new Date().toISOString().split('T')[0]);
  allRooms = new Room(data[1].rooms);
  allBookings = new Bookings(data[2].bookings);
  showLogin();
  manager = new Manager(allBookings, allRooms, data[0].customers);
}));

homeButton.addEventListener('click', () => { 
  show(findRoomSection);
  hide(bookingsSection);
  hide(expensesSection);
});

myBookingsButton.addEventListener('click', () => { displayBookings() });

myExpensesButton.addEventListener('click', () => { displayExpenses() });

getRoom.addEventListener('click', (event) => {
  event.preventDefault();
  currentRooms = allRooms.filterByBookedStatus(allBookings.findTaken(chosenDate.value));
  showModal();
});

chooseType.addEventListener('click', () => {
  offerChoices();
});

loginButton.addEventListener('click', () => {
  verifyLogin();
});

seeAllButton.addEventListener('click', () => {
  displayBookings();
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

const showLogin = () => {
  MicroModal.show('modal-2')
}

const verifyLogin = () => {
  if(password.value === 'overlook2021' && username.value.substr(0, 8) === 'customer' && username.value.length < 11){
    hide(modalFooter2);
    getSingleUser(username.value.substr(8, 10)).then(data => currentUser = new User(data));
    loginButton.disabled = 'true';
    loginButton.innerHTML = '<span class="material-symbols-outlined checkmark">check</span>'
    setTimeout(MicroModal.close, 1200);
  } else if(username.value === 'manager' && password.value === 'overlook2021'){
    loginButton.disabled = 'true';
    loginButton.innerHTML = '<span class="material-symbols-outlined checkmark">check</span><p>Hello Manager!</p>'
    setTimeout(MicroModal.close, 1200);
    displayManagerDashboard();
  } else if(password.value !== 'overlook2021' && username.value.substr(0, 8) === 'customer' && username.value.length < 11 || username.value === 'manager'){
    giveFeedback('password');
  } else if(password.value === 'overlook2021' && username.value.substr(0, 8) !== 'customer' ||  username.value.length >= 11){
    giveFeedback('username');
  } else {
    giveFeedback('username and password')
  }
}

const giveFeedback = (reason) => {
  modalFooter2.innerHTML = '';
  show(modalFooter2);
  modalFooter2.innerHTML += `<p class="wrong">Incorrect ${reason}!</p>`;
}

const showModal = () => {
  MicroModal.show('modal-1');
  show(chooseType);
  hide(modalFooter);
  clear(availableRooms);
  dateTitle.innerText = chosenDate.value;
  populateAvailable();
}

const populateAvailable = () => {
  clear(availableRooms);
  
  if(currentRooms.length === 0) {
    availableRooms.innerHTML +=
      `<li class="none-available">We're sorry!  There are no rooms of that type available on ${chosenDate.value}.  Please try selecting another type or date!</li>`
  }

  currentRooms.forEach(room => {
    availableRooms.innerHTML += 
      `<li>Room ${room.number}</li>
      <li>This ${room.roomType} has ${room.numBeds} bed(s) (${room.bedSize}-sized) and costs $${room.costPerNight.toFixed(2)}.</li>`;

    room.bidet ? availableRooms.innerHTML += 'Plus, this room has a bidet!' : null;

    availableRooms.innerHTML += `<button id="${room.number}" class="modal__btn book-now">Book Now!</button>`;
  });

  currentRooms.forEach(room => document.getElementById(`${room.number}`).addEventListener('click', (event) => { bookRoom(event.target.id)}));
}

const displayBookings = () => {
  hide(findRoomSection);
  hide(expensesSection);
  show(bookingsSection);
  currentRooms = allRooms.filterByBookedStatus(allBookings.findTaken(chosenDate.value));
  populateBookings();
}

const populateBookings = () => {
  bookingsContent.innerHTML = '<h3>Your Bookings:</h3>';

  currentUser.filterBookingByUser(allBookings.bookings);

  currentUser.bookedRooms.forEach(booking => {
    if(parseInt(new Date().toISOString().split('T')[0].replaceAll('-', '')) > parseInt(booking.date.replaceAll('/', ''))){
      bookingsContent.innerHTML += `<p class="single-booking" tabindex="0">Your previous booking was in <span class="emphasize">Room ${booking.roomNumber}</span> on <span class="emphasize">${booking.date}.</span></p>`;
    } else {
      // find a way to sort so the upcoming bookings are the soonest ones
      bookingsContent.innerHTML += `<p class="single-booking" tabindex="0">Your upcoming booking is in <span class="emphasize">Room ${booking.roomNumber}</span> on <span class="emphasize">${booking.date}!</span> Enjoy your stay!</p>`;
    }
  });
}

const displayExpenses = () => {
  hide(findRoomSection);
  hide(bookingsSection);
  show(expensesSection);

  currentUser.filterBookingByUser(allBookings.bookings);

  clear(expensesSection);
  expensesSection.innerHTML += `<p class="expenses-section" tabindex="0">Your total spent on hotel rooms with Overlook Booking is <span class="emphasize">$${currentUser.getTotalCost(allRooms.rooms)}.</span></p>`;
}

const offerChoices = () => {
  hide(chooseType);
  hide(seeAllButton);
  clear(modalFooter);
  show(modalFooter);

  allRooms.getAllRoomTypes().forEach((roomType) => {
  modalFooter.innerHTML += 
    `<input type="radio" id="${roomType}" class="room-type" value="${roomType}" name="roomType" tabindex="0"><label for="${roomType}">${roomType}</label>`;
  });

  modalFooter.innerHTML += '<button id="showAll" class="modal__btn">Show All</button>'

  document.getElementById('showAll').addEventListener('click', () => {
    showAll()
  });

  allRooms.getAllRoomTypes().forEach(roomType => {
    document.getElementById(`${roomType}`).addEventListener('click', () => {

      currentRooms = allRooms.filterByRoomType(`${roomType}`);
      populateAvailable();
    });
  });
}

const showAll = () => {
  show(chooseType);
  show(seeAllButton);
  hide(modalFooter);
  currentRooms = allRooms.filterByBookedStatus(allBookings.findTaken(chosenDate.value));
  populateAvailable();
}

const bookRoom = (num) => {
  postBooking(currentUser.id, chosenDate.value.replaceAll('-', '/'), parseInt(num));
  
  fetchData().then(data => {
    allBookings = new Bookings(data[2].bookings)
    currentRooms = allRooms.filterByBookedStatus(allBookings.findTaken(chosenDate.value));
    setTimeout(populateAvailable, 2000);
  });
  
  const roomButton = document.getElementById(`${num}`)
  roomButton.innerText = 'Booked!';
  roomButton.disabled = 'true';

  populateBookings();
}

const displayManagerDashboard = () => {
  // could make the hide/show functions accept an array of items and iterate through those to perform each action, so that I can pass in all this shit at once

  hide(nav);
  hide(findRoomSection);
  show(managerDashboard);

  numAvailable.innerText = manager.getRoomsAvailableToday().length
  manager.getRoomsAvailableToday().forEach(room => {
    managerAvailable.innerHTML += `<li>Room ${room.number} (${room.roomType} with ${room.numBeds} ${room.bedSize} bed(s))</li>`
  })

  revenue.innerText = `Today's revenue so far is $${manager.calculateRevenue()}.`
}