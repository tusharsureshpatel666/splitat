"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/sendMail", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setLoading(false);

    setStatus(
      data.success ? "Message sent successfully!" : "Failed to send message.",
    );
  };

  return (
    <section className=" dark:bg-black flex items-center justify-center  py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl bg-white dark:bg-black lg:grid-cols-2"
      >
        {/* LEFT IMAGE (LG ONLY) */}
        <div className="relative hidden lg:block">
          <Image
            src="/contact.webp"
            alt="Contact illustration"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* RIGHT FORM */}
        <div className="p-2 sm:p-4">
          <h1 className="mb-2 text-3xl font-bold text-black dark:text-white">
            Contact Us
          </h1>
          <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            Have a question or want to work with us? We’d love to hear from you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              required
              placeholder="Your Name"
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-black dark:text-white"
            />

            <input
              type="email"
              name="email"
              required
              placeholder="Your Email"
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-black dark:text-white"
            />

            <textarea
              name="message"
              required
              placeholder="Your Message"
              rows={5}
              className="w-full resize-none rounded-lg border border-gray-300 bg-white p-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-black dark:text-white"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {status && (
            <p
              className={`mt-4 text-center text-sm font-medium ${
                status.includes("success") ? "text-green-600" : "text-red-600"
              }`}
            >
              {status}
            </p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
