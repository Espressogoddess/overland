import { expect } from 'chai';
import Customer from '../src/classes/Customer';
import sampleCustomerData from '../src/data/customer-data';
import Booking from '../src/classes/Booking';
import sampleBookingData from '../src/data/booking-data';
import sampleRoomData from '../src/data/room-data';
import customerData from '../src/data/customer-data';

describe('Customer', () => {
    let customer;

    beforeEach(() => {
        customer = new Customer(sampleCustomerData[0]);
    });

    it('should be a function', () => {
        expect(Customer).to.be.a('function');
    });

    it('should be an instance of Customer', () => {
        expect(customer).to.be.an.instanceOf(Customer);
    });

    it('should have an id', () => {
        expect(customer.id).to.equal(sampleCustomerData[0].id);
    });

    it('should have a name', () => {
        expect(customer.name).to.equal(sampleCustomerData[0].name);
    });

    it('should be able to get bookings', () => {
        const bookings = customer.getBookings(sampleBookingData);
        expect(bookings[0]).to.be.instanceOf(Booking);
        expect(bookings).to.have.length(1);
        expect(bookings[0].date).to.equal('2022/02/05');
    });

    it('should not be able to get the wrong bookings', () => {
        customer = new Customer(sampleCustomerData[1])
        const bookings = customer.getBookings(sampleBookingData);
        expect(bookings).to.deep.equal([])
    });

    it('should be able to calculate total spent on bookings', () => {
        expect(customer.getTotalSpent(sampleBookingData, sampleRoomData)).to.equal(477.38);
    });

    it('should be able to get total with no bookings', () => {
        customer = new Customer(sampleCustomerData[2]);
        expect(customer.getTotalSpent(sampleBookingData, sampleRoomData)).to.equal(0);
    });

});