// import React, { useEffect, useState } from "react";
// import { AddressFetchApi } from "../../ApiCall/AddressFetch";

// const AddressCard = ({ id, onSelectAddress }) => {
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddressId, setSelectedAddressId] = useState(null); // State for selected address

//   useEffect(() => {
//     const fetchAddresses = async () => {
//       try {
//         const response = await AddressFetchApi(id);
//         const addressesData = Array.isArray(response) ? response : [response];
//         setAddresses(addressesData);
//       } catch (error) {
//         console.error("Error fetching addresses:", error);
//       }
//     };
//     fetchAddresses();
//   }, [id]);

//   const handleAddressClick = (address) => {
//     setSelectedAddressId(address._id); // Update selected address ID
//     onSelectAddress(address._id); // Call the parent function
//   };

//   return (
//     <div className="max-w-xs mx-auto mt-4">
//       <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">
//         Select Address
//       </h2>
//       {addresses.length > 0 ? (
//         addresses.map((address) => (
//           <div
          
//             key={address._id}
//             className={`bg-white shadow-md rounded-lg p-3 mb-2 border cursor-pointer hover:shadow-lg ${
//               selectedAddressId === address._id ? "bg-blue-100" : ""
//             }`} // Change background color if selected
//             onClick={() => handleAddressClick(address)} // Handle address selection
//           >
//             <h3 className="text-md font-semibold text-gray-800 mb-1">
//               {address.name}
//             </h3>
//             <p className="text-gray-600">{address.street}</p>
//             <p className="text-gray-600">
//               {address.city}, {address.state} {address.postalCode}
//             </p>
//             <p className="text-gray-600">{address.country}</p>
//           </div>
//         ))
//       ) : (
//         <div className="flex justify-center items-center">
//           <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
//             Add Address
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddressCard;
import React, { useEffect, useState } from "react";
import { AddressFetchApi } from "../../ApiCall/AddressFetch";

const AddressCard = ({ id, onSelectAddress }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null); // State for selected address

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await AddressFetchApi(id);
        const addressesData = Array.isArray(response) ? response : [response];
        setAddresses(addressesData);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, [id]);

  const handleAddressClick = (address) => {
    setSelectedAddressId(address._id); // Update selected address ID
    onSelectAddress(address._id); // Call the parent function
  };

  return (
    <div className="max-w-full mx-auto mt-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Select Address
      </h2>
      <div className="flex flex-wrap justify-center"> {/* Flex container for address cards */}
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <div
              key={address._id}
              className={`bg-white shadow-md rounded-lg p-3 m-2 border cursor-pointer hover:shadow-lg ${
                selectedAddressId === address._id ? "bg-blue-100" : ""
              }`} // Change background color if selected
              onClick={() => handleAddressClick(address)} // Handle address selection
            >
              <h3 className="text-md font-semibold text-gray-800 mb-1">
                {address.name}
              </h3>
              <p className="text-gray-600">{address.street}</p>
              <p className="text-gray-600">
                {address.city}, {address.state} {address.postalCode}
              </p>
              <p className="text-gray-600">{address.country}</p>
              
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center w-full">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              Add Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressCard;
