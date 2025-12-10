import React from 'react';
import useRole from '../../../hooks/useRole';
import Loading from '../../../components/Loading/Loading';
import StudentProfile from '../StudentDashboard/StudentProfile';
import TutorProfile from '../TutorDashboard/TutorProfile';

const DashboardHome = () => {
    const {role,roleLoading}=useRole();

   if (roleLoading) {
     return <Loading></Loading>;
   }
   if (role === "student") {
     return <StudentProfile/>
   } 
   else if(role==="tutor"){
    return <TutorProfile/>
   }

  
};

export default DashboardHome;