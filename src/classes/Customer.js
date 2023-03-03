import Booking from './Booking';

class Customer {
    constructor(customerData) {
        this.id = customerData.id;
        this.name = customerData.name;
    }
    getBookings(hotel) {
        return hotel.bookings.filter(foundBooking => foundBooking.userID === this.id);
    }
    getTotalSpent(hotel) {
        const bookings = this.getBookings(hotel);
        const price = bookings.reduce((acc, curr) => {
            hotel.rooms.forEach(room => {
                if (room.number === curr.roomNumber) {
                    acc += room.costPerNight;
                }
            })
            return acc;
        }, 0)
            return price.toFixed(2);
    }
}

export default Customer;