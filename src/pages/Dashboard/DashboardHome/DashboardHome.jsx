import React from 'react';
import useRole from '../../../hooks/useRole';
import Loading from '../../../components/Loading/Loading';
import StudentProfile from '../StudentDashboard/StudentProfile';

const DashboardHome = () => {
    const {role,roleLoading}=useRole();

   if (roleLoading) {
     return <Loading></Loading>;
   }
   if (role === "student") {
     return <StudentProfile/>
   } 

  
};

export default DashboardHome;