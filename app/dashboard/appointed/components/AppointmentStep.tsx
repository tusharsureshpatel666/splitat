import { Calendar } from "@/components/ui/calendar";

import { use, useEffect, useState } from "react";

import { useTourStep } from "@/store/store";
import FormNavigation from "./AppointmentNav";
import Heading from "../../components/heading";

import { Button } from "@/components/ui/button";
import FaceCapture from "./facecapture/Facecapture";
import axios from "axios";
import { compressImage } from "@/lib/compress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface AppointmentStepProps {
  id: string;
}
const AppointmentStep = ({ id }: AppointmentStepProps) => {
  useEffect(() => {
    const fetchparam = async () => {
      console.log(id);
    };
    fetchparam();
  }, [id]);

  const [openSuccess, setOpenSuccess] = useState(false);
  const timeSlots = [
    {
      id: "1",
      time: "10:00 AM - 11:00 AM",
    },
    {
      id: "2",
      time: "11:00 AM - 12:00 PM",
    },
    {
      id: "3",
      time: "2:00 PM - 3:00 PM",
    },
    {
      id: "4",
      time: "4:00 PM - 5:00 PM",
    },
    {
      id: "5",
      time: "6:00 PM - 7:00 PM",
    },
    {
      id: "6",
      time: "8:00 PM - 9:00 PM",
    },
  ];

  const [selectedTime, setSelectedTime] = useState("");

  const mindate = new Date();

  mindate.setDate(mindate.getDate() + 2);
  const [date, setDate] = useState(mindate);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [clip, setClip] = useState("");

  const { sStep, setSStep, nextSStep, prevStep, resetStep } = useTourStep();
  console.log(date);
  const isStepValid =
    sStep === 1
      ? !!date
      : sStep === 2
        ? !!selectedTime
        : sStep === 3
          ? clip.trim() !== ""
          : false;

  const handleNext = () => {
    if (!isStepValid) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    nextSStep();
  };

  const handleFinish = async () => {
    console.log(clip);

    const compress = await compressImage(clip);
    console.log(compress);

    const data = { date, clip, selectedTime };
    console.log(data);

    try {
      setLoading(true);
      const res = await axios.post(`/api/appointment/create/${id}`, data);

      setLoading(false);

      setOpenSuccess(true);
      resetStep();
      setSelectedTime("");
      setClip("");
    } catch (err) {
      setLoading(false);
      return err;
    }
  };
  const router = useRouter();
  const RedirectDialog = () => {
    router.push("/dashboard");
    setOpenSuccess(false);
  };

  return (
    <>
      {sStep === 1 && (
        <div className="w-full">
          <div className="flex flex-col items-center gap-2">
            <Heading
              title="Date for Tour"
              description="Choose the date for the tour"
              className="text-center text-2xl md:text-4xl lg:text-5xl"
            />
          </div>

          <div className="w-full max-w-2xl mx-auto mt-8">
            <div className="flex flex-col  mb-5">
              {/* Full Name */}

              {/* Email */}

              {/* Date & Time */}
              <div className="">
                <div className="max-w-5xl flex justify-center items-center w-full">
                  <div className="w-full flex justify-center">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={{ before: mindate }}
                      className="w-full max-w-[600px] p-0"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}

              {/* Submit */}
            </div>
          </div>
        </div>
      )}
      {sStep === 2 && (
        <div className="w-full max-w-3xl mx-auto space-y-8">
          <Heading
            title="Pick a Time "
            description="Choose the time for the appointment"
            className="text-center text-2xl md:text-4xl lg:text-5xl"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {timeSlots.map((item) => (
              <Button
                key={item.id}
                onClick={() => setSelectedTime(item.time)}
                variant={selectedTime === item.time ? "default" : "outline"}
                className={`
            h-14 rounded-xl text-base font-medium transition-all duration-200
            ${
              selectedTime === item.time
                ? "bg-primary text-white shadow-lg scale-[1.02]"
                : "hover:bg-gray-100 hover:border-black"
            }
          `}
              >
                {item.time}
              </Button>
            ))}
          </div>

          {selectedTime && (
            <div className="rounded-xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">Selected Time</p>
              <p className="text-lg font-semibold">
                {timeSlots.find((t) => t.time === selectedTime)?.time}
              </p>
            </div>
          )}
        </div>
      )}
      {sStep === 3 && (
        <div>
          <div className="flex flex-col gap-3">
            <Heading
              title="Clip your Image "
              description="Take your Image for verfication"
              className="text-center text-2xl md:text-4xl lg:text-5xl"
            />
            <FaceCapture
              onCapture={(image) => {
                setClip(image);
              }}
            />
          </div>
        </div>
      )}

      <Dialog open={openSuccess} onOpenChange={setOpenSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="items-center text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-2" />

            <DialogTitle className="text-2xl">
              Appointment Requested
            </DialogTitle>

            <DialogDescription className="text-base">
              Your appointment request has been submitted successfully.
              <br />
              <br />
              Please wait for the store owner to review your request. You
              receive a notification once it has been accepted or rejected.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button className="w-full" onClick={RedirectDialog}>
              Okay
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <FormNavigation
        step={sStep}
        isValid={isStepValid}
        loading={loading}
        shake={shake}
        onPrev={prevStep}
        onNext={handleNext}
        onFinish={handleFinish}
      />
    </>
  );
};

export default AppointmentStep;
