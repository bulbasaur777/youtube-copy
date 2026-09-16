"use client";

import DateField from "./DataField/DateField";
import LicenceAgreement from "./LicenceAgreement/LicenceAgreement";
import LoginInput from "./LoginInput/LoginInput";
import NameInput from "./NameInput/NameInput";
import PasswordInput from "./PasswordInput/PasswordInput";
import SignUpButton from "./SignInButton/SignUpButton";
import SocialAuth from "./SocialAuth/SocialAuth";

export default function SignUpTab() {
  return (
    <div className="flex flex-col gap-6">
      <LoginInput />
      <NameInput />
      <PasswordInput />
      <DateField />
      <SignUpButton />
      <SocialAuth />
      <LicenceAgreement />
    </div>
  );
}
