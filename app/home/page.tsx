"use client";

import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function SurveyKhatian() {
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [type, setType] = useState("");
  const [mojaname, setMojaname] = useState("");
  const [custom, setCustom] = useState(false);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [days, setDays] = useState(1);
  const [khatianNo, setKhatianNo] = useState("");

  const [data, setData] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  // Live countdown effect
  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("surveyData");
    if (saved) setData(JSON.parse(saved));
  }, []);

  const divisions = ["ময়মনসিংহ", "সিলেট", "রংপুর", "রাজশাহী", "খুলনা", "ঢাকা"];
  const districtData: { [key: string]: string[] } = {
    ময়মনসিংহ: ["ময়মনসিংহ", "নেত্রকোনা", "শেরপুর"],
    সিলেট: ["সিলেট", "মৌলভীবাজার", "হবিগঞ্জ"],
    রংপুর: ["দিনাজপুর", "ঠাকুরগাঁও", "কুড়িগ্রাম"],
    রাজশাহী: ["সিরাজগঞ্জ", "নওগাঁ", "চাঁপাইনবাবগঞ্জ"],
    খুলনা: ["খুলনা", "যশোর", "বাগেরহাট"],
    ঢাকা: ["ঢাকা", "গাজীপুর", "নারায়ণগঞ্জ"],
  };
  const upojelas = ["সিরাজগঞ্জ সদর","কামারখন্দ","রায়গঞ্জ","তারাশ","শাহজাদপুর","বেলকুচি","চৌহালী","কাজীপুর","উল্লাপাড়া"];
  const khotianDhoron = ["সি.এস","এস.এ","আর এস","বি আর এস","নামজারী খতিয়ান"];

  const saveData = () => {
    if (!division || !district || !upazila || !type || !mojaname || !name || !mobile || !days || !khatianNo) {
      toast.error("⚠️ সব তথ্য পূরণ করুন!");
      return;
    }

    const startDate = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(startDate.getDate() + parseInt(days.toString()));

    if (editId) {
      const updated = data.map(item =>
        item.id === editId
          ? { ...item, division, district, upazila, type, mojaname, name, mobile, khatianNo, startDate: startDate.toISOString(), deliveryDate: deliveryDate.toISOString() }
          : item
      );
      setData(updated);
      localStorage.setItem("surveyData", JSON.stringify(updated));
      setEditId(null);
      toast.success("✅ ডেটা আপডেট হয়েছে!");
    } else {
      const newEntry = {
        id: Date.now(),
        division, district, upazila, type, mojaname, name, mobile, khatianNo,
        startDate: startDate.toISOString(),
        deliveryDate: deliveryDate.toISOString(),
        status: "Pending"
      };
      const updated = [...data, newEntry];
      setData(updated);
      localStorage.setItem("surveyData", JSON.stringify(updated));
      toast.success("✅ ডেটা সেভ হয়েছে!");
    }

    setDivision(""); setDistrict(""); setUpazila(""); setType(""); setMojaname(""); setCustom(false);
    setName(""); setMobile(""); setDays(1); setKhatianNo("");
  };

  const editEntry = (id: number) => {
    const entry = data.find(d => d.id === id);
    if (!entry) return;
    setDivision(entry.division); setDistrict(entry.district); setUpazila(entry.upazila);
    setType(entry.type); setMojaname(entry.mojaname); setCustom(false);
    setName(entry.name); setMobile(entry.mobile); setKhatianNo(entry.khatianNo);
    const diff = Math.ceil((new Date(entry.deliveryDate).getTime() - new Date(entry.startDate).getTime()) / (1000 * 60 * 60 * 24));
    setDays(diff);
    setEditId(id);
  };

  const deleteEntry = (id: number) => {
    if (!confirm("আপনি কি সত্যিই ডিলিট করতে চান?")) return;
    const updated = data.filter(d => d.id !== id);
    setData(updated);
    localStorage.setItem("surveyData", JSON.stringify(updated));
    toast.success("🗑️ ডেটা মুছে ফেলা হয়েছে!");
  };

  const getCountdown = (deliveryDate: string, status: string) => {
    if(status === "Delivered") return "✅ Delivered";
    const now = new Date().getTime();
    const end = new Date(deliveryDate).getTime();
    const distance = end - now;
    if(distance <= 0) return "✅ Delivered";
    const d = Math.floor(distance / (1000*60*60*24));
    const h = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
    const m = Math.floor((distance % (1000*60*60)) / (1000*60));
    const s = Math.floor((distance % (1000*60)) / 1000);
    return `${d} দিন ${h} ঘন্টা ${m} মিনিট ${s} সেকেন্ড বাকি`;
  };

  const updateStatus = (id: number, status: string) => {
    const updated = data.map(d => {
      if(d.id === id){
        if(status === "Delivered") return {...d, status};
        const now = new Date().getTime();
        const end = new Date(d.deliveryDate).getTime();
        if(end <= now) return {...d, status: "Delivered"};
        return {...d, status};
      }
      return d;
    });
    setData(updated);
    localStorage.setItem("surveyData", JSON.stringify(updated));
  };

 const filteredData = data.filter(item => {
  const searchLower = search.toLowerCase();
  return (
    (item.name && item.name.toLowerCase().includes(searchLower)) ||
    (item.mobile && item.mobile.toString().includes(searchLower)) ||
    (item.khatianNo && item.khatianNo.toString().toLowerCase().includes(searchLower))
  );
});


  const statusColor = (status: string) => {
    switch(status){
      case "Pending": return "bg-yellow-500";
      case "Working": return "bg-blue-500";
      case "Delivered": return "bg-green-500";
      default: return "bg-gray-500";
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Toaster position="top-right" />
      <header className="bg-gray-950 shadow-md py-4">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-400">📑 Survey Khatian + Delivery</h1>
        </div>
      </header>

      {/* Form */}
      <section className="max-w-6xl mx-auto mt-8 px-4">
        <div className="bg-gray-800 shadow-md rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-green-400">সার্ভে খতিয়ান ফর্ম</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select value={division} onChange={e => { setDivision(e.target.value); setDistrict(""); }} className="bg-gray-900 border border-gray-600 text-white p-2 rounded">
              <option value="">বিভাগ নির্বাচন করুন</option>
              {divisions.map(div => <option key={div}>{div}</option>)}
            </select>
            <select value={district} onChange={e => setDistrict(e.target.value)} disabled={!division} className="bg-gray-900 border border-gray-600 text-white p-2 rounded">
              <option value="">জেলা নির্বাচন করুন</option>
              {districtData[division]?.map(d => <option key={d}>{d}</option>)}
            </select>
            <select value={upazila} onChange={e => setUpazila(e.target.value)} className="bg-gray-900 border border-gray-600 text-white p-2 rounded">
              <option value="">উপজেলা/থানা নির্বাচন করুন</option>
              {upojelas.map(u => <option key={u}>{u}</option>)}
            </select>
            <select value={type} onChange={e => setType(e.target.value)} className="bg-gray-900 border border-gray-600 text-white p-2 rounded">
              <option value="">খতিয়ান ধরন</option>
              {khotianDhoron.map(t => <option key={t}>{t}</option>)}
            </select>
            <select className="bg-gray-900 border border-gray-600 text-white p-2 rounded" onChange={e => { if(e.target.value === "custom") { setCustom(true); setMojaname(""); } else { setCustom(false); setMojaname(e.target.value); } }}>
              <option value="">মৌজা নির্বাচন করুন</option>
              <option value="মৌজা-১">মৌজা-১</option>
              <option value="মৌজা-২">মৌজা-২</option>
              <option value="custom">নিজে লিখুন</option>
            </select>
            {custom && <input value={mojaname} onChange={e => setMojaname(e.target.value)} className="bg-gray-900 border border-gray-600 text-white p-2 rounded" placeholder="মৌজার নাম লিখুন" />}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="bg-gray-900 border border-gray-600 text-white p-2 rounded" placeholder="আপনার নাম"/>
            <input type="text" value={mobile} onChange={e => setMobile(e.target.value)} className="bg-gray-900 border border-gray-600 text-white p-2 rounded" placeholder="মোবাইল নাম্বার"/>
            <input type="text" value={khatianNo} onChange={e => setKhatianNo(e.target.value)} className="bg-gray-900 border border-gray-600 text-white p-2 rounded" placeholder="খতিয়ান নং"/>
            <input type="number" value={days} onChange={e => setDays(e.target.valueAsNumber)} className="bg-gray-900 border border-gray-600 text-white p-2 rounded" placeholder="ডেলিভারি কত দিন পরে"/>
          </div>

          <button onClick={saveData} className="mt-4 bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-bold">{editId ? "✏️ আপডেট করুন" : "💾 সেভ করুন"}</button>
        </div>
      </section>

      {/* Search */}
      <section className="max-w-6xl mx-auto mt-6 px-4">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} className="w-full p-2 rounded bg-gray-900 border border-gray-600 text-white" placeholder="নাম, মোবাইল বা খতিয়ান নং দিয়ে খুঁজুন"/>
      </section>

      {/* Data List */}
      <section className="max-w-6xl mx-auto mt-4 px-4 space-y-4">
        {filteredData.map(item => {
          // Auto update Delivered status
          const now = new Date().getTime();
          const deliveryTime = new Date(item.deliveryDate).getTime();
          if(item.status !== "Delivered" && now >= deliveryTime){
            updateStatus(item.id, "Delivered");
            item.status = "Delivered";
          }

          return (
            <div key={item.id} className={`bg-gray-800 p-4 rounded-lg space-y-1 border-l-4 ${statusColor(item.status)}`}>
              <p>👤 {item.name} | 📞 {item.mobile} | 📑 {item.khatianNo}</p>
              <p>📍 {item.division} - {item.district} - {item.upazila}</p>
              <p>📑 {item.type} | মৌজা: {item.mojaname}</p>
              <p>🗓️ সেভের তারিখ: {new Date(item.startDate).toLocaleString("bn-BD")}</p>
              <p>🚚 ডেলিভারি তারিখ: {new Date(item.deliveryDate).toLocaleString("bn-BD")}</p>
              <p className="text-green-400 font-bold">⏳ {getCountdown(item.deliveryDate, item.status)}</p>
              <p>📌 Status:
                <select value={item.status} onChange={e => updateStatus(item.id, e.target.value)} className="bg-gray-900 border border-gray-600 text-white px-2 py-1 rounded ml-2">
                  <option value="Pending">Pending</option>
                  <option value="Working">Working</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </p>
              <div className="flex gap-4 mt-2">
                <button onClick={() => editEntry(item.id)} className="bg-yellow-500 px-3 py-1 rounded font-semibold">✏️ Edit</button>
                <button onClick={() => deleteEntry(item.id)} className="bg-red-600 px-3 py-1 rounded font-semibold">🗑️ Delete</button>
              </div>
            </div>
          )
        })}
        {filteredData.length === 0 && <p className="text-gray-400 text-center">কোনও ডেটা পাওয়া যায়নি।</p>}
      </section>
    </main>
  );
}







