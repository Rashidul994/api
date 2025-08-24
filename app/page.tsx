'use client';

import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function SurveyKhatian() {


 const [division, setDivision] = useState ('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [type, setType] = useState('');
  const [mouza, setMouza] = useState('');

  const divisions = ['ময়মনসিংহ', 'সিলেট', 'রংপুর', 'রাজশাহী', 'খুলনা', 'ঢাকা'];

  const districtData: { [key: string]: string[] } = {
    ময়মনসিংহ: ['ময়মনসিংহ', 'নেত্রকোনা', 'শেরপুর'],
    সিলেট: ['সিলেট', 'মৌলভীবাজার', 'হবিগঞ্জ'],
    রংপুর: ['দিনাজপুর', 'ঠাকুরগাঁও', 'কুড়িগ্রাম'],
    রাজশাহী: ['সিরাজগঞ্জ', 'নওগাঁ', 'চাঁপাইনবাবগঞ্জ'],
    খুলনা: ['খুলনা', 'যশোর', 'বাগেরহাট'],
    ঢাকা: ['ঢাকা', 'গাজীপুর', 'নারায়ণগঞ্জ'],
  };

  
  const upojelas = [
  '  সিরাজগঞ্জ সদর ',

  'কামারখন্দ ',

' রায়গঞ্জ ',

 ' তারাশ ',

 ' শাহজাদপুর ',

' বেলকুচি ',

' চৌহালী ',

 'কাজীপুর ',

 'উল্লাপাড়া ',

];



  const khotianDhoron = [
  ' সি.এস  ',

  'এস.এ ',

' আর এস ',

 'বি আর এস ',

 ' নামজারী খতিয়ান ',


];



const districtData125: { [key: string]: string[] } = {
    সিরাজগঞ্জ: ['ময়মনসিংহ', 'নেত্রকোনা', 'শেরপুর'],
    সিলেট: ['সিলেট', 'মৌলভীবাজার', 'হবিগঞ্জ'],
    রংপুর: ['দিনাজপুর', 'ঠাকুরগাঁও', 'কুড়িগ্রাম'],
    রাজশাহী: ['রাজশাহী', 'নওগাঁ', 'চাঁপাইনবাবগঞ্জ'],
    খুলনা: ['খুলনা', 'যশোর', 'বাগেরহাট'],
    ঢাকা: ['ঢাকা', 'গাজীপুর', 'নারায়ণগঞ্জ'],
  };



  const handleSubmit = () => {
    if (!division || !district || !upazila || !type || !mouza) {
      alert('অনুগ্রহ করে সকল তথ্য পূরণ করুন!');
      return;
    }

    alert(`🔍 খোঁজা হচ্ছে: 
    বিভাগ: ${division}
    জেলা: ${district}
    উপজেলা: ${upazila}
    ধরন: ${type}
    মৌজা: ${mouza}`);

  };


















  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleSearch = () => {
    toast.success('অনুসন্ধান সম্পন্ন হয়েছে ✅');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header */}
      <header className="bg-gray-950 shadow-md py-4">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-400">📑 Survey Khatian</h1>
          <div className="space-x-4">
            <button onClick={() => setShowLogin(true)} className="bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded text-white text-sm font-semibold">Login</button>
            <button onClick={() => setShowRegister(true)} className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded text-white text-sm font-semibold">Register</button>
          </div>
        </div>
      </header>

      {/* Notice */}
      <section className="max-w-6xl mx-auto px-4 mt-4">
        <p className="bg-red-600 text-white px-4 py-2 rounded shadow">⚠️ আপনার জমির সঠিক তথ্য যাচাই করে নিবন্ধন করুন।</p>
      </section>

      {/* Survey Form */}
      <section className="max-w-6xl mx-auto mt-8 px-4">
        <div className="bg-gray-800 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-green-400 mb-6">সার্ভে খতিয়ানের তথ্য</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

             <select
                value={division}
                onChange={(e) => {
                  setDivision(e.target.value);
                  setDistrict('');
                }}
                className="bg-gray-900 border border-gray-600 text-white p-2 rounded"
              >
                <option value="">বাছাই করুন</option>
                {divisions.map((div) => (
                  <option key={div} value={div}>
                    {div}
                  </option>
                ))}
              </select>

             {/* <select
            value={division}
            onChange={(e) => {
              setDivision(e.target.value)
              setDistrict('')
            }}
          className="bg-gray-900 border border-gray-600 text-white p-2 rounded"
          >

            <option value="">বিভাগ নির্বাচন করুন</option>
            {divisions.map((div) => (
              <option key={div} value={div}>{div}</option>
            ))}
          </select> */}



           






             <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                disabled={!division}
               className="bg-gray-900 border border-gray-600 text-white p-2 rounded"
              >
                
             <option>জেলা</option>

                {districtData[division]?.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>




           
        
      <select
                value={division}
                onChange={(e) => {
                  setDivision(e.target.value);
                  setDistrict('');
                }}
                className="bg-gray-900 border border-gray-600 text-white p-2 rounded"
              >
                <option value="">থানা</option>
                {upojelas.map((div) => (
                  <option key={div} value={div}>
                    {div}
                  </option>
                ))}
              </select>




                <select
                value={division}
                onChange={(e) => {
                  setDivision(e.target.value);
                  setDistrict('');
                }}
                className="bg-gray-900 border border-gray-600 text-white p-2 rounded"
              >
                <option value="">খতিয়ান ধরন</option>
                {khotianDhoron.map((div) => (
                  <option key={div} value={div}>
                    {div}
                  </option>
                ))}
              </select>

 


            <select className="bg-gray-900 border border-gray-600 text-white p-2 rounded"> <option>মৌজা</option> </select>
          </div>

          <button
            onClick={handleSearch}
            className="mt-6 w-full md:w-auto bg-green-600 hover:bg-green-700 transition px-6 py-2 rounded shadow text-white font-semibold">
            🔍 অনুসন্ধান করুন
          </button>
        </div>
      </section>

      {/* Scroll to top button */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 p-3 rounded-full text-white shadow-lg">
        ⬆️
      </button>

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">🔐 Login</h3>
              <input type="email" placeholder="Email" className="w-full mb-3 p-2 rounded bg-gray-800 text-white" />
              <input type="password" placeholder="Password" className="w-full mb-4 p-2 rounded bg-gray-800 text-white" />
              <div className="flex justify-end space-x-2">
                <button onClick={() => setShowLogin(false)} className="text-gray-400 hover:text-white">Cancel</button>
                <button onClick={() => { toast.success('Login Success ✅'); setShowLogin(false); }} className="bg-green-600 px-4 py-2 rounded">Login</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Register Modal */}
      <AnimatePresence>
        {showRegister && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">📝 Register</h3>
              <input type="text" placeholder="Name" className="w-full mb-3 p-2 rounded bg-gray-800 text-white" />
              <input type="email" placeholder="Email" className="w-full mb-3 p-2 rounded bg-gray-800 text-white" />
              <input type="password" placeholder="Password" className="w-full mb-4 p-2 rounded bg-gray-800 text-white" />
              <div className="flex justify-end space-x-2">
                <button onClick={() => setShowRegister(false)} className="text-gray-400 hover:text-white">Cancel</button>
                <button onClick={() => { toast.success('Registration Complete 🎉'); setShowRegister(false); }} className="bg-blue-600 px-4 py-2 rounded">Register</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}









// 'use client';

// import { useState } from 'react';
// import { ChevronDown, Search } from 'lucide-react';


// export default function SurveyKhatianPage() {
//   const [division, setDivision] = useState ('');
//   const [district, setDistrict] = useState('');
//   const [upazila, setUpazila] = useState('');
//   const [type, setType] = useState('');
//   const [mouza, setMouza] = useState('');

//   const divisions = ['ময়মনসিংহ', 'সিলেট', 'রংপুর', 'রাজশাহী', 'খুলনা', 'ঢাকা'];

//   const districtData: { [key: string]: string[] } = {
//     ময়মনসিংহ: ['ময়মনসিংহ', 'নেত্রকোনা', 'শেরপুর'],
//     সিলেট: ['সিলেট', 'মৌলভীবাজার', 'হবিগঞ্জ'],
//     রংপুর: ['দিনাজপুর', 'ঠাকুরগাঁও', 'কুড়িগ্রাম'],
//     রাজশাহী: ['রাজশাহী', 'নওগাঁ', 'চাঁপাইনবাবগঞ্জ'],
//     খুলনা: ['খুলনা', 'যশোর', 'বাগেরহাট'],
//     ঢাকা: ['ঢাকা', 'গাজীপুর', 'নারায়ণগঞ্জ'],
//   };

//   const handleSubmit = () => {
//     if (!division || !district || !upazila || !type || !mouza) {
//       alert('অনুগ্রহ করে সকল তথ্য পূরণ করুন!');
//       return;
//     }

//     alert(`🔍 খোঁজা হচ্ছে: 
//     বিভাগ: ${division}
//     জেলা: ${district}
//     উপজেলা: ${upazila}
//     ধরন: ${type}
//     মৌজা: ${mouza}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-green-800 text-white py-4 px-6 shadow">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <h1 className="text-xl font-bold">ভূমি সেবা পোর্টাল</h1>
//           <button
//             onClick={() => window.location.href = "/login"}
//             className="bg-white text-green-800 px-4 py-1 rounded hover:bg-gray-200"
//           >
//             লগইন
//           </button>
//         </div>
//       </header>

//       {/* Service Tabs */}
//       <section className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//         {['সার্ভে খতিয়ান', 'নামজারি খতিয়ান', 'মৌজা ম্যাপ', 'আবেদনের অবস্থান', 'নির্দেশিকা'].map((item, idx) => (
//           <div
//             key={idx}
//             className="bg-white border-2 border-green-600 text-center py-6 rounded-lg cursor-pointer hover:bg-green-600 hover:text-white transition"
//           >
//             <div className="text-sm font-semibold">{item}</div>
//           </div>
//         ))}
//       </section>

//       {/* Notice */}
//       <p className="text-center text-red-600 font-semibold text-sm px-4">
//         এখন থেকে খতিয়ানের কপি আর কোড সম্পূর্ণ অনলাইন/ডাউনলোডযোগ্য কপি ১০০ টাকার বিনিময়ে পাওয়া যাবে। এছাড়াও সার্টিফাইড/সত্যায়িত খতিয়ান রেজিস্ট্রি অফিসে পাওয়া যাবে।
//       </p>

//       {/* Form */}
//     <section className="max-w-6xl mx-auto mt-8 px-4">
//   <div className="bg-gray-900 shadow-md rounded-lg p-6">
//     <h2 className="text-xl font-bold text-green-400 mb-6">📄 সার্ভে খতিয়ানের তথ্য</h2>

//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {/* বিভাগ */}
//             <div>
//               <label className="block mb-1 font-semibold">বিভাগ</label>
//               <select
//                 value={division}
//                 onChange={(e) => {
//                   setDivision(e.target.value);
//                   setDistrict('');
//                 }}
//                 className="w-full bg-gray-900 border border-gray-300 rounded px-3 py-2"
//               >
//                 <option value="">বাছাই করুন</option>
//                 {divisions.map((div) => (
//                   <option key={div} value={div}>
//                     {div}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* জেলা */}
//             <div>
//               <label className="block  mb-1 font-semibold">জেলা</label>
//               <select
//                 value={district}
//                 onChange={(e) => setDistrict(e.target.value)}
//                 disabled={!division}
//                 className="w-full bg-gray-900 border border-gray-300 rounded px-3 py-2 "
//               >
//                 <option value="">জেলা বাছাই করুন</option>
//                 {districtData[division]?.map((d) => (
//                   <option key={d} value={d}>
//                     {d}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* উপজেলা */}
//             <div>
//               <label className="block mb-1 font-semibold">উপজেলা/থানা</label>
//               <input
//                 type="text"
//                 value={upazila}
//                 onChange={(e) => setUpazila(e.target.value)}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//                 placeholder="উপজেলা লিখুন"
//               />
//             </div>

//             {/* খতিয়ানের ধরন */}
//             <div>
//               <label className="block mb-1 font-semibold">খতিয়ানের ধরন</label>
//               <select
//                 value={type}
//                 onChange={(e) => setType(e.target.value)}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//               >
//                 <option value="">ধরন বাছাই করুন</option>
//                 <option value="cs">CS</option>
//                 <option value="sa">SA</option>
//                 <option value="rs">RS</option>
//               </select>
//             </div>

//             {/* মৌজা */}
//             <div>
//               <label className="block mb-1 font-semibold">মৌজা</label>
//               <input
//                 type="text"
//                 value={mouza}
//                 onChange={(e) => setMouza(e.target.value)}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//                 placeholder="মৌজা লিখুন"
//               />
//             </div>

//             {/* খুঁজুন */}
//             <div className="flex items-end">
//               <button
//                 onClick={handleSubmit}
//                 className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 flex items-center justify-center"
//               >
//                 <Search className="w-4 h-4 mr-2" /> খুঁজুন
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Scroll Top Button */}
//       <button
//         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//         className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg"
//       >
//         ↑
//       </button>
//     </div>
//   );
// }
