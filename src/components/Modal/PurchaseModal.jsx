import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const PurchaseModal = ({ closeModal, isOpen, plant, user }) => {
  // console.log(user);
  // Total Price Calculation
  const { name, category, price, quantity } = plant || {};

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none "
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center leading-6 text-gray-900"
            >
              Review Info Before Purchase
            </DialogTitle>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Plant: {name}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Category: {category}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Customer: {user?.displayName}
              </p>
            </div>

            <div className="mt-2">
              <p className="text-sm text-gray-500">Price per unit: $ {price}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Available Quantity: {quantity}
              </p>
            </div>
            <div className="my-2">
              <input
                type="number"
                min={1}
                max={quantity}
                className="border border-gray-300 px-2  rounded-md w-1/2"
                placeholder="Select order quantity"
              />
            </div>

            <hr />
            <p className="mt-6 text-sm ">Order Info:</p>
            <div>
              <p className="text-sm text-green-500">
                Selected Quantity: {quantity}
              </p>
            </div>
            <div>
              <p className="text-sm text-green-500">Total price: {quantity}</p>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PurchaseModal;
