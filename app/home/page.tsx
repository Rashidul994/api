"use client";
import React, { useState, useEffect } from "react";

interface Order {
  id: number;
  name: string;
  mobile: string;
  orderDate: string;
  deliveryDays: number;
  deliveryDate: string;
}

export default function OrderSaver() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [deliveryDays, setDeliveryDays] = useState(0);
  const [orders, setOrders] = useState<Order[]>([]);
  const [timer, setTimer] = useState<{ [key: number]: string }>({});

  // LocalStorage থেকে ডাটা লোড
  useEffect(() => {
    const saved = localStorage.getItem("orders");
    if (saved) {
      setOrders(JSON.parse(saved));
    }
  }, []);

  // LocalStorage এ সেভ
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // কাউন্টডাউন ক্যালকুলেশন
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers: { [key: number]: string } = {};
      orders.forEach((order) => {
        const now = new Date().getTime();
        const deliveryTime = new Date(order.deliveryDate).getTime();
        const diff = deliveryTime - now;

        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          const seconds = Math.floor((diff / 1000) % 60);
          newTimers[order.id] = `${days}দিন ${hours}ঘণ্টা ${minutes}মিনিট ${seconds}সেকেন্ড`;
        } else {
          newTimers[order.id] = "ডেলিভারি সম্পন্ন ✅";
        }
      });
      setTimer(newTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [orders]);

  // অর্ডার যোগ করা
  const addOrder = () => {
    if (!name || !mobile || !orderDate || !deliveryDays) return;

    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);

    const newOrder: Order = {
      id: Date.now(),
      name,
      mobile,
      orderDate,
      deliveryDays,
      deliveryDate: deliveryDate.toISOString(),
    };

    setOrders([...orders, newOrder]);
    setName("");
    setMobile("");
    setOrderDate("");
    setDeliveryDays(0);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg space-y-4">
      <h2 className="text-xl font-bold text-center">📦 অর্ডার সেভ সিস্টেম</h2>

      <input
        type="text"
        placeholder="নাম লিখুন"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 border border-gray-600"
      />
      <input
        type="text"
        placeholder="মোবাইল নাম্বার লিখুন"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 border border-gray-600"
      />
      <input
        type="date"
        value={orderDate}
        onChange={(e) => setOrderDate(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 border border-gray-600"
      />
      <input
        type="number"
        placeholder="কতদিন পর ডেলিভারি"
        value={deliveryDays || ""}
        onChange={(e) => setDeliveryDays(Number(e.target.value))}
        className="w-full p-2 rounded bg-gray-800 border border-gray-600"
      />

      <button
        onClick={addOrder}
        className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-bold"
      >
        ✅ সেভ করুন
      </button>

      <h3 className="text-lg font-semibold mt-4">📋 অর্ডার লিস্ট</h3>
      <ul className="space-y-3">
        {orders.map((order) => (
          <li
            key={order.id}
            className="p-3 bg-gray-800 rounded border border-gray-700"
          >
            <p>👤 নাম: {order.name}</p>
            <p>📞 মোবাইল: {order.mobile}</p>
            <p>🗓️ অর্ডারের তারিখ: {order.orderDate}</p>
            <p>🚚 ডেলিভারি দিন: {order.deliveryDays} দিন</p>
            <p>⏳ বাকি সময়: {timer[order.id]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

