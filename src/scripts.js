import './css/styles.css';
import './images/sunburst.png';
import Customer from './classes/Customer';
import Room from './classes/Room';
import Booking from './classes/Booking';

const usersRoomsSection = document.querySelector('#user-booked-section');
const bookRoomSection = document.querySelector('#book-room-section');

let customer;
const rooms = [];
const bookings = [];

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
        customer = new Customer(allData.customers[7]);
        allData.rooms.forEach(room => {
            rooms.push(new Room(room)) ;
        });
        allData.bookings.forEach(booking => {
            bookings.push(new Booking(booking));
        });
        console.log(bookings)
    })