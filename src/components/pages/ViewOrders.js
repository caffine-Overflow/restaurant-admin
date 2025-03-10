import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import "./ViewOrders.css";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ordersCollection = collection(db, "orders");

    // Real-time listener for orders
    const unsubscribe = onSnapshot(ordersCollection, (snapshot) => {
      const ordersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersList);
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  const deleteOrder = async (orderId) => {
    try {
      await deleteDoc(doc(db, "orders", orderId));
      alert("Order deleted successfully!");
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order. Please try again.");
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const orderDoc = doc(db, "orders", orderId);
      await updateDoc(orderDoc, { status: newStatus });
      alert("Order status updated successfully!");
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again.");
    }
  };

  return (
    <div>
      <h2>All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p>User: {order.user}</p>
              <p>Total Amount: ₹{order.totalAmount}</p>
              <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
              <p>Status: {order.status}</p>
              <h4>Items:</h4>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.dishName} - {item.quantity} x ₹{item.price}
                  </li>
                ))}
              </ul>
              <button onClick={() => deleteOrder(order.id)}>
                Delete Order
              </button>
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewOrders;
