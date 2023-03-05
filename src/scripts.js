import './css/styles.css';
import './images/sunburst.png';
import Customer from './classes/Customer';
import Hotel from './classes/Hotel';
import { DateTime } from 'luxon';
import datepicker from 'js-datepicker';

const userDashboard = document.querySelector('#user-booked-section');
const bookRoomSection = document.querySelector('#book-room-section');
const totalSpent = document.querySelector('#total-spent');
const bookedTableBody = document.querySelector('#booking-tbody');
const dateForm = document.querySelector('#select-a-date');
const availableRoomsSection = document.querySelector('#available-rooms');
const availableRoomSectionTitle = document.querySelector('#room-avail-title');
const backButton = document.querySelector('#back-button');

let customer;
let hotel;
let selectedDate;
let currentView = 'dashboard';

const fetchCustomerData = fetch('http://localhost:3001/api/v1/customers')
    .then(response => response.json());
const fetchBookingData = fetch('http://localhost:3001/api/v1/bookings')
    .then(response => response.json());
const fetchRoomData = fetch('http://localhost:3001/api/v1/rooms')
    .then(response => response.json());

Promise.all([fetchCustomerData, fetchBookingData, fetchRoomData])
    .then(data => {
        customer = new Customer(data[0].customers[7]);
        hotel = new Hotel(data[2].rooms, data[1].bookings);
        renderPage(customer.getBookings(hotel));
    });

backButton.addEventListener('click', () => {
    currentView = 'dashboard';
    renderPage(customer.getBookings(hotel));
});

dateForm.addEventListener('submit', (event) => {
    event.preventDefault();
    currentView = 'book';
    renderPage(hotel.filterByDate(selectedDate));
});

availableRoomsSection.addEventListener('click', (event) => {
    if (event.target.dataset.roomNumber) {
        const roomNumber = event.target.dataset.roomNumber;
        currentView = 'dashboard';
        hotel.addNewBooking(hotel.getSelectedRoom(roomNumber), customer, selectedDate);
        //if successfully booked show success page
        //if not show error
        setTimeout(renderPage, 4000, customer.getBookings(hotel))
    } else {
        return
    }
});


function renderPage(bookingsOrRooms) {
    if (currentView === 'dashboard') {
        userDashboard.classList.remove('hidden');
        bookRoomSection.classList.add('hidden');
        totalSpent.innerText = `$${customer.getTotalSpent(hotel)}`;
        bookedTableBody.innerHTML = '';
        bookingsOrRooms.forEach(booking => {
            bookedTableBody.innerHTML += `
            <tr>
                <td scope="row">${booking.formatDate()}</td>
                <td>${booking.room.number}</td>
                <td>${booking.room.type}</td>
                <td>$${booking.room.costPerNight.toFixed(2)}</td>
            </tr>`;
        });
    } else if (currentView === 'book') {
        userDashboard.classList.add('hidden');
        bookRoomSection.classList.remove('hidden');
        const availableRooms = hotel.filterByDate(selectedDate);
        const formattedDate = DateTime
            .fromFormat(selectedDate, 'yyyy/MM/dd')
            .toLocaleString(DateTime.DATE_MED);

        if (availableRooms.length) {
            availableRoomSectionTitle.innerText = `Available Rooms on ${formattedDate}`;
            availableRoomsSection.innerHTML = '';
            availableRooms.forEach(room => {
                availableRoomsSection.innerHTML += `
        <div class="col-3">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-title">${room.type}</h6>
              <h6 class="card-title">Room #${room.number}</h6>
            </div>
            <div class="d-flex justify-content-between">
                <p class="card-text">beds: ${room.numBeds} ${room.bedSize}</p>
                <p class="card-text">$${room.costPerNight.toFixed(2)}</p>
            </div>
            <div class="d-flex justify-content-end">
                <button class="mb-0 small-button" data-room-number="${room.number}">Book</button>
            </div>
          </div>
        </div>
        </div>`;
            })
        } else {
            availableRoomSectionTitle.innerText = `Sorry! There are not any available rooms on ${formattedDate}`;
        }
    }
}

const picker = datepicker('#date-selection', {
    onSelect: (instance, date) => {
        selectedDate = DateTime.fromJSDate(date).toISODate().split('-').join('/');
    }
});