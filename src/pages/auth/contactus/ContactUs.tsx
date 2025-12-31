import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactUs: React.FC = () => {
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
    console.log(form); // later connect API
    alert("Message sent successfully!");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div style={{ background: "#f8fafc" }}>
      {/* Hero */}
      <section style={{ padding: "60px 0", textAlign: "center" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 700 }}>
          Contact <span style={{ color: "#0ea5e9" }}>Tripzy</span>
        </h1>
        <p style={{ color: "#64748b", marginTop: 8 }}>
          We’d love to hear from you. Get in touch anytime.
        </p>
      </section>

      {/* Content */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          padding: "0 20px 80px",
        }}
      >
        {/* Contact Info */}
        <div>
          <h3 style={{ fontSize: 22, marginBottom: 20 }}>Reach us</h3>

          <p style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            <Mail /> support@tripzy.com
          </p>
          <p style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            <Phone /> +91 98765 43210
          </p>
          <p style={{ display: "flex", gap: 10 }}>
            <MapPin /> Kolkata, India
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#ffffff",
            padding: 30,
            borderRadius: 14,
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ fontSize: 22, marginBottom: 20 }}>
            Send us a message
          </h3>

          <input
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            name="email"
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            style={inputStyle}
          />

          <textarea
            name="message"
            placeholder="Your message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 10,
              border: "none",
              background: "#020617",
              color: "#fff",
              fontSize: 16,
              display: "flex",
              justifyContent: "center",
              gap: 8,
              cursor: "pointer",
            }}
          >
            <Send size={18} /> Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: 14,
  borderRadius: 10,
  border: "1px solid #e5e7eb",
};

export default ContactUs;
