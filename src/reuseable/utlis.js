import axios from "axios";

//upload image and return img url from imgbb
export const imageUpload = async (imageData) => {
  const imageForm = new FormData();
  imageForm.append("image", imageData);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    imageForm
  );
  return data.data.display_url;
};
