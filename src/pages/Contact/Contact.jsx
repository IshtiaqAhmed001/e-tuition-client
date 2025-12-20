import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

const Contact = () => {
  return (
    <section className="bg-base-200 text-base-content">
      {/* HERO */}
      <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://i.ibb.co/LhRSczXt/volodymyr-hryshchenko-V5vq-WC9gy-EU-unsplash.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* overlay using theme colors */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact Our Team
          </h1>
          <p className="max-w-xl mx-auto text-lg opacity-95">
            We’re here to help students and tutors succeed together.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT INFO */}
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">
                Let’s Talk
              </h2>
              <p className="opacity-80 max-w-md">
                Have questions, feedback, or need support? Reach out and our
                team will get back to you shortly.
              </p>
            </div>

            {/* INFO CARDS */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="card bg-base-100 shadow-md p-6 flex items-center gap-4">
                <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                  <FaPhoneAlt className="text-xl" />
                </div>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-sm opacity-70">+880 1234 567890</p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-md p-6 flex items-center gap-4">
                <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-sm opacity-70">contact@etuitionsbd.com</p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-md p-6 flex items-center gap-4 sm:col-span-2">
                <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-sm opacity-70">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="card bg-base-100 shadow-xl rounded-3xl p-10">
            <h3 className="text-2xl font-bold text-center text-primary mb-2">
              Send a Message
            </h3>
            <p className="text-center text-sm opacity-70 mb-8">
              We usually respond within 24 hours
            </p>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
              />

              <textarea
                placeholder="Write your message..."
                className="textarea textarea-bordered w-full h-32"
              />

              <button className="btn btn-primary w-full gap-2 text-white">
                <FaPaperPlane />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
