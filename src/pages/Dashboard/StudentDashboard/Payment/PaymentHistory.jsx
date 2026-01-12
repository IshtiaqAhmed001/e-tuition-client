import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Loading from '../../../../components/Loading/Loading';

const PaymentHistory = () => {

    const {user}=useAuth();
    const axiosSecure = useAxiosSecure();
    const {data:payments=[],isLoading}=useQuery({
        queryKey:['payments',user.email],
        queryFn: async()=>{
const res = await axiosSecure.get(`/payments?email=${user.email}`);
return res.data;
        }
    })

      if (isLoading) {
        return <Loading />;
      }
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">
          Payment History: {payments.length}
        </h1>

        <div className="overflow-x-auto rounded-2xl shadow-lg bg-neutral border border-accent/30">
          <table className="table w-full">
            <thead className="bg-primary text-neutral">
              <tr>
                <th>#</th>
                <th>Tuition Name</th>
                <th>Amount</th>
                <th>Tracking ID</th>
                <th>Transaction ID</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment, idx) => (
                <tr
                  key={payment._id}
                  className="hover:bg-base-200 transition-colors duration-200"
                >
                  <td className="font-medium">{idx + 1}</td>

                  <td className="font-semibold text-primary">
                    {payment.tuitionTitle}
                  </td>

                  <td className="font-medium text-amber-600">
                    ৳{payment.amount}
                  </td>

                  <td className="text-secondary">{payment.trackingId}</td>

                  <td className="text-secondary">{payment.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default PaymentHistory;