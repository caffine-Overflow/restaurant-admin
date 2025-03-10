import React, { useState, useEffect, useRef } from "react";

import {
  addMenuItem,
  editMenuItem,
  deleteMenuItem,
  getMenuItems,
} from "./menuServices";
import axios from "axios";
import "./MenuManagement.css";

import Layout from "../Layout/Layout";

const MenuManagement = () => {
  const [menu, setMenu] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "",
    imageURL: "",
  });
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  // Ref for file input
  const fileInputRef = useRef(null);

  // Predefined categories
  const categories = [
    "Starters",
    "Main Course",
    "Fast Food",
    "Desserts",
    "Beverages",
    "Healthy & Diet Food",
  ];

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const menuItems = await getMenuItems();
      setMenu(menuItems);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "photos");
    formData.append("cloud_name", "dmnh2kmwh");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dmnh2kmwh/image/upload",
        formData
      );

      if (response.status === 200) {
        const imageUrl = response.data.secure_url;
        setImageUrl(imageUrl);
        setNewItem((prevItem) => ({ ...prevItem, imageURL: imageUrl }));
        alert("✅ Image uploaded successfully!");

        // Clear file input field
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setImage(null);
      } else {
        alert("⚠️ Upload failed. Unexpected response from Cloudinary.");
      }
    } catch (error) {
      alert("⚠️ Upload failed. Check your Cloudinary settings.");
    }
  };

  const handleAdd = async () => {
    if (
      !newItem.name ||
      !newItem.price ||
      !newItem.category ||
      !newItem.imageURL
    ) {
      alert("Please fill all fields and upload an image!");
      return;
    }

    try {
      await addMenuItem(newItem);
      setNewItem({ name: "", price: "", category: "", imageURL: "" });
      setImageUrl("");
      fetchMenu();
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const updatedData = { name: "Updated Item", price: 350 };
      await editMenuItem(id, updatedData);
      fetchMenu();
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMenuItem(id);
      fetchMenu();
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  return (
    <Layout>
      <div className="menu-management-container">
        <h2>Menu Management</h2>

        <div className="menu-form">
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="number"
            name="price"
            value={newItem.price}
            onChange={handleChange}
            placeholder="Price"
          />

          <select
            name="category"
            value={newItem.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input type="file" ref={fileInputRef} onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
        </div>

        {imageUrl && (
          <div className="uploaded-image">
            <h3>Uploaded Image:</h3>
            <img src={imageUrl} alt="Uploaded" width="200px" />
          </div>
        )}

        <button className="add-menu" onClick={handleAdd}>
          Add Menu Item
        </button>

        {categories.map((cat) => (
          <div key={cat} className="category-section">
            <h3>{cat}</h3>
            <ul className="menu-list">
              {menu
                .filter((item) => item.category === cat)
                .map((item) => (
                  <li key={item.id}>
                    <img src={item.imageURL} alt={item.name} width="50" />
                    <div className="menu-item-info">
                      {item.name} - ₹{item.price} ({item.category})
                    </div>
                    <div className="menu-item-actions">
                      <button
                        className="edit"
                        onClick={() => handleEdit(item.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default MenuManagement;
