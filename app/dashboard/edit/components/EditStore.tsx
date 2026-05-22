"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

type Image = {
  id: string;
  url: string;
};

type StoreData = {
  id: string;
  title: string;
  desc: string;
  flatno: string;
  streetAddress: string;
  NearbyLandMark: string;
  areaLocality: string;
  storeSize: string;
  businessType: string;
  country: string;
  state: string;
  city: string;
  pin: string;

  priceInr: number;

  bannerImageUrl: string;
  latitude: number | null;
  longitude: number | null;
  images: Image[];
};

const EditStoreForm = ({ initialData }: { initialData: StoreData }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<StoreData>(initialData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      await axios.patch(`/api/store/update/${form.id}`, form);
      alert("Store updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update store");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Edit Store</h1>

      {/* BASIC INFO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          name="title"
          className="h-15 px-5 rounded-xl"
          value={form.title}
          onChange={handleChange}
          placeholder="Store title"
        />
        <Input
          name="businessType"
          value={form.businessType}
          onChange={handleChange}
          placeholder="Business type"
          className="h-15 px-5 rounded-xl"
        />
      </div>

      <Input
        name="desc"
        value={form.desc}
        onChange={handleChange}
        placeholder="Store description"
        className="h-15 py-5 px-5 rounded-xl w-full"
      />

      {/* LOCATION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          name="country"
          value={form.country}
          onChange={handleChange}
          className="h-15 py-5 px-5 rounded-xl w-full"
        />
        <Input
          name="state"
          value={form.state}
          onChange={handleChange}
          className="h-15 py-5 px-5 rounded-xl w-full"
        />
        <Input
          name="city"
          value={form.city}
          onChange={handleChange}
          className="h-15 py-5 px-5 rounded-xl w-full"
        />
        <Input
          name="city"
          value={form.city}
          onChange={handleChange}
          className="h-15 py-5 px-5 rounded-xl w-full"
        />
      </div>

      <Input
        name="pin"
        value={form.pin}
        onChange={handleChange}
        placeholder="PIN code"
        className="h-15 py-5 px-5 rounded-xl w-full"
      />

      {/* PRICING */}
      <Input
        type="number"
        name="priceInr"
        value={form.priceInr}
        onChange={handleChange}
        placeholder="Price in INR"
        className="h-15 py-5 px-5 rounded-xl w-full"
      />

      {/* IMAGES */}
      <Image width={500} height={500} src={form.bannerImageUrl} alt="hello" />

      <div className="grid grid-cols-3 gap-3">
        {form.images.map((img) => (
          <Image
            width={500}
            height={500}
            key={img.id}
            src={img.url}
            alt="store"
            className="h-24 w-full object-cover rounded-lg"
          />
        ))}
      </div>

      {/* GEO */}

      <Button onClick={onSubmit} disabled={loading}>
        {loading ? "Updating..." : "Update Store"}
      </Button>
    </div>
  );
};

export default EditStoreForm;
