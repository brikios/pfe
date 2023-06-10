import axios from "axios";

export const uploadCloudinary=async(file)=>{
    const formData = new FormData()
    formData.append('file',file)
    formData.append('upload_preset',"mouadh") 
    const response = await fetch(
        "https://api.cloudinary.com/v1_1/dlbqzfpoh/image/upload/",
        {
          method: "post",
          body: formData,
        }
    )
    if (!response.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }
      const data = await response.json();
      //console.log(data)
      return data
}