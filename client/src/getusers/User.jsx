import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:2000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.log("Error while fecthing data", error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    await axios
      .delete(`http://localhost:2000/api/delete/user/${userId}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
        toast.success(response.data.message, { position: "top-center" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="overflow-x-auto max-w-3xl mx-auto my-12 p-8 rounded bg-[rgba(255,255,255,0.92)] shadow-lg ">
      <Link
        to="/add"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-1 rounded transition duration-300 mb-2.5 no-underline inline-block"
      >
        <i className="fa-solid fa-user-plus"></i> Add User
      </Link>

      {users.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-6 border border-dashed border-gray-300 rounded-2xl bg-gray-50 text-center shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No Data Display
          </h3>
          <p className="text-sm text-gray-500">Please Add Data</p>
        </div>
      ) : (
        <table className="table-auto w-full border border-gray-200  text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-1/4 px-4 py-2 text-left">No</th>
              <th className="w-1/4 px-4 py-2 text-left">Name</th>
              <th className="w-1/4 px-4 py-2 text-left">Email</th>
              <th className="w-1/4 px-4 py-2 text-left">Address</th>
              <th className="w-1/4 px-4 py-2 text-left">Hobby</th>
              <th className="w-1/4 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr className="border-t ">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.address}</td>
                  <td className="px-4 py-2">{user.hobby}</td>
                  <td className="px-4 py-2">
                    <Link
                      to={`update/` + user._id}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-2 py-1 rounded transition duration-300 m-0.5 no-underline inline-block"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>

                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-2 py-1 rounded transition duration-300 m-0.5"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default User;
