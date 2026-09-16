import React from "react";
import Image from "next/image";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
};

const UserSettingButton = React.forwardRef<HTMLDivElement, Props>(
  ({ open, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={`
        group flex justify-center mr-3 bg-slate-600 text-white text-[1.1em] items-center relative w-8.5 h-8.5 rounded-full cursor-pointer
        ${open ? "" : ""} transition-all duration-300
      `}
      >
        R
        {/* <div className="w-8 h-8 rounded-full">
          <Image src="" alt="" width={100} height={100} />
        </div> */}
      </div>
    );
  },
);

UserSettingButton.displayName = "UserSettingButton";
export default UserSettingButton;
