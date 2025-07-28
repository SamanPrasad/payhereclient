import axios from "axios";
import { useEffect, useState } from "react";

function PayHere() {
  const [hash, setHash] = useState<string | undefined>(undefined);

  useEffect(() => {
    axios
      .post("https://testnext-five-sigma.vercel.app/api/payhere")
      .then((res) => {
        console.log(res);
        setHash(res.data);
        console.log("hash", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!hash) return <p>Loading...</p>;

  return (
    <div>
      <h1>PayHere</h1>
      <form action="https://sandbox.payhere.lk/pay/checkout" method="post">
        <input type="text" name="merchant_id" value="1231349" />
        <input
          type="text"
          name="return_url"
          value="https://payhereclient.vercel.app/"
        />
        <input
          type="text"
          name="cancel_url"
          value="https://payhereclient.vercel.app/"
        />
        <input
          type="text"
          name="notify_url"
          value="https://testnext-five-sigma.vercel.app/api/payhere/webhook"
        />
        <h4>Item Details</h4>
        <input type="text" name="order_id" defaultValue="12345" />
        <input type="text" name="items" defaultValue="Door bell wireless" />
        <input type="text" name="currency" defaultValue="LKR" />
        <input type="text" name="amount" defaultValue="1000" />
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
