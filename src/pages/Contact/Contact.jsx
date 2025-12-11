import { FaPhone, FaEnvelope, FaLocationArrow } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      {/* Hero */}
      <div
        className="hero min-h-[50vh] relative"
        style={{
          backgroundImage:
            "url('https://i.ibb.co/LhRSczXt/volodymyr-hryshchenko-V5vq-WC9gy-EU-unsplash.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "cener",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="hero-content text-center relative text-white">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="max-w-xl mx-auto opacity-90">
            We'd love to hear from you! Reach out anytime.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-2 gap-12">
        {/* form */}
        <div className="bg-base-100 rounded-2xl p-8 shadow border border-base-300">
          <h2 className="text-2xl font-semibold text-primary mb-6">
            Send us a Message
          </h2>

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
              placeholder="Message"
              className="textarea textarea-bordered w-full h-32"
            />
            <button className="btn btn-primary w-full text-white">
              Send Message
            </button>
          </form>
        </div>

        {/* contact info */}
        <div className="flex flex-col gap-8">
          <div className="card bg-base-100 p-6 border border-base-300 shadow rounded-xl">
            <FaPhone className="text-primary text-3xl mb-3" />
            <h3 className="text-xl font-semibold">Phone</h3>
            <p className="opacity-80">+880 1234 567890</p>
          </div>

          <div className="card bg-base-100 p-6 border border-base-300 shadow rounded-xl">
            <FaEnvelope className="text-primary text-3xl mb-3" />
            <h3 className="text-xl font-semibold">Email</h3>
            <p className="opacity-80">contact@etuitionsbd.com</p>
          </div>

          <div className="card bg-base-100 p-6 border border-base-300 shadow rounded-xl">
            <FaLocationArrow className="text-primary text-3xl mb-3" />
            <h3 className="text-xl font-semibold">Address</h3>
            <p className="opacity-80">Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>

      {/* Map placeholder */}
    </div>
  );
};

export default Contact;
