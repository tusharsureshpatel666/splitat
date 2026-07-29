import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { FaBell } from "react-icons/fa";

const Appointmentbell = () => {
  return (
    <Link href={"/dashboard/appointment/notific"}>
      <Button
        variant="secondary"
        className="relative cursor-pointer rounded-full py-5 px-5"
      >
        <FaBell className="text-lg" />
      </Button>
    </Link>
  );
};

export default Appointmentbell;
