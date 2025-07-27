import axios from "axios";
import React, { useEffect, useState } from "react";

function PayHere() {
  const [hash, setHash] = useState<string | undefined>(undefined);

  useEffect(() => {
    axios.post("http://localhost:3000/payhere").then((res) => {
      setHash(res.data.hash);
    });
  }, []);

  if (!hash) return <p>Loading...</p>;

  return (
    <div>
      <h1>PayHere</h1>
      <form action="https://sandbox.payhere.lk/pay/checkout" method="post">
        <input
          type="hidden"
          name="merchant_id"
          value="4OVxzVOsELo4JFnJjKXDTZ3Xe"
        />
        <input
          type="hidden"
          name="return_url"
          value="https://testnext-five-sigma.vercel.app/api/payhere/webhook"
        />
        <input
          type="hidden"
          name="cancel_url"
          value="https://testnext-five-sigma.vercel.app/api/payhere/webhook"
        />
        <input
          type="hidden"
          name="notify_url"
          value="https://testnext-five-sigma.vercel.app/api/payhere/webhook"
        />
        <h4>Item Details</h4>
        <input type="text" name="order_id" defaultValue="ItemNo12345" />
        <input type="text" name="items" defaultValue="Door bell wireless" />
        <input type="text" name="currency" defaultValue="LKR" />
        <input type="text" name="amount" defaultValue="1000.00" />
        Customer Details
        <input type="text" name="first_name" defaultValue="Saman" />
        <input type="text" name="last_name" defaultValue="Perera" />
        <input type="text" name="email" defaultValue="samanp@gmail.com" />
        <input type="text" name="phone" defaultValue="0771234567" />
        <input type="text" name="address" defaultValue="No.1, Galle Road" />
        <input type="text" name="city" defaultValue="Colombo" />
        <input type="hidden" name="country" value="Sri Lanka" />
        <input type="hidden" name="hash" value={hash} />
        <button>Buy Now</button>
      </form>
    </div>
  );
}

export default PayHere;
