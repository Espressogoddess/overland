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
}

export default Customer;