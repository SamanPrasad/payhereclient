import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe, type StripeCardElement } from "@stripe/stripe-js";
import axios from "axios";
import React, { useState, type FormEvent, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const stripe = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

export const StripeProvider = ({ children }: Props) => {
  return <Elements stripe={stripe}>{children}</Elements>;
};

function PaymentIntent() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | undefined>(undefined);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setError("Card Information Not Found");
        return;
      }

      const response = await axios.post("http://localhost:3000/payment-intent");
      const { clientSecret } = response.data;
      const paymentIntentResult = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (paymentIntentResult.error) {
        setError(paymentIntentResult.error.message);
      } else {
        console.log(paymentIntentResult);
      }
    } catch (error: unknown) {
      if (error instanceof Error) setError(error.message);
      console.log(error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div style={{ border: "1px solid black" }}>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={processing}>
          {processing ? "Processing..." : "pay"}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default PaymentIntent;
