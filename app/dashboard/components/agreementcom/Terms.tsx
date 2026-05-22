import React, { useState } from "react";
import {
  FaMoneyBillWave,
  FaHandshake,
  FaBalanceScale,
  FaBroom,
  FaTools,
  FaClock,
  FaUsers,
  FaBan,
  FaStore,
  FaExclamationTriangle,
} from "react-icons/fa";

const Terms = ({ agree, setAgree }) => {
  

  const rules = [
    {
      icon: <FaMoneyBillWave />,
      title: "Pay Rent on Time",
      text: "Rent must be paid on time according to the agreement with the store owner.",
    },
    {
      icon: <FaHandshake />,
      title: "Respect the Owner",
      text: "Respect the store owner, their property, and their customers.",
    },
    {
      icon: <FaBalanceScale />,
      title: "Legal Business Only",
      text: "The store space must only be used for legal business activities.",
    },
    {
      icon: <FaBroom />,
      title: "Keep It Clean",
      text: "Maintain cleanliness and proper hygiene inside the store.",
    },
    {
      icon: <FaTools />,
      title: "Protect Equipment",
      text: "Do not damage furniture, equipment, or store infrastructure.",
    },
    {
      icon: <FaClock />,
      title: "Follow Store Hours",
      text: "Operate only during the agreed business hours.",
    },
    {
      icon: <FaUsers />,
      title: "Be Respectful",
      text: "Treat customers and nearby businesses with respect.",
    },
    {
      icon: <FaBan />,
      title: "No Illegal Products",
      text: "Illegal or counterfeit products are strictly prohibited.",
    },
    {
      icon: <FaStore />,
      title: "Respect Neighbors",
      text: "Do not disturb nearby businesses or create unnecessary noise.",
    },
   
  ];

  return (
    <div className="max-w-5xl mx-auto mb-6 md:mb-2 lg:mb-2 lg:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Store Sharing Rules & Regulations
      </h1>

      {/* Card Grid */}
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rules.map((rule, index) => (
          <div
            key={index}
            className="p-4  border rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="text-blue-600 text-2xl mb-2">{rule.icon}</div>
            <h3 className="font-semibold mb-1">{rule.title}</h3>
            <p className="text-sm text-gray-600">{rule.text}</p>
          </div>
        ))}
      </div>

      {/* Agree */}
      <div className="flex text-center justify-center w-full items-center mt-6 space-x-2">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="w-4 h-4"
        />
        <label className="text-sm">
          I have read and agree to follow all the rules.
        </label>
      </div>

      {/* Start Button */}
    </div>
  );
};

export default Terms;
