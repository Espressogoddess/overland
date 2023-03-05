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
const confirmationTitle = document.querySelector('#confirmation-title');
const confirmationSection = document.querySelector('#confirmation-section');

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
        renderPage();
    });

backButton.addEventListener('click', () => {
    currentView = 'dashboard';
    renderPage();
});

dateForm.addEventListener('submit', (event) => {
    event.preventDefault();
    currentView = 'book';
    renderPage();
});

availableRoomsSection.addEventListener('click', (event) => {
    if (event.target.dataset.roomNumber) {
        const roomNumber = parseInt(event.target.dataset.roomNumber);
        currentView = 'dashboard';
        hotel.addNewBooking(hotel.getSelectedRoom(roomNumber), customer, selectedDate);
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
                    console.log(data.newBooking.id)
                    //use ^ to look up booking and render details to the page in render fn
                    currentView = 'confirmation';
                    renderPage() 
                }
            })
            //add success page if successful post
            //add error page to try again if not
        setTimeout(() => {
            currentView = 'dashboard';
            renderPage();
        }, 4000)
    } else {
        return
    }
});


function renderPage() {
    if (currentView === 'dashboard') {
        userDashboard.classList.remove('hidden');
        bookRoomSection.classList.add('hidden');
        confirmationSection.classList.add('hidden');
        const bookings = customer.getBookings(hotel)
        totalSpent.innerText = `$${customer.getTotalSpent(hotel)}`;
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
    } else if (currentView === 'book') {
        userDashboard.classList.add('hidden');
        bookRoomSection.classList.remove('hidden');
        confirmationSection.classList.add('hidden');
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
    } else if (currentView === 'confirmation') {
        confirmationSection.classList.remove('hidden');
        bookRoomSection.classList.add('hidden');
        userDashboard.classList.add('hidden');
        confirmationTitle.innerText = 'Yeah';
    }
}

const picker = datepicker('#date-selection', {
    minDate: new Date(), 
    onSelect: (instance, date) => {
        selectedDate = DateTime.fromJSDate(date).toISODate().split('-').join('/');
    }
});
picker.calendarContainer.style.setProperty('font-size', '.85rem');