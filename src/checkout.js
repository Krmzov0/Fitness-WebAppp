import { loadStripe } from "@stripe/stripe-js";

export async function checkout({ lineItems }) {
  let stripePromise = null;

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe('pk_test_51NRm7XI6xdHmUGn6i72GkGswbVT5WSlPmAa942iaehnbZaV5nEUsS8ET5XmxBDhr7AF7f6inHHLYxOiQOyQfv7MX00Kk6e0XHc');
    }
    return stripePromise;
  };

  const stripe = await getStripe();

  await stripe.redirectToCheckout({
    mode: 'payment',
    lineItems,
    successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin
  });
}
