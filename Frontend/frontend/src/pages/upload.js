import React, { useState } from "react";
import { apiUrl } from "../config/api";

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a file before uploading.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("token");
      const res = await fetch(apiUrl("/api/upload"), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setMessage(`✅ File uploaded successfully! File ID: ${data.fileId}`);
      } else {
        setMessage(`❌ Upload failed: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      setLoading(false);
      setMessage("❌ Error uploading file: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl w-[400px]">
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-300">
          Upload Document
        </h2>

        <form onSubmit={handleFileUpload} className="flex flex-col space-y-4">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border border-gray-700 p-2 rounded bg-gray-800"
          />

          <button
            type="submit"
            disabled={loading}
            className={`py-2 rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-300">{message}</p>
        )}
      </div>
    </div>
  );
};

export default UploadDocument;
