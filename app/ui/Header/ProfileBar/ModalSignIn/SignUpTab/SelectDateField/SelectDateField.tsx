"use client";

import * as React from "react";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";

type SelectProps = {
  options: string[];
  defaultValue: string;
  setFieldFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SelectUI({
  options,
  defaultValue,
  setFieldFocus,
}: SelectProps) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = React.useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <Select.Root
      value={value}
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        setFieldFocus(true);
      }}
      onValueChange={(value) => {
        setValue(options.find((option) => option === value)!);
        setIsActive(true);
      }}
    >
      <Select.Trigger
        className={`inline-flex h-[35px] w-[110px] items-center justify-between gap-[5px] pl-[8px] pr-[8px] text-[13px] leading-none ${
          isActive ? "text-text" : "text-gray-4"
        }  outline-none hover:bg-bgHighlight/5 cursor-pointer transition-all duration-300`}
        aria-label="Food"
        // onFocus={() => {
        //   setFieldFocus(true);
        // }}
      >
        <Select.Value asChild>
          <div className="flex">
            <span className="text-[1.15em]">{value}</span>
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
          className="overflow-hidden bg-gray-3 max-h-[250px] z-4"
        >
          <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-gray-3 text-text">
            <ChevronUpIcon className="size-5" />
          </Select.ScrollUpButton>
          <Select.Viewport className="">
            <Select.Group>
              {options.map((item) => {
                return (
                  <SelectItem
                    key={item}
                    value={item}
                    className="bg-gray-3 hover:bg-gray-2"
                  >
                    <div className="flex">
                      <span className="mr-1">{item}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-gray-3 text-text">
            <ChevronDownIcon className="size-5" />
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
