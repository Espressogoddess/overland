import './css/styles.css';
import './images/sunburst.png';
import Customer from './classes/Customer';
import Hotel from './classes/Hotel';
import {
    DateTime
} from 'luxon';
import datepicker from 'js-datepicker';

const userDashboard = document.querySelector('#user-booked-section');
const bookRoomSection = document.querySelector('#book-room-section');
const totalSpent = document.querySelector('#total-spent');
const bookedTableBody = document.querySelector('#booking-tbody');
const dateForm = document.querySelector('#select-a-date');
const availableRoomsSection = document.querySelector('#available-rooms');
const availableRoomSectionTitle = document.querySelector('#room-avail-title');
const backButton = document.querySelector('#back-button');
const confirmationSection = document.querySelector('#confirmation-section');
const resetButton = document.querySelector('#reset-button');
const radioButtons = document.querySelector('#radio-buttons');
const dateInput = document.querySelector('#date-selection');
const errorSection = document.querySelector('#error-page');
const radios = document.getElementsByName("flexRadioDefault");
const picker = datepicker('#date-selection', {
    minDate: new Date(),
    onSelect: (instance, date) => {
        selectedDate = DateTime.fromJSDate(date).toISODate().split('-').join('/');
    }
});
const dashboardTitle = document.querySelector('#booking-table-title');

picker.calendarContainer.style.setProperty('font-size', '.85rem');

let customer;
let hotel;
let selectedDate;
let currentView = 'dashboard';
let roomTypeFilter = '';

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
        renderPage(roomTypeFilter);
    })
    .catch(error => {
        renderErrorPage()
    });

backButton.addEventListener('click', () => {
    currentView = 'dashboard';
    roomTypeFilter = '';
    selectedDate = '';
    picker.setDate();
    radios.forEach(radio => radio.checked = false);
    renderPage(roomTypeFilter);
});

dateForm.addEventListener('submit', (event) => {
    event.preventDefault();
    currentView = 'book';
    renderPage(roomTypeFilter);
});

resetButton.addEventListener('click', () => {
    radios.forEach(radio => radio.checked = false);
    renderPage(roomTypeFilter);
});

radioButtons.addEventListener('change', (event) => {
    if (event.target.value) {
        const roomTypeFilter = event.target.value;
        renderPage(roomTypeFilter);
    }
})

availableRoomsSection.addEventListener('click', (event) => {
    if (event.target.dataset.roomNumber) {
        const roomNumber = parseInt(event.target.dataset.roomNumber);
        currentView = 'dashboard';
        fetch('http://localhost:3001/api/v1/bookings', {
                method: 'POST',
                body: JSON.stringify({
                    "userID": customer.id,
                    "date": selectedDate,
                    "roomNumber": roomNumber
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.message.includes('success')) {
                    hotel.addNewBooking(data.newBooking);
                    currentView = 'confirmation';
                    roomTypeFilter = '';
                    selectedDate = '';
                    picker.setDate();
                    renderPage(roomTypeFilter);
                    setTimeout(() => {
                        radios.forEach(radio => radio.checked = false);
                        currentView = 'dashboard';
                        renderPage(roomTypeFilter);
                    }, 2500)
                }
            })
            .catch(error => {
                availableRoomSectionTitle.innerText = 'Oops, it looks like there was an error, please try booking again';
            })
    } else {
        return
    }
});

function renderPage(roomTypeFilter) {
    if (currentView === 'dashboard') {
        updateView(confirmationSection, bookRoomSection, userDashboard);
        renderDashboard();
    } else if (currentView === 'book') {
        updateView(userDashboard, confirmationSection, bookRoomSection);
        renderBookingPage(roomTypeFilter);
    } else if (currentView === 'confirmation') {
        updateView(userDashboard, bookRoomSection, confirmationSection);
    }
}

function renderDashboard() {
    const bookings = customer.getBookings(hotel)
    totalSpent.innerText = `$${customer.getTotalSpent(hotel)}`;
    if (bookings && bookings.length) {
        bookedTableBody.innerHTML = '';
        bookings.forEach(booking => {
            bookedTableBody.innerHTML += `
                <tr>
                    <td scope="row">${booking.formatDate()}</td>
                    <td>${booking.room.number}</td>
                    <td>${booking.room.type}</td>
                    <td>$${booking.room.costPerNight.toFixed(2)}</td>
                </tr>`;
        });
    } else {
        dashboardTitle.innerText = 'Sorry, you don\t have any bookings yet';
    }
}

function renderBookingPage(roomTypeFilter) {
    let availableRooms;
    if (roomTypeFilter) {
        availableRooms = hotel.filterByRoomType(roomTypeFilter, selectedDate);
    } else {
        availableRooms = hotel.filterByDate(selectedDate);
    }
    const formattedDate = DateTime
        .fromFormat(selectedDate, 'yyyy/MM/dd')
        .toLocaleString(DateTime.DATE_MED);
    if (availableRooms && availableRooms.length) {
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
        availableRoomSectionTitle.innerText = `Sorry! There are not any available rooms of that type on ${formattedDate}`;
        availableRoomsSection.innerHTML = '';
    }
}

function updateView(elementToRemove1, elementToRemove2, elementToShow) {
    elementToRemove1.classList.add('hidden');
    elementToRemove2.classList.add('hidden');
    elementToShow.classList.remove('hidden');
}

function renderErrorPage() {
    errorSection.classList.remove('hidden');
    userDashboard.classList.add('hidden');
}