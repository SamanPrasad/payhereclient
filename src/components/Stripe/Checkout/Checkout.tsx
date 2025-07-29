import { useState, type ChangeEvent } from "react";
import { client } from "../../../service/axios";

function Checkout() {
  const [email, setEmail] = useState("");

  const updateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePayment = () => {
    client
      .post("/stripe/payment/checkout")
      .then((res) => {
        const url = res.data;
        console.log(url);

        window.location.href = url;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Checkout</h1>
      <input type="email" onChange={updateEmail} value={email} />
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
}

export default Checkout;
