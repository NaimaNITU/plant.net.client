import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const PurchaseModal = ({ closeModal, isOpen, plant, user }) => {
  const { name, category, price, quantity } = plant || {};

  const [selectedQty, setSelectedQty] = useState("1"); // keep as string

  const handleQtyChange = (e) => {
    const value = e.target.value;
    // Allow only digits or empty string
    if (/^\d*$/.test(value)) {
      setSelectedQty(value);
    }
  };

  // Convert string to number for calculation, fallback to 0
  const numericQty = parseInt(selectedQty) || 0;
  const totalPrice = numericQty * price;

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
                max={quantity}
                value={selectedQty}
                onChange={handleQtyChange}
                className="border border-gray-300 px-2 py-1 rounded-md w-1/2"
                placeholder="Select order quantity"
              />
            </div>

            <hr />

            <div className="mt-4">
              <p className="text-sm font-medium">Order Info:</p>
              <p className="text-sm text-green-500">
                Selected Quantity: {numericQty}
              </p>
              <p className="text-sm text-green-500">
                Total Price: ${totalPrice}
              </p>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PurchaseModal;
