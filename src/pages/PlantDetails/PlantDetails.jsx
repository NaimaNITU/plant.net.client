import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import { useState } from "react";
import { useLoaderData } from "react-router";
import useAuth from "./../../hooks/useAuth";

const PlantDetails = () => {
  const { user } = useAuth();
  let [isOpen, setIsOpen] = useState(false);
  const clickedPlant = useLoaderData();
  // here if anyone tries to access this page without clicking on a plant or if they type wrong url we can handle this like if(!clickedPlant || typeof clickedPlant !== "object")
  if (!clickedPlant || typeof clickedPlant !== "object")
    return <div className="text-center">No plant found in this page</div>;

  const { name, category, description, price, image, seller, quantity } =
    clickedPlant || {};
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12">
        {/* Header */}
        <div className="flex flex-col gap-6 flex-1">
          <div>
            <div className="w-full overflow-hidden rounded-xl">
              <img
                className="object-cover w-full h-[440px]"
                src={image}
                alt="header image"
              />
            </div>
          </div>
        </div>
        <div className="md:gap-10 flex-1">
          {/* Plant Info */}
          <Heading title={name} subtitle={`Category: ${category}`} />
          <hr className="my-6" />
          <div
            className="
          text-lg font-light text-neutral-500"
          >
            {description}
          </div>
          <hr className="my-6" />

          <div
            className="
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              "
          >
            <div>Seller: {seller.name}</div>

            <img
              className="rounded-full"
              height="30"
              width="30"
              alt="Avatar"
              referrerPolicy="no-referrer"
              src={seller.image}
            />
          </div>
          <hr className="my-6" />
          <div>
            <p
              className="
                gap-4 
                font-light
                text-neutral-500
              "
            >
              Quantity: {quantity} Left Only!
            </p>
          </div>
          <hr className="my-6" />
          <div className="flex justify-between">
            <p className="font-bold text-3xl text-gray-500">Price: {price}$</p>
            <div>
              <Button
                disabled={!user}
                onClick={() => setIsOpen(true)}
                label={user ? "Buy Now" : "Login To Buy"}
              />
            </div>
          </div>
          <hr className="my-6" />

          <PurchaseModal
            user={user}
            plant={clickedPlant}
            closeModal={closeModal}
            isOpen={isOpen}
          />
        </div>
      </div>
    </Container>
  );
};

export default PlantDetails;
