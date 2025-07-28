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
        <input type="hidden" name="merchant_id" value="1231349" />
        <input
          type="hidden"
          name="return_url"
          value="https://payhereclient.vercel.app/"
        />
        <input
          type="hidden"
          name="cancel_url"
          value="https://testnext-five-sigma.vercel.app/payhere/calcel"
        />
        <input
          type="hidden"
          name="notify_url"
          value="https://testnext-five-sigma.vercel.app/api/payhere/webhook"
        />
        <h4>Item Details</h4>
        <input type="hidden" name="order_id" defaultValue="12345" />
        <input type="hidden" name="items" defaultValue="Door bell wireless" />
        <input type="hidden" name="currency" defaultValue="LKR" />
        <input type="hidden" name="amount" defaultValue="1000" />
        Customer Details
        <input type="hidden" name="first_name" defaultValue="Saman" />
        <input type="hidden" name="last_name" defaultValue="Perera" />
        <input type="hidden" name="email" defaultValue="samanp@gmail.com" />
        <input type="hidden" name="phone" defaultValue="0771234567" />
        <input type="hidden" name="address" defaultValue="No.1, Galle Road" />
        <input type="hidden" name="city" defaultValue="Colombo" />
        <input type="hidden" name="country" value="Sri Lanka" />
        <input type="hidden" name="hash" value={hash} />
        <button>Buy Now</button>
      </form>
    </div>
  );
}

export default PayHere;
