import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router";

const Card = ({ plant, setPlants }) => {
  const { _id, name, description, category, quantity, price, image } =
    plant || {};

  const handleDelate = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/plants/${id}`
      );
      if (res.data.deletedCount > 0) {
        toast.success("Deleted successfully");

        //  Remove deleted plant from UI
        setPlants((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error("Deletion failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <div>
        <Link
          to={`/plants/${_id}`}
          className="col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl"
        >
          <div className="flex flex-col gap-2 w-full">
            <div
              className="
              aspect-square 
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
            "
            >
              <img
                className="
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition
              "
                src={image}
                alt="Plant Image"
              />
              <div
                className="
              absolute
              top-3
              right-3
            "
              ></div>
            </div>
            <div className="font-semibold text-lg">Name: {name}</div>
            <div className="font-semibold text-lg">Category: {category}</div>
            <div className="font-semibold text-lg">Quantity: {quantity}</div>
            <div className="flex flex-row items-center gap-1">
              <div className="font-semibold"> Price: {price}$</div>
            </div>
          </div>
        </Link>
        <div className="flex flex-row items-center justify-between">
          <button className="btn ">Edit</button>
          <button onClick={() => handleDelate(_id)} className="btn btn-primary">
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
