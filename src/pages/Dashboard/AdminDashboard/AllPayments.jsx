import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AllPayments = () => {

     const { user } = useAuth();
     const axiosSecure = useAxiosSecure();
     const { data: payments = [] } = useQuery({
       queryKey: ["all-payments", user.email],
       queryFn: async () => {
         const res = await axiosSecure.get(`/payments`);
         return res.data;
       },
     });
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-primary mb-6">
          Payment History: {payments.length}
        </h1>
        <div className="overflow-x-auto rounded-xl shadow bg-base-100 border border-base-300">
          <table className="table">
            <thead className="bg-primary text-base-100">
              <tr>
                <th>#</th>
                <th>Tuition Name</th>
                <th>Customer Email</th>
                <th>Payment Date</th>
                <th>Amount</th>
                <th>Tracking ID</th>
                <th>Transaction ID</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment, idx) => (
                <tr key={payment._id} className="hover:bg-base-200">
                  <td>{idx + 1}</td>
                  <td className="font-semibold text-primary">
                    {payment.tuitionTitle}
                  </td>

                  <td className="font-semibold text-error">
                    {payment.customer_email}
                  </td>
                  <td className="font-semibold text-primary">
                    {new Date(payment.paidAt).toLocaleDateString()}
                  </td>

                  <td className="font-medium text-primary">
                    ৳{payment.amount}
                  </td>

                  <td className="text-secondary">{payment.trackingId}</td>

                  <td className="text-error">{payment.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default AllPayments;