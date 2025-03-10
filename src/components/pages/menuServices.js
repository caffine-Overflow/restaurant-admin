import axios from "axios";
import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

// Reference to the "menu" collection in Firestore
const menuCollectionRef = collection(db, "menu");

// 📌 Add a new menu item
export const addMenuItem = async (menuItem) => {
  try {
    await addDoc(menuCollectionRef, menuItem);
    console.log("✅ Menu item added successfully!");
  } catch (error) {
    console.error("❌ Error adding menu item:", error);
  }
};

// 📌 Edit an existing menu item
export const editMenuItem = async (id, updatedData) => {
  try {
    const menuItemRef = doc(db, "menu", id);
    await updateDoc(menuItemRef, updatedData);
    console.log("✅ Menu item updated successfully!");
  } catch (error) {
    console.error("❌ Error updating menu item:", error);
  }
};

// 📌 Delete a menu item
export const deleteMenuItem = async (id) => {
  try {
    const menuItemRef = doc(db, "menu", id);
    await deleteDoc(menuItemRef);
    console.log("✅ Menu item deleted successfully!");
  } catch (error) {
    console.error("❌ Error deleting menu item:", error);
  }
};

// 📌 Get all menu items
export const getMenuItems = async () => {
  try {
    const querySnapshot = await getDocs(menuCollectionRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("❌ Error fetching menu items:", error);
    return [];
  }
};

// 📌 Upload image to Cloudinary
export const handleUpload = async (image, setImageUrl, setNewItem) => {
  if (!image) return alert("⚠️ Please select an image!");

  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "photos"); // Your Cloudinary upload preset
  formData.append("cloud_name", "dmnh2kmwh");

  console.log("Uploading Image...", formData.get("file"));

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dmnh2kmwh/image/upload", // Your Cloudinary cloud name
      formData
    );

    if (response.status === 200) {
      const imageUrl = response.data.secure_url;
      setImageUrl(imageUrl);

      setNewItem((prevItem) => ({
        ...prevItem,
        imageURL: imageUrl, // Store the URL for Firestore
      }));

      alert("Image uploaded successfully!");
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    console.error("Upload error:", error);
    alert("Upload failed. Check console for details.");
  }
};
