"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ApplyModal from "./applymodel";

export default function FrontendDeveloperJob() {
  const [open, setOpen] = useState(false);

  return (
    <section className="mx-auto  px-4 ">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-3xl font-semibold text-black dark:text-white">
          Frontend Developer
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Full-time · Remote / Hybrid · Experience: 1–3 years
        </p>
      </div>

      {/* Description */}
      <div className="space-y-2 text-gray-700 dark:text-gray-300">
        <p>
          We are looking for a skilled Frontend Developer to help build modern,
          scalable, and user-friendly web applications at <strong>Splitat</strong>.
        </p>

        <div>
          <h3 className="mb-2 font-semibold text-black dark:text-white">
            Responsibilities
          </h3>
          <ul className="list-disc space-y-2 pl-5">
            <li>Build responsive UI using React and Next.js</li>
            <li>Collaborate with backend and design teams</li>
            <li>Optimize applications for speed and scalability</li>
            <li>Write clean, maintainable, and reusable code</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-black dark:text-white">
            Requirements
          </h3>
          <ul className="list-disc space-y-2 pl-5">
            <li>Strong knowledge of React, Next.js, and TypeScript</li>
            <li>Experience with Tailwind CSS</li>
            <li>Understanding of REST APIs</li>
            <li>Good problem-solving skills</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-black dark:text-white">
            Nice to Have
          </h3>
          <ul className="list-disc space-y-2 pl-5">
            <li>Framer Motion experience</li>
            <li>Basic backend knowledge</li>
            <li>SaaS product experience</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10">
        <Button
          onClick={() => setOpen(true)}
          className="rounded-full px-8 font-semibold"
        >
          Apply Now
        </Button>
      </div>

      {/* Modal */}
      <ApplyModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
