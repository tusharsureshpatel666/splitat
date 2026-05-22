import Banner from "./banner";
import Navbar from "./Header";
import LoginForm from "./LoginForm";

export default function Page() {
  return (
    <div className="">
      <Navbar />

      <div className="flex flex-col ">
        {/* LEFT SIDE: LOGIN FORM */}
        <div className="flex  justify-center items-center w-full  px-6">
          <LoginForm />
        </div>

        {/* RIGHT SIDE: TESTIMONIAL / BANNER */}
      </div>
    </div>
  );
}
