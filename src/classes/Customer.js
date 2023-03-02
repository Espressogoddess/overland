import Booking from './Booking';

class Customer {
    constructor(customerData) {
        this.id = customerData.id;
        this.name = customerData.name;
    }
    getBookings(bookingData) {
        const bookings = [];
        const foundBookings = bookingData.filter(foundBooking => foundBooking.userID === this.id);
        foundBookings.forEach(foundBooking => {
            bookings.push(new Booking(foundBooking));
        });
        if (!bookings) {
            return;
        }
        return bookings;
    }
    getTotalSpent(bookingData, roomData) {
        const bookings = this.getBookings(bookingData);
        const price = bookings.reduce((acc, curr) => {
            roomData.forEach(room => {
                if (room.number === curr.roomNumber) {
                    acc += room.costPerNight;
                }
            })
            return acc;
        }, 0)
        if (!price) {
            return;
        } else {
            return price;
        }
    }
}

export default Customer;