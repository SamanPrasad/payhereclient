import axios from "axios";

function Subscription() {
  const handleSubscription = () => {
    axios
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
