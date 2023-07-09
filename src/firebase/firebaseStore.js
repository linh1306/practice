import { toast } from "react-toastify";
import { storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

export const uploadImage = async (file) => {
  const storageRef = ref(storage, `/imgs/${uuidv4()}`,);

  uploadBytes(storageRef, file)
  try {
    const storageRef = ref(storage, `/imgs/${uuidv4()}`);
    await uploadBytes(storageRef, file);
    const urlImg = await getDownloadURL(storageRef);
    toast.success('Tải hình ảnh lên thành công', {
      position: "top-right",
      autoClose: 3000
    });
    console.log(urlImg);
    return urlImg;
  } catch (error) {
    toast.error('Đã xảy ra lỗi trong quá trình tải lên hình ảnh', {
      position: "top-right",
      autoClose: 3000
    });
    console.log('Lỗi tải lên hình ảnh:', error);
    throw error;
  }
}