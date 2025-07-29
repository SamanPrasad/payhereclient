import "./App.css";
import PayHere from "./components/PayHere/PayHere";
import Checkout from "./components/Stripe/Checkout/Checkout";
import Subscription from "./components/Stripe/Subscription/Subscription";

function App() {
  return (
    <div style={{ backgroundColor: "#9c9c9caa", padding: "20px" }}>
      <h1>Stripe Payment Methods</h1>
      {/* <StripeProvider>
        <PaymentIntent />
      </StripeProvider>
      <PaymentElementWrapper /> */}
      <PayHere />
      <Checkout />
      <Subscription />
    </div>
  );
}

export default App;
