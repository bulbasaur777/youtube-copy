"use client";

import * as React from "react";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion, AnimatePresence } from "motion/react";

import { BsMoon } from "react-icons/bs";
import { GrLanguage } from "react-icons/gr";
import { BiSolidHelpCircle } from "react-icons/bi";

import UserSettingButton from "../UserSettingsButton/UserSettingButton";
import SwitchUI from "./SwitchMode/SwitchMode";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";

import { Lang, useLang } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import GoogleIcon from "./icons/GoogleIcon";
import SwitchAccountIcon from "./icons/SwitchAccountIcon";
import SignoutIcon from "./icons/SignoutIcon";
import YouTubeStudioIcon from "./icons/YouTubeStudioIcon";
import PurchasesIcon from "./icons/PurchasesIcon";
import YourDataIcon from "./icons/YourDataIcon";
import ThemeIcon from "./icons/ThemeIcon";
import RestrictedIcon from "./icons/RestrictedIcon";
import KeyboardIcon from "./icons/KeyboardIcon";
import SettingsIcon from "./icons/SettingsIcon";
import HelpIcon from "./icons/HelpIcon";
import FeedbackIcon from "./icons/FeedbackIcon";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";
import AddAccountIcon from "./icons/AddAccountIcon";

export default function UserSetting() {
  const [open, setOpen] = useState(false);
  const [window, setWindow] = useState<"main" | "lang" | "accounts">("main");
  const { theme, changeTheme } = useTheme();
  const { lang, changeLang, t } = useLang();

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenu.Trigger asChild>
        <UserSettingButton onClick={() => setWindow("main")} open={open} />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal forceMount>
        <AnimatePresence>
          {open && (
            <DropdownMenu.Content asChild sideOffset={8} className="z-20">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="absolute top-0 right-[-20px] flex flex-col w-[300px] overflow-hidden rounded-lg bg-bg pb-1 shadow-sm"
              >
                {window === "main" && (
                  <ul className="w-full text-text">
                    <li className="flex gap-4 px-4 py-4">
                      <div
                        className={`group flex justify-center bg-slate-600 text-white text-[1.25em] items-center relative w-10 h-10 rounded-full cursor-pointer transition-all duration-300`}
                      >
                        R
                      </div>
                      <div className="">
                        <div>ReallySeriousMan</div>
                        <div>@fullHulk</div>
                        <div className="mt-2 text-sm text-blue-600 cursor-pointer">
                          {t.Header["View your channel"]}
                        </div>
                      </div>
                    </li>

                    <li className="h-px bg-gray-5 mb-2"></li>

                    <li className="flex items-center px-4.5 py-2.5 hover:bg-gray-10 cursor-pointer text-sm">
                      <GoogleIcon className="size-6 text-gray-4 mr-4" />
                      {t.Header["Google Account"]}
                    </li>
                    <li
                      onClick={() => setWindow("accounts")}
                      className="flex items-center px-4.5 py-2.5 hover:bg-gray-10 cursor-pointer text-sm"
                    >
                      <SwitchAccountIcon className="size-6 text-gray-4 mr-4" />
                      {t.Header["Switch account"]}
                      <ChevronRightIcon className="size-6 ml-auto" />
                    </li>
                    <li className="flex items-center px-4.5 py-2.5 hover:bg-gray-10 cursor-pointer text-sm">
                      <SignoutIcon className="size-6 text-gray-4 mr-4" />
                      {t.Header["Sign out"]}
                    </li>

                    <li className="h-px bg-gray-5 my-2"></li>

                    <li className="flex items-center px-4.5 py-2.5 hover:bg-gray-10 cursor-pointer text-sm">
                      <YouTubeStudioIcon className="size-6 text-gray-4 mr-4" />
                      YouTube Studio
                    </li>

                    <li className="flex items-center px-4.5 py-2.5 hover:bg-gray-10 cursor-pointer text-sm">
                      <PurchasesIcon className="size-6 text-gray-4 mr-4" />
                      {t.Header["Purchases and memberships"]}
                    </li>

                    <li className="h-px bg-gray-5 my-2"></li>

                    <li className="flex items-center px-4.5 py-2.5 hover:bg-gray-10 cursor-pointer text-sm">
                      <YourDataIcon className="size-6 text-gray-4 mr-4" />
                      {t.Header["Your data in YouTube"]}
                    </li>

                    <li
                      onClick={changeTheme}
                      className="flex items-center px-4.5 py-2.5 hover:bg-gray-10 cursor-pointer text-sm"
                    >
                      <ThemeIcon className="size-6 text-gray-4 mr-4" />
                      {t.Header["Appearance"]}:{" "}
                      {theme === "dark" ? t.Header["Dark"] : t.Header["Light"]}
                      <SwitchUI mode={theme} />
                    </li>

                    <li
                      onClick={changeTheme}
                      className="flex items-center px-4.5 py-2.5 hover:bg-gray-10 cursor-pointer text-sm"
                    >
                      <RestrictedIcon className="size-6 text-gray-4 mr-4" />
                      {t.Header["Restricted Mode"]}:{" "}
                      {theme === "dark" ? t.Header["On"] : t.Header["Off"]}
                      <SwitchUI mode={theme} />
                    </li>

                    <li
                      onClick={() => setWindow("lang")}
                      className="flex items-center px-4.5 py-2.5 hover:bg-gray-10 cursor-pointer text-sm"
                    >
                      <GrLanguage className="size-6 text-gray-4 mr-4" />{" "}
                      {t.Header["Display Language"]}
                      <ChevronRightIcon className="size-5.5 ml-auto" />
                    </li>

                    <li className="flex items-center px-4.5 py-2.5 hover:bg-gray-10 cursor-pointer text-sm">
                      <KeyboardIcon className="size-6 text-gray-4 mr-4" />
                      {t.Header["Keyboard shortcuts"]}
                    </li>

                    <li className="h-px bg-gray-5 my-2"></li>

                    <li className="flex items-center px-4.5 py-2.5 hover:bg-gray-10 cursor-pointer text-sm">
                      <SettingsIcon className="size-6 text-gray-4 mr-4" />
                      {t.Header["Settings"]}
                    </li>

                    <li className="h-px bg-gray-5 my-2"></li>

                    <li className="flex items-center px-4.5 py-2.5 hover:bg-gray-10 cursor-pointer text-sm">
                      <HelpIcon className="size-6 text-gray-4 mr-4" />
                      {t.Header["Help"]}
                    </li>

                    <li className="flex items-center px-4.5 py-2.5 hover:bg-gray-10 cursor-pointer text-sm">
                      <FeedbackIcon className="size-6 text-gray-4 mr-4" />
                      {t.Header["Send feedback"]}
                    </li>
                  </ul>
                )}

                {window === "lang" && (
                  <div className="min-w-[280px] overflow-hidden rounded-md bg-bg pb-2">
                    <DropdownMenu.Label className="flex gap-3 text-text py-3 px-3 border-b border-gray-5">
                      <ArrowLeftIcon
                        onClick={() => setWindow("main")}
                        className="size-6 cursor-pointer"
                      />
                      {t.Header["Display Language"]}
                    </DropdownMenu.Label>
                    <DropdownMenu.Label className="px-4 py-4 text-gray-4 text-[14px]">
                      {t.Header["Buttons and display text on this browser"]}
                    </DropdownMenu.Label>

                    {langOptions.map(({ code, label }) => {
                      return (
                        <DropdownMenu.CheckboxItem
                          key={code}
                          checked={lang === code}
                          onCheckedChange={() => {
                            setWindow("main");
                            changeLang(code as Lang);
                          }}
                          onSelect={(event) => event.preventDefault()}
                          className="flex h-[25px] select-none items-center px-4 py-5 pl-12 text-[0.9em] leading-none text-text hover:bg-gray-10 cursor-pointer outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-bgHighlight data-[disabled]:text-gray-400 data-[highlighted]:text-textHighlight"
                        >
                          <DropdownMenu.ItemIndicator className="absolute left-3 inline-flex w-[25px] items-center justify-center">
                            <CheckIcon className="size-10" />
                          </DropdownMenu.ItemIndicator>
                          {label}
                        </DropdownMenu.CheckboxItem>
                      );
                    })}
                  </div>
                )}

                {window === "accounts" && (
                  <div>
                    <DropdownMenu.Label className="flex gap-3 text-text py-3 px-3 border-b border-gray-5">
                      <ArrowLeftIcon
                        onClick={() => setWindow("main")}
                        className="size-6 cursor-pointer"
                      />
                      {t.Header["Accounts"]}
                    </DropdownMenu.Label>

                    <DropdownMenu.Label className="flex flex-col py-3 pt-5 mx-4 text-text text-[0.8rem] border-b border-gray-5">
                      <div>Dima Sharikov</div>
                      <div className="text-gray-4"> dimasharikov@gmail.com</div>
                    </DropdownMenu.Label>

                    <DropdownMenu.CheckboxItem
                      // checked={lang === code}
                      // onCheckedChange={() => {
                      //   setWindow("main");
                      //   changeLang(code as Lang);
                      // }}
                      onSelect={(event) => event.preventDefault()}
                      className="flex select-none items-center px-4 py-2 text-[0.9em] leading-none text-text hover:bg-gray-10 cursor-pointer outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-bgHighlight data-[disabled]:text-gray-400 data-[highlighted]:text-textHighlight"
                    >
                      <DropdownMenu.ItemIndicator className="absolute right-3 inline-flex w-[25px] items-center justify-center">
                        <CheckIcon className="size-10" />
                      </DropdownMenu.ItemIndicator>
                      <div className="flex gap-2">
                        <div
                          className={`group flex justify-center bg-slate-600 text-white text-[1.5rem] items-center relative w-12 h-12 rounded-full cursor-pointer transition-all duration-300`}
                        >
                          R
                        </div>
                        <div className="flex flex-col gap-1">
                          <div>ReallySeriousMan</div>
                          <div className="text-[0.8rem] text-gray-4 mt-1">
                            @fullHulk
                          </div>
                          <div className="text-[0.8rem] text-gray-4">
                            Нет подписчиков
                          </div>
                        </div>
                      </div>
                    </DropdownMenu.CheckboxItem>

                    <li className="flex items-center px-3 py-3 mb-2 hover:bg-gray-10 cursor-pointer text-sm">
                      {t.Header["View All Channels"]}
                    </li>

                    <div className="h-px bg-gray-5 mb-2"></div>

                    <ul className="w-full text-text pb-1">
                      <li className="flex gap-3 items-center px-5 py-2 hover:bg-gray-10 cursor-pointer text-sm">
                        <AddAccountIcon className="size-6" />{" "}
                        {t.Header["Add account"]}
                      </li>
                      <li className="flex gap-3 items-center px-5 py-2 hover:bg-gray-10 cursor-pointer text-sm">
                        <SignoutIcon className="size-6" />{" "}
                        {t.Header["Sign out"]}
                      </li>
                    </ul>
                  </div>
                )}
              </motion.div>
            </DropdownMenu.Content>
          )}
        </AnimatePresence>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

const langOptions = [
  { code: "ru", label: "Русский" },
  { code: "ua", label: "Українська" },
  { code: "en", label: "English" },
];
