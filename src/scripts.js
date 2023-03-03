import './css/styles.css';
import './images/sunburst.png';
import Customer from './classes/Customer';
import Hotel from './classes/Hotel';

const usersRoomsSection = document.querySelector('#user-booked-section');
const bookRoomSection = document.querySelector('#book-room-section');
const totalSpent = document.querySelector('#total-spent');
const bookedTableBody = document.querySelector('#booking-tbody');

let customer;
let hotel;

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
        hotel.bookings.forEach(booking => booking.getRoom(hotel.rooms));
        const customerBookings = customer.getBookings(hotel);
        renderPage(customerBookings);
});

function renderPage(bookings) {
    totalSpent.innerText = `$${customer.getTotalSpent(hotel)}`;
    bookedTableBody.innerHTML = '';
    bookings.forEach(booking => {
        debugger
        bookedTableBody.innerHTML += `
            <tr>
                <td scope="row">${booking.date}</td>
                <td>${booking.room.number}</td>
                <td>${booking.room.type}</td>
                <td>$${booking.room.costPerNight.toFixed(2)}</td>
            </tr>`
    });
}