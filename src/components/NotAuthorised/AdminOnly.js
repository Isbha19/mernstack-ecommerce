import React from "react";

const AdminOnly = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="p-8 rounded bg-white shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Only</h1>
        <p className="text-lg">Access Denied</p>
      </div>
    </div>
  );
};

export default AdminOnly;
