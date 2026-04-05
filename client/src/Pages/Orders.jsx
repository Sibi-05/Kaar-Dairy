import React, { useEffect, useState } from "react";
import "./Orders.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null); // Track open invoice

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5006/api/customer/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setOrders(data.reverse());
    } catch (error) {
      console.log("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="invoice-page">
      <header className="invoice-main-header">
        <h1>ORDER ARCHIVE</h1>
        <p>STATEMENT OF TRANSACTIONS</p>
      </header>

      <div className="orders-list">
        {loading ? (
          <div className="status">SYNCING DATA...</div>
        ) : (
          orders.map((order) => (
            <div key={order.orderId} className={`invoice-item ${expandedOrder === order.orderId ? 'is-open' : ''}`}>
              
              {/* The "Closed" Row */}
              <div className="invoice-summary" onClick={() => toggleOrder(order.orderId)}>
                <div className="col">
                  <small>DATE</small>
                  <span className="dat">{new Date(order.orderDate).toLocaleDateString()}</span>
                </div>
                <div className="col">
                  <small>REF NO.</small>
                  <span className="mono">INV-00{order.orderId}</span>
                </div>
                <div className="col">
                  <small>AMOUNT</small>
                  <span className="bold">₹{order.totalAmount}</span>
                </div>
                <div className="col text-right">
                  <button className="expand-btn">
                    {expandedOrder === order.orderId ? "CLOSE" : "VIEW INVOICE"}
                  </button>
                </div>
              </div>

              {/* The "Expanded" Invoice Detail */}
              {/* The "Expanded" Invoice Detail */}
{expandedOrder === order.orderId && (
  <div className="invoice-detail">
    <div className="detail-header">
      <h3>INVOICE BREAKDOWN</h3>
    </div>
    <table className="detail-table">
      <thead>
        <tr>
          <th>DESCRIPTION</th>
          <th className="text-center">QTY</th>
          <th className="text-right">UNIT PRICE</th>
          <th className="text-right">TOTAL</th>
        </tr>
      </thead>
      <tbody>
        {JSON.parse(order.productsJson || "[]").map((item, index) => (
          <tr key={index}>
            <td className="item-name-cell">
              {item.name}
            </td>
            <td className="text-center mono">
              {item.quantity}
            </td>
            <td className="text-center mono">
              ₹{item.price}
            </td>
            <td className="text-center mono bold">
              ₹{item.price * item.quantity}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="footer-border-top">
          <td colSpan="3" className="text-right bold label-total">NET AMOUNT:</td>
          <td className="text-right bold mono grand-total-cell">₹{order.totalAmount}</td>
        </tr>
      </tfoot>
    </table>
  </div>
)}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersPage;