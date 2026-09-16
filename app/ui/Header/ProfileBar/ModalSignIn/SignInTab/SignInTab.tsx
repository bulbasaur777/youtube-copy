"use client";

import LicenceAgreement from "./LicenceAgreement/LicenceAgreement";
import LoginInput from "./LoginInput/LoginInput";
import PasswordInput from "./PasswordInput/PasswordInput";
import SignInButton from "./SignInButton/SignInButton";
import SocialAuth from "./SocialAuth/SocialAuth";

export default function SignInTab() {
  return (
    <div className="flex flex-col gap-6">
      <LoginInput />
      <PasswordInput />
      <SignInButton />
      <SocialAuth />
      <LicenceAgreement />
    </div>
  );
}
