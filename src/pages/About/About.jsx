import { FaChalkboardTeacher, FaUsers, FaHeart } from "react-icons/fa";
import { Link } from "react-router";

const About = () => {
  return (
    <div className="min-h-screen  bg-base-200 text-base-content">

      <div
        className="hero min-h-[60vh] relative"
        style={{
          backgroundImage:
            "url('https://i.ibb.co/Q7sVkFzC/scott-graham-5f-Nm-Wej4t-AA-unsplash.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="hero-content text-center relative text-white">
          <div>
            <h1 className="text-4xl font-bold mb-4">About eTuitionsBD</h1>
            <p className="max-w-xl mx-auto opacity-90">
              We connect passionate tutors with eager learners, helping students
              achieve their academic goals with quality guidance.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4">
      
        <div className="flex flex-col md:flex-row items-center gap-10">
          <img
            src="https://i.ibb.co/8L8hCMRX/vitaly-gariev-e6r-Pqz-Ate-II-unsplash.jpg"
            alt="About"
            className="w-64 rounded-2xl shadow-lg border border-base-300"
          />

          <div>
            <h2 className="text-3xl font-semibold mb-4 text-primary">
              Who We Are
            </h2>
            <p className="opacity-80 leading-relaxed">
              eTuitionsBD is an online tutoring platform designed to make
              quality education accessible for everyone. We believe that
              personalized learning and real student-teacher connection can
              unlock true potential.
            </p>
          </div>
        </div>

     
        <div className="mt-16">
          <h2 className="text-3xl font-semibold mb-3 text-primary">
            Our Mission
          </h2>
          <p className="opacity-80 leading-relaxed max-w-3xl">
            Our mission is to build a safe, efficient, and modern learning
            community where students can confidently choose expert tutors,
            improve skills, and succeed in academics and beyond.
          </p>
        </div>
       
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-center mb-10 text-primary">
            What We Offer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
            <div className="card bg-base-100 shadow-xl p-6 border border-base-300 text-center">
              <FaChalkboardTeacher className="text-4xl mx-auto text-primary" />
              <h3 className="text-xl font-semibold mt-4">Expert Tutors</h3>
              <p className="opacity-80 mt-2">
                Professional tutors from diverse academic backgrounds.
              </p>
            </div>

        
            <div className="card bg-base-100 shadow-xl p-6 border border-base-300 text-center">
              <FaUsers className="text-4xl mx-auto text-primary" />
              <h3 className="text-xl font-semibold mt-4">Verified Guidance</h3>
              <p className="opacity-80 mt-2">
                Authentic, trusted, and well-reviewed mentors.
              </p>
            </div>

        
            <div className="card bg-base-100 shadow-xl p-6 border border-base-300 text-center">
              <FaHeart className="text-4xl mx-auto text-primary" />
              <h3 className="text-xl font-semibold mt-4">Better Learning</h3>
              <p className="opacity-80 mt-2">
                Personalized sessions designed to help you grow.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-20">
          <h3 className="text-2xl font-semibold mb-4 text-primary">
            Ready to start learning?
          </h3>
          <Link to='/' className="btn btn-primary btn-wide">Explore Tutors</Link>
        </div>
      </div>
    </div>
  );
};

export default About;
