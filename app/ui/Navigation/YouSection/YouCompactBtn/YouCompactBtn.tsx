import React from "react";
import { YouIcon, YouIconActive } from "../../Icons/YouIcon";

function YouCompactBtn(
  {
    title,
    isActive = false,
    ...props
  }: {
    title: string;
    isActive: boolean;
  },
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      {...props}
      className="group flex flex-col gap-1.5 justify-center items-center py-4 hover:bg-gray-10 data-[state=open]:bg-gray-10 cursor-pointer text-[0.9rem] rounded-lg"
    >
      {isActive ? (
        <svg
          aria-hidden="true"
          className={`w-[25px] h-[25px] fill-current transition-colors text-text`}
        >
          <YouIconActive />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          className={`w-[25px] h-[25px] fill-current transition-colors text-text`}
        >
          <YouIcon />
        </svg>
      )}
      <div className={`text-text text-[0.6rem] `}>{title}</div>
    </div>
  );
}

export default React.forwardRef(YouCompactBtn);
