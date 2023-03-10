// Imports
import './css/styles.css';
import './css/micromodal.css';
import './images/lobby.jpg';
import { fetchData, postBooking, getSingleUser, removeBooking } from './apiCalls';
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
const homeButton = document.getElementById('home');
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

// Manager dashboard query selectors
const managerDashboard = document.getElementById('managerDashboard');
const managerAvailable = document.getElementById('managerAvailable');
const numAvailable = document.getElementById('numAvailable');
const percentAvailable = document.getElementById('percentAvailable');
const searchUsers = document.getElementById('searchUsersByName');
const findUserButton = document.getElementById('findUser');
const userInfo = document.getElementById('userInfo');
const addBookingButton = document.getElementById('addBooking');
const bookingsForm = document.getElementById('bookingsForm');
const chosenDateManager = document.getElementById('chooseDateManager');
const getRoomManager = document.getElementById('getRoomManager');
const revenue = document.getElementById('revenue');
const allAvailableManager = document.getElementById('allAvailableManager');

// Global variables
let currentUser, allBookings, allRooms, currentRooms, manager;
let selectors = [];

// Event listeners
window.addEventListener('load', fetchData().then(data => {
  chosenDate.setAttribute('value', formatDate(new Date()));
  chosenDate.setAttribute('min', formatDate(new Date()));
  chosenDateManager.setAttribute('value', formatDate(new Date()));
  chosenDateManager.setAttribute('min', formatDate(new Date()));

  allRooms = new Room(data[1].rooms);
  allBookings = new Bookings(data[2].bookings);
  manager = new Manager(allBookings, allRooms, data[0].customers);
  showLogin();
}));

homeButton.addEventListener('click', () => { 
  show([findRoomSection]);
  hide([bookingsSection, expensesSection]);
});

myBookingsButton.addEventListener('click', () => { displayBookings() });

myExpensesButton.addEventListener('click', () => { displayExpenses() });

getRoom.addEventListener('click', (event) => {
  event.preventDefault();
  currentRooms = allRooms.filterByBookedStatus(allBookings.findTaken(chosenDate.value));
  showModal();
});

chooseType.addEventListener('click', () => { offerChoices() });

loginButton.addEventListener('click', () => { verifyLogin() });

seeAllButton.addEventListener('click', () => { displayBookings() });

findUserButton.addEventListener('click', (event) => {
  event.preventDefault();  
  fetchData().then(data => {
    allBookings = new Bookings(data[2].bookings);
    currentRooms = allRooms.filterByBookedStatus(allBookings.findTaken(chosenDate.value));
    displayUserSearch();
  });
});

addBookingButton.addEventListener('click', () => {
  fetchData().then(data => {
    allBookings = new Bookings(data[2].bookings);
    currentRooms = allRooms.filterByBookedStatus(allBookings.findTaken(chosenDate.value));
    hide([userInfo]);
    show([bookingsForm]);
    showAvailableManager();
  });
});

getRoomManager.addEventListener('click', () => { showAvailableManager() })

// Functions
const show = (elements) => {
  elements.forEach(element => element.classList.remove('hidden'));
  elements.forEach(element => element.setAttribute('aria-hidden', 'false'));
}

const hide = (elements) => {
  elements.forEach(element => element.classList.add('hidden'));
  elements.forEach(element => element.setAttribute('aria-hidden', 'true'));
}

const clear = (element) => {
  element.innerHTML = '';
}

const showLogin = () => {
  MicroModal.show('modal-2');
}

const formatDate = (date) => {
  const year = date.toLocaleString('default', { year: 'numeric' });
  const month = date.toLocaleString('default', { month: '2-digit' });
  const day = date.toLocaleString('default', { day: '2-digit' });
  return year + "-" + month + "-" + day;
}

const verifyLogin = () => {
  if(password.value === 'overlook2021' && username.value.substr(0, 8) === 'customer' && username.value.length < 11 && parseInt(username.value.substr(8, 10)) < 51){
    welcomeCustomer();
  } else if(username.value === 'manager' && password.value === 'overlook2021'){
    welcomeManager();
  } else if(password.value !== 'overlook2021' && username.value.substr(0, 8) === 'customer' && username.value.length < 11 && parseInt(username.value.substr(8, 10)) < 51 || username.value === 'manager'){
    giveFeedback('password');
  } else if(password.value === 'overlook2021' && (username.value.substr(0, 8) !== 'customer' ||  username.value.length >= 11 || parseInt(username.value.substr(8, 10)) > 51)){
    giveFeedback('username');
  } else if(password.value !== 'overlook2021' && username.value.substr(0, 8) !== 'customer' ||  username.value.length >= 11 || parseInt(username.value.substr(8, 10)) > 51){
    giveFeedback('username and password');
  }
}

