"use client";

import { useEffect, useState } from "react";
import { getCabin } from "../_lib/data-service";

const HomePage = () => {
  const [cabin, setCabin] = useState(null);

  useEffect(() => {
    async function fetchCabin() {
      const cabin = await getCabin("672bd5ddf01c948783c95f92");

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
