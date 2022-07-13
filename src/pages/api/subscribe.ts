import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../sevices/stripe";
import { getSession } from "next-auth/react";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const session = await getSession({ req })
        const stripeCustomer = await stripe.customers.create({
            email: session.user.email
            //metadata
        })

        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: stripeCustomer.id,
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            line_items: [
                { price: "price_1LJN07CDR38oeZL9NAEayKb4", quantity: 1 }
            ],
            mode: "subscription",
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })

        return res.status(200).json({ sessionId: stripeCheckoutSession.id })
    } else {
        res.setHeader("allow", "POST")
        res.status(405).end("Method not allowed")
    }
}