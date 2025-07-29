import axios from "axios";

function Subscription() {
  const handleSubscription = async () => {
    const result = await axios.post("/stripe/subscription/checkout");

    const url = result.data;
    window.location.href = url;
  };

  return (
    <div>
      <h1>Subscription</h1>
      <button onClick={handleSubscription}>Subscription Pay</button>
    </div>
  );
}

export default Subscription;
