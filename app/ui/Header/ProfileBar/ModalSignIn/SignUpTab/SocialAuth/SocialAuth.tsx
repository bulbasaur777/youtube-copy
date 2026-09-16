import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

export default function SocialAuth() {
  return (
    <>
      <div className="relative flex justify-center mt-3">
        <div className="absolute w-[70%] top-0 border-t border-gray-5">
          <div className="absolute top-[-12px] flex justify-center w-full">
            <span className="bg-bg-main px-4 text-text">или</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-2">
        <div className="flex justify-evenly w-[80%]">
          <div className="flex justify-center items-center px-6 py-2 bg-gray rounded cursor-pointer hover:bg-gray-5">
            <FaFacebookF className="size-7 text-blue-500" />
          </div>
          <div className="flex justify-center items-center px-6 py-2 bg-gray rounded cursor-pointer hover:bg-gray-5">
            <FcGoogle className="size-8" />
          </div>
          <div className="flex justify-center items-center px-6 py-2 bg-gray rounded cursor-pointer hover:bg-gray-5">
            <FaApple className="size-8 text-text" />
          </div>
        </div>
      </div>
    </>
  );
}
