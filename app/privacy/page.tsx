"use client";

import { motion } from "framer-motion";

export default function Page() {
  return (
    <div className="py-12 px-6 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto   rounded-2xl p-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-gray-900  dark:text-gray-50 mb-6 text-center"
        >
          Privacy Policy
        </motion.h1>

        <p className="text-gray-700 dark:text-gray-500 mb-4">
          Last updated: 7 Dec 2025
        </p>

        <p className="text-gray-700 dark:text-gray-500 mb-4">
          Welcome to <strong>Sliptat</strong>. This Privacy Policy describes how
          we collect, use, and protect your information.
        </p>

        <h3 className="font-semibold text-lg dark:text-gray-50 text-gray-900 mt-4">
          1. Information We Collect
        </h3>
        <ul className="list-disc pl-6 dark:text-gray-500 text-gray-700 space-y-1">
          <li>Personal details (name, email, etc.).</li>
          <li>Usage data and device information.</li>
          <li>Any content you provide.</li>
        </ul>

        <h3 className="font-semibold text-lg dark:text-gray-50 text-gray-900 mt-4">
          2. How We Use the Data
        </h3>
        <ul className="list-disc pl-6 dark:text-gray-500 text-gray-700 space-y-1">
          <li>To improve the service.</li>
          <li>To personalize user experience.</li>
          <li>For communication and support.</li>
        </ul>

        <h3 className="font-semibold text-lg dark:text-gray-50 text-gray-900 mt-4">
          3. Data Protection
        </h3>
        <p className="text-gray-700 dark:text-gray-500">
          We use industry-standard security measures to protect your
          information.
        </p>

        <h3 className="font-semibold text-lg dark:text-gray-50 text-gray-900 mt-4">
          4. Contact Us
        </h3>
        <p className="text-gray-700 dark:text-gray-500">
          Email: <strong>Splitatmail@gmail.com</strong>
        </p>
      </motion.div>
    </div>
  );
}
