import axios from "axios";
import AddPlantForm from "../../../components/Form/AddPlantForm";
import { imageUpload } from "../../../reuseable/utlis";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";

const AddPlant = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useAuth();

  const handleAddPlantForm = async (event) => {
    event.preventDefault();
    setIsUploading(true);
    const form = event.target;
    const name = form.name.value;
    const category = form.category.value;
    const description = form.description.value;
    const price = form.price.value;
    const quantity = form.quantity.value;
    const image = form.image.files[0];

    try {
      const imgUrl = await imageUpload(image);
      const plantData = {
        name,
        category,
        description,
        price,
        quantity,
        image: imgUrl,

        //though the plant is added by seller, we need to add the seller details
        seller: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
      };

      //now send the data to database
      await axios.post(`${import.meta.env.VITE_API_URL}/add-plant`, plantData);
      toast.success("Plant added successfully........yeeh!");
      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      {/* Form */}
      <AddPlantForm
        handleAddPlantForm={handleAddPlantForm}
        isUploading={isUploading}
      />
    </div>
  );
};

export default AddPlant;
