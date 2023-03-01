import './css/styles.css';
import './images/sunburst.png';

const usersRoomsSection = document.querySelector('#user-booked-section');
const bookRoomSection = document.querySelector('#book-room-section');

const fetchCustomerData = fetch('http://localhost:3001/api/v1/customers')
    .then(response => response.json());
const fetchBookingData = fetch('http://localhost:3001/api/v1/bookings')
    .then(response => response.json());
const fetchRoomData = fetch('http://localhost:3001/api/v1/rooms')
    .then(response => response.json());

Promise.all([fetchCustomerData, fetchBookingData, fetchRoomData])
    .then(data => {
        console.log(data)
        let allData = {
            customers: data[0].customers,
            bookings: data[1].bookings,
            rooms: data[2].rooms
        }
        return allData;
    })
    .then(allData => {

    })