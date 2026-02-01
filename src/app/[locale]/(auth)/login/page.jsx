"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { FaHome, FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

export default function LoginPage() {
  const t = useTranslations("auth");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    // At least 8 chars, 1 uppercase, 1 digit, 1 special char
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError(t("invalidEmail"));
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character.",
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      console.log("Form submitted:", { email, password });
      // Proceed with login logic here
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 font-sans">
      {/* Card Container */}
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-4xl bg-brand-white shadow-xl lg:flex-row border border-brand-silver/20">
        {/* Left Side - Info & Image */}
        <div className="relative flex w-full flex-col p-8 lg:w-1/2 lg:p-12">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-4">
              {/* Logo */}
              <Image
                src="/logo (2).png"
                alt="EduTech Logo"
                width={80}
                height={30}
                className="object-contain"
              />

              <Link
                href="/"
                className="flex items-center gap-2 text-sm font-bold text-brand-gray transition-colors hover:text-brand-black"
              >
                <FaHome className="text-lg" />
                {t("backToHome")}
              </Link>
            </div>

            <LanguageSwitcher />
          </div>

          {/* Illustration */}
          <div className="mt-8 flex flex-1 items-center justify-center">
            <Image
              src="/side.png"
              alt="Login Security Illustration"
              width={400}
              height={300}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex w-full flex-col justify-center p-8 lg:w-1/2 lg:p-12 xl:pr-20">
          <div className="mb-10 mt-4">
            <h2 className="text-3xl font-semibold text-brand-black">
              {t("heading")}
            </h2>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-brand-gray"
              >
                {t("emailLabel")}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                className={`block w-full rounded-xl bg-brand-silver/30 border-none px-4 py-3.5 text-brand-black placeholder-brand-gray/60 focus:ring-2 focus:bg-brand-silver/20 transition-colors ${
                  emailError ? "ring-2 ring-red-500" : "focus:ring-brand-blue"
                }`}
              />
              {emailError && (
                <p className="text-xs text-red-500 mt-1">{emailError}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-brand-gray"
                >
                  {t("passwordLabel")}
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-brand-gray hover:text-brand-black"
                >
                  {t("forgotPassword")}
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                className={`block w-full rounded-xl bg-brand-silver/30 border-none px-4 py-3.5 text-brand-black placeholder-brand-gray/60 focus:ring-2 focus:bg-brand-silver/20 transition-colors ${
                  passwordError
                    ? "ring-2 ring-red-500"
                    : "focus:ring-brand-blue"
                }`}
              />
              {passwordError && (
                <p className="text-xs text-red-500 mt-1">{passwordError}</p>
              )}
            </div>

            {/* Buttons Container */}
            <div className="space-y-4 pt-2">
              <button
                type="submit"
                className="w-full rounded-full bg-brand-blue py-3 text-lg font-bold text-brand-black shadow-md transition-all hover:brightness-105 hover:shadow-lg active:scale-[0.99]"
              >
                {t("signInButton")}
              </button>

              <div className="relative flex items-center justify-center py-2">
                <div className="h-px w-full bg-brand-silver/50"></div>
                <span className="absolute bg-brand-white px-2 text-sm font-medium text-brand-gray">
                  {t("or")}
                </span>
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-full bg-brand-silver/30 py-3 text-brand-black transition-colors hover:bg-brand-silver/40"
              >
                <FcGoogle className="text-xl text-red-500" />
                {t("google")}
              </button>
            </div>

            {/* Footer Links */}
            <div className="mt-8 space-y-3 text-center text-sm">
              <p className="text-brand-gray">
                {t("dontHaveAccount")}{" "}
                <Link
                  href="/signup"
                  className="font-bold text-brand-gray hover:underline"
                >
                  {t("signUp")}
                </Link>
              </p>
              <p>
                <Link
                  href="/org-login"
                  className="font-bold text-brand-gray hover:text-brand-black"
                >
                  {t("orgLogin")}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
