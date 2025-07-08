import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import toast from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Form/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const PurchaseModal = ({ closeModal, isOpen, plant, user }) => {
  const { name, category, price, quantity, _id, seller, image } = plant || {};

  const [selectedQty, setSelectedQty] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price);
  const [orderData, setOrderData] = useState({
    customer: {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    },
    seller,
    plantId: _id,
    quantity: 1,
    price: price,
    plantName: name,
    plantCategory: category,
    plantImage: image,
  });

  const handleQtyChange = (typedValue) => {
    const totalSelectedQty = parseInt(typedValue);

    if (totalSelectedQty > quantity) {
      return toast.error(
        `Only ${quantity} units available, you cannot purchase more.`
      );
    }
    if (totalSelectedQty < 1) {
      return toast.error("You cannot purchase less than 1 unit.");
    }
    const calculatedPrice = totalSelectedQty * price;
    setSelectedQty(totalSelectedQty);
    setTotalPrice(calculatedPrice);

    setOrderData((prev) => ({
      ...prev,
      quantity: totalSelectedQty,
      price: calculatedPrice,
    }));
  };

  console.log(orderData);

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md bg-white p-6 backdrop-blur-2xl shadow-xl rounded-2xl">
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center leading-6 text-gray-900"
            >
              Review Info Before Purchase
            </DialogTitle>

            <div className="mt-2 text-sm text-gray-500 space-y-1">
              <p>Plant: {name}</p>
              <p>Category: {category}</p>
              <p>Customer: {user?.displayName}</p>
              <p>Price per unit: $ {price}</p>
              <p>Available Quantity: {quantity}</p>
            </div>

            <div className="my-3">
              <input
                type="number"
                min={1}
                value={selectedQty}
                onChange={(e) => handleQtyChange(e.target.value)}
                className="border border-gray-300 px-2 py-1 rounded-md w-1/2"
                placeholder="Select order quantity"
              />
            </div>

            <hr />

            <div className="mt-4">
              <p className="text-sm font-medium">Order Info:</p>
              <p className="text-sm text-green-500">
                Selected Quantity: {selectedQty}
              </p>
              <p className="text-sm text-green-500">
                Total Price: ${totalPrice}
              </p>
            </div>

            {/* stripe component here */}
            <Elements stripe={stripePromise}>
              <CheckoutForm
                totalPrice={totalPrice}
                orderData={orderData}
                closeModal={closeModal}
              />
            </Elements>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PurchaseModal;
