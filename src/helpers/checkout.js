"use client";
import { loadStripe } from "@stripe/stripe-js";

//issubscribed true func-->cala apip

export async function checkout({ lineItems }) {
  console.log("clickd", lineItems);
  let stripePromise = null;
  const getstripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(
        "pk_test_51Nc1F5SBaY4bjToVkOGWmEpijcyiYPXW9yJrqehWCM3svZjXGAmLE76tXuMeSIqzC6SzGrpKkX9fMAaDml9OcvrB006sLmMow9"
      );
    }
    return stripePromise;
  };
  const stripe = await getstripe();
  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin,
  });
}
