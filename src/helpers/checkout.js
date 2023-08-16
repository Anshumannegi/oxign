"use client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";


//issubscribed true func-->cala apip
const handleUpdateLabTest = async (user) => {
  console.log(user._id, "handleUser");
  try {
    const response = await axios.put("/api/users/makeUserSubscribed", {
      id: user._id,
    });
    console.log(user, "handleUser1");
    if (response.status === 200) {
      console.log(response.data.message); // "User updated successfully"
    } else {
      console.error(response.data.message);
    }
  } catch (error) {
    console.error("Error updating lab test:", error);
  }
};

export async function checkout({ lineItems, user }) {
  console.log("clickd", lineItems);
  console.log(user.isSubscribed, "myuser");
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
  await handleUpdateLabTest(user);

  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${window.location.origin}/paymentSuccess/?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${window.location.origin}/paymentFail`,
  });


  // const queryString = window.location.search;
  // const urlParams = new URLSearchParams(queryString);
  // console.log(urlParams, "urlParams");

  // const sessionID = urlParams.get("session_id");
  // console.log(sessionID, "sessionID");
  // if (sessionID) {
  //   // Assuming your handleUpdateLabTest function takes the user as a parameter
  //   await handleUpdateLabTest(user);
  // }
}
