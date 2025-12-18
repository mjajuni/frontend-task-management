import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Main Content Wrapper */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Home />
      </main>
    </div>
  );
}
