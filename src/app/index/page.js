"use client";

import { useEffect, useState } from "react";
import { getBooking } from "../_lib/data-service";

const HomePage = () => {
  const [cabin, setCabin] = useState(null);

  useEffect(() => {
    async function fetchCabin() {
      const cabin = await getBooking("672bdf4a3c011039a58da8b6");

      setCabin(cabin);
    }

    fetchCabin();
  }, []);

  return (
    <div>
      <h1>Cabin Details</h1>
      {cabin ? (
        <div>
          <p>ID: {cabin._id}</p>
          <p>Name: {cabin.name}</p>
          <p>Description: {cabin.description}</p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HomePage;
