"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { Megaphone } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const REPORT_REASONS = [
  "Spam or misleading",
  "Inappropriate content",
  "Fraud or scam",
  "Duplicate listing",
  "Other",
];

export default function ReportDialog() {
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const id = useParams();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (!reason) return alert("Please select a reason");

    console.log({
      reason,
      id,
      message,
    });
    setLoading(true);
    const res = await axios.post("/api/report", { reason, message, id });
    console.log(res);
    toast.success("Report Submit");
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="rounded-full" size={"lg"}>
          <Megaphone className="h-4 w-4" /> Report
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Report this listing</DialogTitle>
        </DialogHeader>

        {/* Reasons */}
        <RadioGroup
          value={reason}
          onValueChange={setReason}
          className="space-y-3"
        >
          {REPORT_REASONS.map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <RadioGroupItem value={item} id={item} />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
        </RadioGroup>

        {/* Optional message */}
        <Textarea
          placeholder="Tell us more (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-3"
        />

        {/* Actions */}
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSubmit} disabled={!reason || loading}>
            Submit Report
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