// "use client";
// import React, { useState, useEffect } from "react";

// interface Order {
//   id: number;
//   name: string;
//   mobile: string;
//   orderDate: string;
//   deliveryDays: number;
//   deliveryDate: string;
// }

// export default function OrderSaver() {
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [orderDate, setOrderDate] = useState("");
//   const [deliveryDays, setDeliveryDays] = useState(0);
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [timer, setTimer] = useState<{ [key: number]: string }>({});

//   // LocalStorage থেকে ডাটা লোড
//   useEffect(() => {
//     const saved = localStorage.getItem("orders");
//     if (saved) {
//       setOrders(JSON.parse(saved));
//     }
//   }, []);

//   // LocalStorage এ সেভ
//   useEffect(() => {
//     localStorage.setItem("orders", JSON.stringify(orders));
//   }, [orders]);

//   // কাউন্টডাউন ক্যালকুলেশন
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newTimers: { [key: number]: string } = {};
//       orders.forEach((order) => {
//         const now = new Date().getTime();
//         const deliveryTime = new Date(order.deliveryDate).getTime();
//         const diff = deliveryTime - now;

//         if (diff > 0) {
//           const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//           const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//           const minutes = Math.floor((diff / (1000 * 60)) % 60);
//           const seconds = Math.floor((diff / 1000) % 60);
//           newTimers[order.id] = `${days}দিন ${hours}ঘণ্টা ${minutes}মিনিট ${seconds}সেকেন্ড`;
//         } else {
//           newTimers[order.id] = "ডেলিভারি সম্পন্ন ✅";
//         }
//       });
//       setTimer(newTimers);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [orders]);

