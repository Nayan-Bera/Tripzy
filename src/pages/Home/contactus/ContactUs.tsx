import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    alert("Message sent successfully!");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      {/* Header */}
      <section className="py-14 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Contact <span className="text-sky-500">Tripzy</span>
        </h1>
        <p className="mt-3 text-slate-600 max-w-xl mx-auto">
          Questions about bookings, pricing, or partnerships? Our team is here
          to help.
        </p>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* LEFT CARD */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col h-full">
            {/* Reach Us */}
            <div>
              <h2 className="text-2xl font-semibold mb-5">Reach us</h2>

              <div className="space-y-4 text-slate-700">
                <div className="flex items-center gap-3">
                  <Mail className="text-sky-500" />
                  <span>support@tripzy.com</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="text-sky-500" />
                  <span>+91 98765 43210</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="text-sky-500" />
                  <span>Kolkata, India</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-slate-200" />

            {/* Map */}
            <div className="mt-auto">
              <h2 className="text-xl font-semibold mb-3">Our office</h2>

              <div className="overflow-hidden rounded-xl border border-slate-200 h-[220px]">
                <iframe
                  title="Tripzy Office Location"
                  src="https://www.google.com/maps?q=22.5726,88.3639&z=15&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* RIGHT CARD */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8 h-full flex flex-col"
          >
            <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>

            <div className="space-y-4">
              <input
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />

              <input
                name="email"
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />

              <input
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />

              <textarea
                name="message"
                placeholder="Your message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <button
              type="submit"
              className="mt-auto w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white py-3 font-medium hover:bg-slate-800 transition"
            >
              <Send size={18} />
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
