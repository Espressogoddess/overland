import './css/styles.css';
import './images/sunburst.png';
import Customer from './classes/Customer';
import Hotel from './classes/Hotel';
import { DateTime } from 'luxon';
import datepicker from 'js-datepicker';

const usersRoomsSection = document.querySelector('#user-booked-section');
const bookRoomSection = document.querySelector('#book-room-section');
const totalSpent = document.querySelector('#total-spent');
const bookedTableBody = document.querySelector('#booking-tbody');
const dateForm = document.querySelector('#select-a-date');

let customer;
let hotel;
let currentDate;

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
        const customerBookings = customer.getBookings(hotel);
        renderPage(customerBookings);
});

function renderPage(bookings) {
    totalSpent.innerText = `$${customer.getTotalSpent(hotel)}`;
    bookedTableBody.innerHTML = '';
    bookings.forEach(booking => {
        bookedTableBody.innerHTML += `
            <tr>
                <td scope="row">${booking.formatDate()}</td>
                <td>${booking.room.number}</td>
                <td>${booking.room.type}</td>
                <td>$${booking.room.costPerNight.toFixed(2)}</td>
            </tr>`
    });
}

const picker = datepicker('#date-selection', {onSelect: (instance, date) => {
    currentDate = DateTime.fromJSDate(date).toISODate().split('-').join('/');

    console.log(hotel.filterByDate(currentDate))

}});