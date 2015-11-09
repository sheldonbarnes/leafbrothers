/**
 * Created by sheldonbarnes on 11/2/15.
 */



module app.LeafBrothers {


    interface ILeafBrothersCustomer {
        name: string;
        phoneNumber: string;
        address: string;
        city: string;
        state: string;
        email: string;
        subdivision: string;

        requestedDate: Date;
        requestedAmount: number;

        findCustomerByName(nameInput: string): ILeafBrothersCustomer;
        findCustomerByEmail(emailInput: string): ILeafBrothersCustomer;
        //saveCustomerToDb(): void;

    }

    class customer implements ILeafBrothersCustomer{

        name: string;
        phoneNumber: string;
        address: string;
        city: string;
        state: string;
        email: string;
        subdivision: string;

        requestedDate: Date;
        requestedAmount: number;

        findCustomerByName(nameInput: string): customer {
            return new customer;
        }
        findCustomerByEmail(emailInput: string): customer {
            return new customer;

        }

    }
    angular
        .module("LeafBrothers")
        .controller("LeafBrothersController",
            customer);


}