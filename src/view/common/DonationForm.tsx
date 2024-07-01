import React, { useState, ChangeEvent, FormEvent } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import {Link} from "react-router-dom";

const stripePromise = loadStripe('pk_test_51PX1U32KKuiJ0VmHvEOz8nhZA3tU2rbgaYxENDhHohjtvDxllW3jY22gEVqDxQFVE52FoFrLVK1oFuJNCaY0E1DK00FgT5P2po');

const CheckoutForm: React.FC = () => {
    const [amount, setAmount] = useState<number>(0);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/payment/create-checkout-session', {
                amount,
            });

            const session = response.data;

            const result = await stripe?.redirectToCheckout({
                sessionId: session.id,
            });

            if (result?.error) {
                console.error(result.error.message);
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
            // Handle error here, e.g., show a user-friendly message
        }
    };

    const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(event.target.value));
    };

    return (
        <section className='w-screen h-screen fixed top-[100px] z-10'>
            <section className="flex flex-col items-center pt-6">
                <div className="w-[500px] bg-white rounded-lg shadow md:mt-0 xl:p-0">
                    <Link to='/'>
                        <button className='p-4'>
                            <img width='15px' src='/src/image/xmark-solid.svg' alt="Close" />
                        </button>
                    </Link>
                    <div className="p-6 pt-0 space-y-4 md:space-y-6">
                        <h1  className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Donation</h1>
                        <form className='flex flex-wrap gap-[20px] flex-col' onSubmit={handleSubmit}>
                            <label className='mb-[20px]'>
                                Donation Amount:
                                <div className='mt-[10px]'>
                                    <span>USD </span>
                                    <input
                                        className='shadow h-[44px] w-[60%] rounded-sm p-4'
                                        type="number"
                                        value={amount}
                                        onChange={handleAmountChange}
                                    />
                                </div>

                            </label>
                            <CardElement />
                            <button className='w-[100%] h-[44px] bg-[#FFE66F] rounded-lg mt-[20px]' type="submit" disabled={!stripe}>
                                Donate
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </section>
    );
};

const DonationForm: React.FC = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default DonationForm;
