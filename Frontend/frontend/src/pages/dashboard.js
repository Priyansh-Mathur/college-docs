import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarPrivate from '../components/NavbarProtect';
import { FileText } from 'lucide-react';
import { apiUrl } from '../config/api';
const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [myDocs, setMyDocs] = useState([]);
  const [year,setyear]=useState("");
  const [branch,setbranch]=useState("");
  const [docu,setdocu]=useState([])
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(apiUrl('/api/mydocs'), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.success) {
          setMyDocs(data.docs);
        }
      } catch (err) {
        console.error('Error fetching documents:', err);
      }
    };

    fetchDocs();
  }, []);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const token=localStorage.getItem('token');
      const url=await fetch(apiUrl(`/api/mydocs?year=${year}&branch=${branch}`),{
        method:"GET",
        headers:{
          Authorization:`Bearer ${token}`,
        },
      })
      const data=await url.json();
      console.log(data);
      if(url.ok ){setdocu(data.docs || [])}
      else {alert("Failed to fetch the documents")}
    }
    catch(e){
      alert(e)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarPrivate />

      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome, {user?.name || 'User'}
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          {/* Upload New Document */}
          <button
            onClick={() => navigate('/upload')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Upload New Document
          </button>

          {/* Go to Download Page */}
          <button
            onClick={() => navigate('/download')}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Go to Download Page
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-3">Your Uploaded Documents</h2>

        <div className="bg-white shadow-md rounded-lg p-4">
          {myDocs.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {myDocs.map((doc) => (
                <li key={doc._id} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{doc.fileName}</p>
                    <p className="text-sm text-gray-500">
                      {doc.fileType} — {(doc.fileSize / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <a
                    href={apiUrl(`/api/file/${doc.fileName}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View / Download
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No documents uploaded yet.</p>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-semibold mb-6">Select Filters</h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-white shadow-md rounded-2xl p-6 w-80"
        >
          {/* Year Selector */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Select Year:
            </label>
            <select
              value={year}
              onChange={(e) => setyear(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Choose Year --</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>

          {/* Branch Selector */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Select Branch:
            </label>
            <select
              value={branch}
              onChange={(e) => setbranch(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Choose Branch --</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="EE">EE</option>
              <option value="CIVIL">CIVIL</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 font-medium"
          >
            Submit
          </button>
        </form>
      </div>

      <ul className="divide-y divide-gray-200">
        {Array.isArray(docu) && docu.map((doc) => (
          <li
            key={doc._id}
            className="py-3 flex justify-between items-center hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              <FileText className="text-blue-600 w-5 h-5" />
              <div>
                <p className="font-medium text-gray-800">{doc.fileName}</p>
                <p className="text-sm text-gray-500">
                  {doc.fileType} — {(doc.fileSize / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>

            <a
              href={apiUrl(`/api/download/${doc.fileId}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View / Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
