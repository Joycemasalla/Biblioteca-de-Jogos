// import React from 'react';
// import { Heart } from 'lucide-react';
// import Rating from '../../components/Rating/Avaliacao';

// export default function Home() {
//   const { items, toggleFavorite, updateRating } = useItems();

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {items.map((item) => (
//         <div
//           key={item.id}
//           className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
//         >
//           <img
//             src={item.image}
//             alt={item.title}
//             className="w-full h-48 object-cover"
//           />
//           <div className="p-4">
//             <div className="flex items-start justify-between">
//               <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//                 {item.title}
//               </h3>
//               <button
//                 onClick={() => toggleFavorite(item.id)}
//                 className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
//               >
//                 <Heart
//                   className={`w-5 h-5 ${
//                     item.isFavorite
//                       ? 'fill-red-500 text-red-500'
//                       : 'text-gray-400'
//                   }`}
//                 />
//               </button>
//             </div>
//             <div className="mt-2">
//               <Rating
//                 value={item.rating}
//                 onChange={(rating) => updateRating(item.id, rating)}
//               />
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }