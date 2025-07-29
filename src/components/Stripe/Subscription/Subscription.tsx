import axios from "axios";
import { client } from "../../../service/axios";

function Subscription() {
  const handleSubscription = () => {
    client
      .post("/stripe/subscription/checkout")
      .then((res) => {
        const url = res.data;
        window.location.href = url;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Subscription</h1>
      <button onClick={handleSubscription}>Subscription Pay</button>
    </div>
  );
}

export default Subscription;
