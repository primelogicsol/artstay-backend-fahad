import Stripe from "stripe";
import { env } from "~/env";

const stripe = new Stripe(env.STRIPE_SECRET);

export default stripe;
