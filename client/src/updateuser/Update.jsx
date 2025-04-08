import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Update = () => {
  const users = {
    name: "",
    email: "",
    address: "",
    hobby: "",
  };
  const [user, setUser] = useState(users);
  const navigate = useNavigate();
  const { id } = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:2000/api/user/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:2000/api/update/user/${id}`, user)
      .then((response) => {
        toast.success(response.data.message, { position: "top-center" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-white/90 max-w-xl mx-auto p-8 my-8 rounded-lg shadow-md">
      <Link to="/" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
        <i class="fa-solid fa-backward"></i>
        <span class="ml-2">Back</span>
      </Link>
      <h3 className="text-2xl font-semibold mb-6 text-center">Update User</h3>
      <form className="flex flex-col space-y-4 " onSubmit={submitForm}>
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 font-medium">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={user.name}
            name="name"
            onChange={inputHandler}
            placeholder="Enter your name"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            name="email"
            onChange={inputHandler}
            placeholder="Enter your email"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address" className="mb-1 font-medium">
            Address:
          </label>
          <input
            type="text"
            id="address"
            value={user.address}
            name="address"
            onChange={inputHandler}
            placeholder="Enter your address"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="hobby" className="mb-1 font-medium">
            Hobby:
          </label>
          <input
            type="text"
            id="hobby"
            value={user.hobby}
            name="hobby"
            onChange={inputHandler}
            placeholder="Enter your hobby"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
