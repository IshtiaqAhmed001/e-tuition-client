import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaMoneyBillWave, FaReceipt, FaCalendarAlt } from "react-icons/fa";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const RevenueHistory = () => {
  const axiosSecure = useAxiosSecure();

  const { data: revenue = [], isLoading } = useQuery({
    queryKey: ["tutorRevenue"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutor/revenue");
      return res.data;
    },
  });

  console.log(revenue)

  if (isLoading) return <Loading />;

  
  const totalRevenue = revenue.reduce((sum, item) => sum + item.amount, 0);

  const chartData = revenue.map((item) => ({
    date: new Date(item.paidAt).toLocaleDateString(),
    amount: item.amount,
  }));

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Page Title */}
      <h2 className="text-2xl font-bold">Revenue History</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card bg-base-100 shadow">
          <div className="card-body flex-row items-center gap-4">
            <FaMoneyBillWave className="text-4xl text-success" />
            <div>
              <p className="text-gray-500">Total Earnings</p>
              <h3 className="text-2xl font-bold">৳ {totalRevenue}</h3>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body flex-row items-center gap-4">
            <FaReceipt className="text-4xl text-primary" />
            <div>
              <p className="text-gray-500">Total Payments</p>
              <h3 className="text-2xl font-bold">{revenue.length}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      {chartData.length > 0 && (
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <FaCalendarAlt /> Earnings Over Time
            </h3>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      <div className="card bg-base-100 shadow">
        <div className="card-body overflow-x-auto">
          <h3 className="font-semibold mb-4">Payment History</h3>

          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Tuition</th>
                <th>Tracking ID</th>
                <th>Amount</th>
                <th>Paid Date</th>
                <th>Transaction</th>
              </tr>
            </thead>
            <tbody>
              {revenue.map((item, index) => (
                <tr key={item.transactionId}>
                  <td>{index + 1}</td>
                  <td>{item.tuitionTitle}</td>
                  <td className="font-mono text-xs">{item.trackingId}</td>
                  <td className="font-semibold">৳ {item.amount}</td>
                  <td>{new Date(item.paidAt).toLocaleDateString()}</td>
                  <td className="text-xs">{item.transactionId}</td>
                </tr>
              ))}

              {revenue.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6">
                    No revenue found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RevenueHistory;
