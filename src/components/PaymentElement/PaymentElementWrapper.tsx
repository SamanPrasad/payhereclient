import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect, useState, type PropsWithChildren } from "react";
import PaymentForm from "./PaymentForm";

const stripe = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

function PaymentElementWrapper() {
  const [clientSecret, setClienSecret] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    axios
      .post("http://localhost:3000/payment-intent-payment-element")
      .then((res) => {
        console.log(res.data.clientSecret);
        setClienSecret(() => {
          console.log("in", res.data.clientSecret);
          return res.data.clientSecret;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!clientSecret) return <div>Loading payment form...</div>;

  return (
    <div>
      <Elements stripe={stripe} options={{ clientSecret }}>
        <PaymentForm />
      </Elements>
    </div>
  );
}

export default PaymentElementWrapper;
