const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = new Stripe('sk_test_51PX1U32KKuiJ0VmHoFH5o0WiHmy5LQAwiiYuHXrtIFaoHx7CZ4j9P31qVSUGEFSyoXL4H7xYm3d7I5hru6i21lu600id5OuhzN');

router.post('/create-checkout-session', async (req, res) => {
    const { amount } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Donation',
                    },
                    unit_amount: amount * 100, // amount in cents
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
