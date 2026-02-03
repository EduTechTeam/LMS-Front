"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Link, useRouter } from "@/navigation";
import apiClient from "@/utils/apiClient";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { FaHome, FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

export default function LoginPage() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    // At least 8 chars, 1 uppercase, 1 digit, 1 special char
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!validateEmail(email)) {
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
      setLoading(true);
      try {
        const response = await apiClient.post(
          "/auth/login",
          {
            email,
            password,
          },
          { withCredentials: true },
        );
        toast.success("Login successfully");
        router.push("/");
      } catch (error) {
        console.error("Login Error:", error);
        const message =
          error.response?.data?.message || "Login failed. Please try again.";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="flex w-full max-w-[1500px] flex-col overflow-hidden rounded-[30px] pb-5 border border-gray-200 bg-white shadow-sm lg:flex-row">
        {/* Left Side - Info & Image */}
        <div className="relative flex shrink-0 flex-col items-center justify-center bg-white p-8 lg:w-1/2 lg:p-12">
          <div className="relative mb-5 lg:absolute lg:left-8 lg:top-8 lg:mb-0">
            <div className="h-[150px] w-[150px] lg:h-[100px] lg:w-[100px]">
              <Image
                src="/edutech logo black 5.png"
                alt={t("logoAlt")}
                width={200}
                height={200}
                className="block h-full w-full object-contain"
              />
            </div>
          </div>

          <div className="absolute right-8 top-11">
            <LanguageSwitcher />
          </div>

          {/* Illustration */}
          <div className="mt-16 hidden w-full flex-1 items-center justify-center lg:flex">
            <Image
              src="/side.png"
              alt="Login Security Illustration"
              width={450}
              height={300}
              className="h-auto w-[85%] object-contain"
              priority
            />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center bg-white p-6 lg:p-12">
          <div className="w-full max-w-[420px]">
            <div className="mb-10 mt-4">
              <h2 className="text-3xl text-center font-semibold text-heading">
                {t("heading")}
              </h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-label"
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
                  className={`block w-full rounded-xl bg-brand-white border-gray-400 border-2 px-5 py-2.5 text-heading placeholder-placeholder focus:bg-input-focus-bg focus:border-input-focus-border transition-colors ${
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
                    className="block text-sm font-semibold text-label"
                  >
                    {t("passwordLabel")}
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-label hover:text-heading"
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
                  className={`block w-full rounded-xl bg-brand-white border-gray-400 border-2 px-5 py-2.5 text-heading placeholder-placeholder focus:bg-input-focus-bg focus:border-input-focus-border transition-colors ${
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
              <div className="space-y-4 pt-2 flex flex-col">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-[100%] self-center rounded-2xl bg-brand-blue py-2 text-[24px] font-semibold text-brand-black shadow-md transition-all hover:brightness-105 hover:shadow-lg active:scale-[0.99] ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Logging in..." : t("signInButton")}
                </button>

                <div className="relative flex items-center justify-center py-2 before:h-px before:w-[100%] before:bg-black">
                  <span className="absolute bg-brand-white px-2 text-sm font-medium text-black">
                    {t("or")}
                  </span>
                </div>

                <button
                  type="button"
                  className="flex w-[100%] rounded-2xl self-center justify-center gap-3 bg-brand-white border-gray-400 border-2 py-2 text-black text-[22px] font-medium transition-colors hover:bg-google-btn-hover"
                >
                  <FcGoogle className="text-3xl mt-[3px] " />
                  {t("google")}
                </button>
              </div>

              {/* Footer Links */}
              <div className="mt-8 space-y-3 text-center text-sm">
                <p className="text-label">
                  {t("dontHaveAccount")}{" "}
                  <Link
                    href="/signup"
                    className="font-bold text-label hover:text-link-hover hover:underline"
                  >
                    {t("signUp")}
                  </Link>
                </p>
                <p>
                  <Link
                    href="/org-login"
                    className="font-bold text-label hover:text-heading"
                  >
                    {t("orgLogin")}
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
