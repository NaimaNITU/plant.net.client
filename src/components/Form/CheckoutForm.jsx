import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import "./checkoutForm.css";
import { CircleLoader } from "react-spinners";
const CheckoutForm = ({ totalPrice, orderData, closeModal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    setLoading(true);
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <p className="text-red-500 ">{error}</p>
      <div className="flex justify-between">
        <button
          type="submit"
          className="btn bg-lime-500 px-6 py-2 text-white mt-4"
          disabled={!stripe || loading}
        >
          {loading ? (
            <CircleLoader color="#40FF40" size={20} />
          ) : (
            `Pay ${totalPrice}$`
          )}
        </button>
        <button
          onClick={closeModal}
          type="button"
          className="btn bg-red-500 px-6 py-2 text-white mt-4"
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
