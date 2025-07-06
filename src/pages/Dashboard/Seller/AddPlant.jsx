import axios from "axios";
import AddPlantForm from "../../../components/Form/AddPlantForm";

const AddPlant = () => {
  const handleAddPlantForm = async (event) => {
    event.preventDefault();
    const form = event.target;
    const category = form.category.value;
    const description = form.description.value;
    const price = form.price.value;
    const quantity = form.quantity.value;
    const image = form.image.files[0];
    const plantData = { category, description, price, quantity, image };
    console.log(plantData);

    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      image
    );
    console.log(data);
  };
  return (
    <div>
      {/* Form */}
      <AddPlantForm handleAddPlantForm={handleAddPlantForm} />
    </div>
  );
};

export default AddPlant;
