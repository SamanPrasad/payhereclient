import { client } from "../../../service/axios";

function Checkout() {
  const handlePayment = () => {
    client
      .post("/stripe")
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
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
}

export default Checkout;
