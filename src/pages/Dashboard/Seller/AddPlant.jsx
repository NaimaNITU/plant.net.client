import axios from "axios";
import AddPlantForm from "../../../components/Form/AddPlantForm";
import { imageUpload } from "../../../reuseable/utlis";

const AddPlant = () => {
  const handleAddPlantForm = async (event) => {
    event.preventDefault();
    const form = event.target;
    const category = form.category.value;
    const description = form.description.value;
    const price = form.price.value;
    const quantity = form.quantity.value;
    const image = form.image.files[0];

    const imgUrl = await imageUpload(image);
    const plantData = { category, description, price, quantity, image: imgUrl };

    console.table(plantData);
  };
  return (
    <div>
      {/* Form */}
      <AddPlantForm handleAddPlantForm={handleAddPlantForm} />
    </div>
  );
};

export default AddPlant;
