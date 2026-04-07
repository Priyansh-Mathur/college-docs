import React from "react";
import Navbar from "../components/navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-800 mt-10">
          Welcome to the Home Page
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          This is your landing page.
        </p>
      </div>
    </>
  );
};

export default Home;
