"use client";

import * as React from "react";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";

type countriesOptions = {
  name: string;
  number: string;
  flagShift: number;
};

type SelectProps = {
  options: countriesOptions[];
};

export default function SelectUI({ options }: SelectProps) {
  const [value, setValue] = useState(options[0]);
  const [open, setOpen] = React.useState(false);

  return (
    <Select.Root
      value={value.name}
      open={open}
      onOpenChange={setOpen}
      onValueChange={(value) =>
        setValue(options.find((option) => option.name === value)!)
      }
    >
      <Select.Trigger
        className="inline-flex h-[35px] items-center justify-center gap-[5px] pr-[8px] text-[13px] leading-none text-text outline-none hover:bg-bgHighlight/5 cursor-pointer transition-all duration-300"
        aria-label="Food"
      >
        <Select.Value asChild>
          <div className="flex">
            <div
              className="w-[20px] h-[15px] bg-[url('/flags.png')] bg-no-repeat mr-2"
              style={{ backgroundPosition: `-${value.flagShift}px 0px` }}
            />{" "}
            <span className="text-[1.15em]">{value.number}</span>
          </div>
        </Select.Value>
        <Select.Icon
          className={`text-text transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          side="bottom"
          sideOffset={2}
          className="overflow-hidden bg-gray-3 z-4"
        >
          <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-text text-text">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="">
            <Select.Group>
              {options.map((item) => {
                return (
                  <SelectItem
                    key={item.name}
                    value={item.name}
                    className="bg-gray-3 hover:bg-gray-2"
                  >
                    <div className="flex">
                      <div
                        className="w-[20px] h-[15px] bg-[url('/flags.png')] bg-no-repeat mr-2"
                        style={{
                          backgroundPosition: `-${item.flagShift}px 0px`,
                        }}
                      />{" "}
                      <span className="mr-1">{item.name}</span>
                      <span>{item.number}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-text">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

type SelectItemProps = React.ComponentPropsWithoutRef<typeof Select.Item>;

const SelectItem = React.forwardRef<
  HTMLDivElement,
  SelectItemProps & { className?: string }
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item
      className={
        "relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-text bg-bg data-[disabled]:pointer-events-none data-[disabled]:text-gray-400 data-[highlighted]:bg-bgHighlight data-[highlighted]:text-textHighlight data-[highlighted]:outline-none cursor-pointer " +
        className
      }
      {...props}
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
});

SelectItem.displayName = "SelectItem";
