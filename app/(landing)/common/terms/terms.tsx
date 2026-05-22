"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div className="  py-12 px-6 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto  rounded-2xl p-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center"
        >
          Terms & Conditions
        </motion.h1>

        <p className="text-gray-700 dark:text-gray-500 mb-4">
          Last updated: 7 Dec 2025
        </p>

        <p className="text-gray-700 dark:text-gray-500 mb-4">
          By using <strong>Splitat</strong>, you agree to the following terms and
          conditions.
        </p>

        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mt-4">
          1. Use of the Service
        </h3>
        <p className="text-gray-700 dark:text-gray-500">
          You agree to use the service legally and responsibly. Misuse or
          malicious activity is not allowed.
        </p>

        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mt-4">
          2. Accounts
        </h3>
        <p className="text-gray-700 dark:text-gray-500">
          You are responsible for keeping your account and password secure.
        </p>

        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mt-4">
          3. AI-Generated Content
        </h3>
        <p className="text-gray-700 dark:text-gray-500">
          Our platform may generate AI-based content. You must review and
          confirm accuracy before using it. We are not responsible for misuse.
        </p>

        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mt-4">
          4. Limitation of Liability
        </h3>
        <p className="text-gray-700 dark:text-gray-500">
          We are not liable for financial loss, data loss, or damage caused by
          incorrect usage.
        </p>

        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mt-4">
          5. Contact
        </h3>
        <p className="text-gray-700 dark:text-gray-500">
          Email: <strong>Splitatgo.com</strong>
        </p>
      </motion.div>
    </div>
  );
}