const welcomeCustomer = () => {
  hide([modalFooter2]);
  getSingleUser(username.value.substr(8, 10)).then(data => currentUser = new User(data));
  loginButton.disabled = 'true';
  loginButton.innerHTML = '<span class="material-symbols-outlined checkmark">check</span>';
  setTimeout(MicroModal.close, 1200);
}

const welcomeManager = () => {
  hide([modalFooter2]);
  loginButton.disabled = 'true';
  loginButton.innerHTML = '<span class="material-symbols-outlined checkmark">check</span><p>Hello Manager!</p>';
  setTimeout(MicroModal.close, 1200);
  displayManagerDashboard();
}

const giveFeedback = (reason) => {
  modalFooter2.innerHTML = '';
  show([modalFooter2]);
  modalFooter2.innerHTML += `<p class="wrong">Incorrect ${reason}!</p>`;
}

const showModal = () => {
  MicroModal.show('modal-1');
  show([chooseType, seeAllButton]);
  hide([modalFooter]);
  clear(availableRooms);
  dateTitle.innerText = chosenDate.value;
  populateAvailable();
}

const populateAvailable = () => {
  clear(availableRooms);

  fetchData().then(data => {
    allBookings = new Bookings(data[2].bookings);
    currentRooms = allRooms.filterByBookedStatus(allBookings.findTaken(chosenDate.value));
  });
  
  if(currentRooms.length === 0) {
    availableRooms.innerHTML +=
      `<li class="none-available">We're sorry!  There are no rooms of that type available on ${chosenDate.value}.  Please try selecting another type or date!</li>`;
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
  hide([findRoomSection, expensesSection]);
  show([bookingsSection]);
  currentRooms = allRooms.filterByBookedStatus(allBookings.findTaken(chosenDate.value));
  populateBookings();
}

const populateBookings = () => {
  clear(bookingsContent);

  bookingsContent.innerHTML = '<h3>Your Bookings:</h3>';

  currentUser.filterBookingByUser(allBookings.bookings);
  currentUser.sortByDate(formatDate(new Date()).replaceAll('-', ''));

  currentUser.newBookings.forEach(booking => {
    bookingsContent.innerHTML += `<p class="single-booking" tabindex="0">Your upcoming booking is in <span class="emphasize">Room ${booking.roomNumber}</span> on <span class="emphasize">${booking.date}!</span> Enjoy your stay!</p>`;
  });

  currentUser.oldBookings.forEach(booking => {
    bookingsContent.innerHTML += `<p class="single-booking" tabindex="0">Your previous booking was in <span class="emphasize">Room ${booking.roomNumber}</span> on <span class="emphasize">${booking.date}.</span></p>`;
  });
}

const displayExpenses = () => {
  hide([findRoomSection, bookingsSection]);
  show([expensesSection]);

  currentUser.filterBookingByUser(allBookings.bookings);

  clear(expensesSection);
  expensesSection.innerHTML += `<p class="expenses-section" tabindex="0">Your total spent on hotel rooms with Overlook Booking is <span class="emphasize">$${currentUser.getTotalCost(allRooms.rooms)}.</span></p>`;
}

const offerChoices = () => {
  hide([chooseType, seeAllButton]);
  show([modalFooter]);
  clear(modalFooter);

  allRooms.getAllRoomTypes().forEach((roomType) => {
  modalFooter.innerHTML += 
    `<input type="radio" id="${roomType}" class="room-type" value="${roomType}" name="roomType" tabindex="0"><label for="${roomType}">${roomType}</label>`;
  });

  modalFooter.innerHTML += '<button id="showAll" class="modal__btn">Show All</button>';

  document.getElementById('showAll').addEventListener('click', () => {
    showAll();
  });

  allRooms.getAllRoomTypes().forEach(roomType => {
    document.getElementById(`${roomType}`).addEventListener('click', () => {
      currentRooms = allRooms.filterByRoomType(`${roomType}`);
      populateAvailable();
    });
  });
}

const showAll = () => {
  show([chooseType, seeAllButton]);
  hide([modalFooter]);
  currentRooms = allRooms.filterByBookedStatus(allBookings.findTaken(chosenDate.value));
  populateAvailable();
}

const bookRoom = (num) => {
  postBooking(currentUser.id, chosenDate.value.replaceAll('-', '/'), parseInt(num));
  
  fetchData().then(data => {
    allBookings = new Bookings(data[2].bookings);
    currentRooms = allRooms.filterByBookedStatus(allBookings.findTaken(chosenDate.value));
  });
  
  const roomButton = document.getElementById(`${num}`)
  roomButton.innerText = 'Booked!';
  roomButton.disabled = 'true';

  populateBookings();
}

const displayManagerDashboard = () => {
  hide([nav, findRoomSection]);
  show([managerDashboard]);

  numAvailable.innerText = manager.getRoomsAvailableToday(formatDate(new Date())).length;

  percentAvailable.innerText = Math.round((manager.getRoomsAvailableToday(formatDate(new Date())).length)/25 * 100);

  manager.getRoomsAvailableToday(formatDate(new Date())).forEach(room => {
    managerAvailable.innerHTML += `<li>Room ${room.number} (${room.roomType} with ${room.numBeds} ${room.bedSize} bed(s))</li>`;
  })

  revenue.innerText = `Today's revenue so far is $${manager.calculateRevenue(formatDate(new Date()))}.`;
}

const displayUserSearch = () => {
  if(!manager.findUser(searchUsers.value)) {
    userInfo.innerHTML = '<p>That customer is not in our system.</p>';
    return;
  } else {
    currentUser = new User(manager.findUser(searchUsers.value));
  }

  currentUser.filterBookingByUser(allBookings.bookings);
  currentUser.sortByDate(formatDate(new Date()).replaceAll('-', ''));

  clear(userInfo);
  show([userInfo, addBookingButton]);
  hide([bookingsForm, allAvailableManager]);

  userInfo.innerHTML += `<p class="center"><span class="size-up">${currentUser.name}</span> - $${currentUser.getTotalCost(allRooms.rooms)} spent</p>`;

  currentUser.newBookings.forEach(booking => {
    userInfo.innerHTML += `<p class="single-booking row">Booking on: ${booking.date} in Room ${booking.roomNumber}<button class="delete-booking" id="${booking.id}">Delete Booking</button></p>`;
  });
  
  currentUser.oldBookings.forEach(booking => {
    userInfo.innerHTML += `<p class="single-booking">Booking on: ${booking.date} in Room ${booking.roomNumber}</p>`;
  });

  currentUser.newBookings.forEach(booking => {
    selectors.push(document.getElementById(`${booking.id}`));
  });

  selectors.forEach(selector => {
    selector.addEventListener('click', (event) => {
      selector.innerText = 'Deleted!';
      selector.disabled = 'true';
      deleteBooking(event.target.id);
    })
  });
}

const deleteBooking = (id) => {
  removeBooking(id);

  setTimeout(() => {
    fetchData().then(data => {
      allBookings = new Bookings(data[2].bookings);
      displayUserSearch();
    })
  }, 2000);
}

const showAvailableManager = () => {
  clear(allAvailableManager);
  show([allAvailableManager]);

  allRooms.filterByBookedStatus(allBookings.findTaken(chosenDateManager.value));

  allRooms.availableRooms.forEach(room => {
    allAvailableManager.innerHTML += `<button id="manager-${room.number}" class="manager-available">Room ${room.number}, ${room.roomType} with ${room.numBeds} ${room.bedSize} bed(s).  $${room.costPerNight}. Click to book!</button>`;
  })

  allRooms.availableRooms.forEach(room => {
    document.getElementById(`manager-${room.number}`).addEventListener('click', (event) => {
      postBooking(currentUser.id, chosenDateManager.value.replaceAll('-', '/'), parseInt(event.target.id.slice(8)));
      event.target.innerText = 'Booked!';
      event.target.disabled = 'true';

      setTimeout(() => {
        event.target.remove();
      }, 2000);
    })
  })
}