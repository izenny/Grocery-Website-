import React, { useEffect, useState } from "react";
import { AddressFetchApi } from "../../ApiCall/AddressFetch";

const AddressCard = ({ id, onSelectAddress }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null); // State for selected address
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await AddressFetchApi(id);
        const addressesData = Array.isArray(response) ? response : [response];
        setAddresses(addressesData);
      } catch (err) {
        console.error("Error fetching addresses:", err);
        setError("Failed to fetch addresses. Please try again.");
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
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

      {loading ? (
        <div className="text-center">Loading addresses...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : addresses.length === 0 ? (
        <div className="text-center text-gray-600">No addresses found.</div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {addresses.map((address) => (
            <div
              key={address._id}
              className={`bg-white shadow-md rounded-lg p-3 m-2 border cursor-pointer hover:shadow-lg ${
                selectedAddressId === address._id ? "bg-blue-100" : ""
              }`}
              onClick={() => handleAddressClick(address)}
              role="button" // ARIA role for better accessibility
              tabIndex={0} // Make the card focusable
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleAddressClick(address); // Allow keyboard selection
                }
              }}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressCard;
