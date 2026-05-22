import Heading from "@/app/dashboard/components/heading";
import { Button } from "@/components/ui/button";
import { useStoreStep } from "@/store/store";
import Image from "next/image";
import Link from "next/link";

const StepIntro = () => {
  const { nextSStep } = useStoreStep();

  return (
    <div className="flex flex-col gap-8 animate-fadeIn">
      {/* Illustration */}
      <div className="flex justify-center w-full flex-col text-center items-center gap-5">
        <div className="relative mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg aspect-square">
          <Image
            src="/main.webp"
            alt="Illustration"
            fill
            priority
            className="object-cover rounded-full"
          />
        </div>

        {/* Heading */}
        <Heading
          title="List Your Store for Rent"
          description="List your store and connect with reliable partners to split the rent effortlessly."
        />

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="w-full">
            <Button
              variant="outline"
              className="cursor-pointer rounded-full  text-sm font-medium  transition"
            >
              Exit
            </Button>
          </Link>

          <Button
            onClick={nextSStep}
            className="rounded-full cursor-pointer  text-sm font-medium  transition"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepIntro;
