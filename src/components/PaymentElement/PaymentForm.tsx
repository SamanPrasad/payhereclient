import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState, type FormEvent } from "react";

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | undefined>(undefined);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError("No Stripe Account Found!");
      return;
    }

    setProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173",
        payment_method_data: {
          billing_details: {
            name: "Jerome",
            email: "jerome@example.com",
          },
        },
        shipping: {
          name: "Jerome",
          address: {
            line1: "test line",
            city: "Kandy",
            country: "Sri Lanka",
          },
        },
      },
      redirect: "if_required",
    });

    console.log(error, paymentIntent);

    setProcessing(false);
  };
  return (
    <div>
      <h1>Payment Element</h1>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button type="submit" disabled={processing}>
          {processing ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
}

export default PaymentForm;
