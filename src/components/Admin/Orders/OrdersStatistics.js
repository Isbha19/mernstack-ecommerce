import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrdersStatisticsAction } from "../../../redux/slices/orders/orderSlices";

export default function OrdersStats() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersStatisticsAction());
  }, []);

  const { stats, loading, error } = useSelector((state) => state?.orders);
  const obj = stats?.orders;
  const obj1 = stats?.saleToday;
  const salesToday = obj1 && obj1.length > 0 ? Object.values(obj1[0]) : [];
  const statistics = obj ? Object.values(obj[0]) : [];

  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* todays sale */}
        <div className="w-full relative overflow-hidden rounded-lg bg-indigo-600 px-4 pt-5 pb-10 shadow sm:px-6 sm:pt-6">
          <dt>
            <div className="absolute rounded-md bg-indigo-500 p-2">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                ></path>
              </svg>
            </div>
            <p className="ml-12 truncate text-sm font-medium text-gray-200">
              Today's Sales
            </p>
          </dt>
          <dd className="ml-12 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-100">
              $ {stats?.saleToday.length <= 0 ? "0.00" : salesToday[1]}
            </p>
          </dd>
        </div>
        {/* stat 1 */}
        <div className="w-full relative overflow-hidden rounded-lg bg-red-800 px-4 pt-5 pb-10 shadow sm:px-6 sm:pt-6">
          <dt>
            <div className="absolute rounded-md bg-indigo-500 p-2">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                ></path>
              </svg>
            </div>
            <p className="ml-12 truncate text-sm font-small text-gray-100">
              Minimum Order
            </p>
          </dt>
          <dd className="ml-12 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-200">
              ${statistics[1]}
            </p>
          </dd>
        </div>
        {/* stat 2 */}
        <div className="w-full relative overflow-hidden rounded-lg bg-yellow-600 px-4 pt-5 pb-10 shadow sm:px-6 sm:pt-6">
          <dt>
            <div className="absolute rounded-md bg-indigo-500 p-2">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                ></path>
              </svg>
            </div>
            <p className="ml-12 truncate text-sm font-medium text-gray-100">
              Maximum Order
            </p>
          </dt>
          <dd className="ml-12 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-200">
              ${statistics[3]}
            </p>
          </dd>
        </div>
        {/* stat 3 */}
        <div className="w-full relative overflow-hidden rounded-lg bg-green-600 px-4 pt-5 pb-10 shadow sm:px-6 sm:pt-6">
          <dt>
            <div className="absolute rounded-md bg-indigo-500 p-2">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                ></path>
              </svg>
            </div>
            <p className="ml-12 truncate text-sm font-medium text-gray-100">
              Total Sales
            </p>
          </dt>
          <dd className="ml-12 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-200">
              ${statistics[2]}
            </p>
          </dd>
        </div>
      </dl>
    </div>
  );
}
