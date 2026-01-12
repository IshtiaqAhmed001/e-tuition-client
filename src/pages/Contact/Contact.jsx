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
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Contact Our <span className="">Team</span>
          </h1>
          <div className="flex justify-center mb-6">
            <span className="w-20 h-1 bg-accent rounded-full"></span>
          </div>
          <p className="max-w-xl mx-auto text-lg opacity-90">
            We’re here to help students and tutors succeed together.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-20 space-y-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT INFO */}
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-extrabold text-base-content mb-3">
                Let’s <span className="text-primary">Talk</span>
              </h2>
              <div className="flex justify-start mb-6">
                <span className="w-20 h-1 bg-accent rounded-full"></span>
              </div>
              <p className="text-base-content/70 max-w-md">
                Have questions, feedback, or need support? Reach out and our
                team will get back to you shortly.
              </p>
            </div>

            {/* INFO CARDS */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="card bg-neutral shadow-md p-6 flex items-center gap-4 border border-base-300">
                <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                  <FaPhoneAlt className="text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-base-content">Phone</p>
                  <p className="text-sm text-base-content/70">
                    +880 1234 567890
                  </p>
                </div>
              </div>

              <div className="card bg-neutral shadow-md p-6 flex items-center gap-4 border border-base-300">
                <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-base-content">Email</p>
                  <p className="text-sm text-base-content/70">
                    contact@etuitionsbd.com
                  </p>
                </div>
              </div>

              <div className="card bg-neutral shadow-md p-6 flex items-center gap-4 sm:col-span-2 border border-base-300">
                <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-base-content">Location</p>
                  <p className="text-sm text-base-content/70">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="card bg-neutral shadow-xl rounded-3xl p-10 border border-base-300">
            <h3 className="text-2xl font-extrabold text-center text-base-content mb-3">
              Send a <span className="text-primary">Message</span>
            </h3>
            <div className="flex justify-center mb-6">
              <span className="w-16 h-1 bg-accent rounded-full"></span>
            </div>
            <p className="text-center text-sm text-base-content/70 mb-8">
              We usually respond within 24 hours
            </p>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full bg-base-100 text-base-content focus:border-primary focus:ring-primary/30"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full bg-base-100 text-base-content focus:border-primary focus:ring-primary/30"
              />

              <textarea
                placeholder="Write your message..."
                className="textarea textarea-bordered w-full h-32 bg-base-100 text-base-content focus:border-primary focus:ring-primary/30"
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