//   // অর্ডার যোগ করা
//   const addOrder = () => {
//     if (!name || !mobile || !orderDate || !deliveryDays) return;

//     const deliveryDate = new Date(orderDate);
//     deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);

//     const newOrder: Order = {
//       id: Date.now(),
//       name,
//       mobile,
//       orderDate,
//       deliveryDays,
//       deliveryDate: deliveryDate.toISOString(),
//     };

//     setOrders([...orders, newOrder]);
//     setName("");
//     setMobile("");
//     setOrderDate("");
//     setDeliveryDays(0);
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg space-y-4">
//       <h2 className="text-xl font-bold text-center">📦 অর্ডার সেভ সিস্টেম</h2>

//       <input
//         type="text"
//         placeholder="নাম লিখুন"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="w-full p-2 rounded bg-gray-800 border border-gray-600"
//       />
//       <input
//         type="text"
//         placeholder="মোবাইল নাম্বার লিখুন"
//         value={mobile}
//         onChange={(e) => setMobile(e.target.value)}
//         className="w-full p-2 rounded bg-gray-800 border border-gray-600"
//       />
//       <input
//         type="date"
//         value={orderDate}
//         onChange={(e) => setOrderDate(e.target.value)}
//         className="w-full p-2 rounded bg-gray-800 border border-gray-600"
//       />
//       <input
//         type="number"
//         placeholder="কতদিন পর ডেলিভারি"
//         value={deliveryDays || ""}
//         onChange={(e) => setDeliveryDays(Number(e.target.value))}
//         className="w-full p-2 rounded bg-gray-800 border border-gray-600"
//       />

//       <button
//         onClick={addOrder}
//         className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-bold"
//       >
//         ✅ সেভ করুন
//       </button>

//       <h3 className="text-lg font-semibold mt-4">📋 অর্ডার লিস্ট</h3>
//       <ul className="space-y-3">
//         {orders.map((order) => (
//           <li
//             key={order.id}
//             className="p-3 bg-gray-800 rounded border border-gray-700"
//           >
//             <p>👤 নাম: {order.name}</p>
//             <p>📞 মোবাইল: {order.mobile}</p>
//             <p>🗓️ অর্ডারের তারিখ: {order.orderDate}</p>
//             <p>🚚 ডেলিভারি দিন: {order.deliveryDays} দিন</p>
//             <p>⏳ বাকি সময়: {timer[order.id]}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

