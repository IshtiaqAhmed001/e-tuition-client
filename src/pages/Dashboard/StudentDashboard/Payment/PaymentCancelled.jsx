import React from "react";
import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div>
      <h2 className="text-4xl">Payment Cancelled!</h2>
      <h4 className="text-2xl">
        <Link to="/dashboard/student/tutor-applications">
          <button className="btn btn-primary">Try again</button>
        </Link>
      </h4>
    </div>
  );
};

export default PaymentCancelled;
