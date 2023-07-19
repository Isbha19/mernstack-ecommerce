import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateOrderAction } from "../../../redux/slices/orders/orderSlices";
import { useParams } from "react-router-dom";

const UpdateOrders = () => {
  // get the id from params
  const { id } = useParams();
  const [status, setStatus] = useState({});

  const dispatch = useDispatch();

  // onChange handler
  const onChange = (e) => {
    setStatus({ ...status, [e.target.name]: e.target.value });
  };

  // onSubmit handler
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateOrderAction({ status, id }));
    //redirect
    window.location.href = "/admin";
  };

  return (
    <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
      <div className="flex flex-1 justify-center">
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Update Order
          </label>
          <form onSubmit={onSubmit}>
            <select
              id="location"
              name="status"
              onChange={onChange}
              value={status}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              defaultValue="Canada"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
            <button
              type="submit"
              className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrders;
