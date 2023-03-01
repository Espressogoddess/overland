import { expect } from 'chai';
import Customer from '../src/classes/Customer';
import sampleCustomerData from '../src/data/customer-data';

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

    it('should start with no bookings', () => {
        expect(customer.bookings).to.have.length(0)
    });

    it('should be able to have bookings', () => {
        customer.getBookings();
        expect(customer.bookings).to.have.length(1)
    });

})