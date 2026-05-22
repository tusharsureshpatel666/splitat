import React from "react";
import ProfileHeader from "./components/profileheader";
import Heading from "../components/heading";
import LikeStore from "./components/likestore";

const page = () => {
  return (
    <div>
      <ProfileHeader />
      <Heading title="Liked Store" className="text-xl text-center" />
      <LikeStore />
    </div>
  );
};

export default page;
