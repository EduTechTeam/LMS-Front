"use client";

import { Link } from "@/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import apiClient from "@/utils/apiClient";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

export default function RegisterPage() {
  const t = useTranslations("auth");

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

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
    const errors = {};

    // Full Name
    if (!fullName.trim()) {
      errors.fullName = t("fullNameRequired") || "Full name is required";
    }

    // Username
    if (!username.trim()) {
      errors.username = t("usernameRequired") || "Username is required";
    }

    // Email
    if (!email.trim()) {
      errors.email = t("emailRequired") || "Email is required";
    } else if (!validateEmail(email)) {
      errors.email = t("invalidEmail") || "Please enter a valid email address.";
    }

    // Password
    if (!password) {
      errors.password = t("passwordRequired") || "Password is required";
    } else if (!validatePassword(password)) {
      errors.password =
        t("weakPassword") ||
        "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character.";
    }

    // Confirm Password
    if (!confirmPassword) {
      errors.confirmPassword =
        t("confirmPasswordRequired") || "Please confirm your password";
    } else if (password !== confirmPassword) {
      errors.confirmPassword =
        t("passwordsDoNotMatch") || "Passwords do not match";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Form submitted:", {
        fullName,
        username,
        email,
      });
      // Proceed with registration logic
      apiClient
        .post("/auth/register", {
          username,
          email,
          password,
          full_name: fullName,
        })
        .then(() => {
          toast.success("registred successufully");
        })
        .catch((error) => {
          console.error("Registration error:", error);
          toast.error(error.response?.data?.message || "Registration failed");
        });
    }
  };
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="flex w-full max-w-[1500px] flex-col overflow-hidden rounded-[30px] border border-gray-200 bg-white shadow-sm lg:flex-row">
        {/* Left Side - Illustration */}
        <div className="relative flex shrink-0 flex-col items-center justify-center bg-white p-8 lg:w-1/2 lg:p-12">
          <div className="absolute left-8 top-8">
            <div className="h-[60px] w-[60px]">
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

          <div className="mt-16 flex w-full flex-1 items-center justify-center">
            <Image
              src="/Rectangle 8.png"
              alt=""
              width={800}
              height={600}
              className="h-auto w-[85%] object-contain"
              priority
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-1 items-center justify-center bg-white p-6 lg:p-12">
          <div className="w-full max-w-[420px]">
            <h1 className="mb-4 text-center text-2xl font-bold tracking-tighter text-heading lg:mb-6 lg:text-[1.75rem]">
              {t("registerHeading")}
            </h1>

            <form
              className="flex flex-col gap-3 lg:gap-4"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-[0.4rem]">
                <label
                  htmlFor="fullName"
                  className="text-sm font-medium text-[#475569]"
                >
                  {t("fullNameLabel")}
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (formErrors.fullName)
                      setFormErrors({ ...formErrors, fullName: "" });
                  }}
                  required
                  className={`h-[38px] w-full rounded-[10px] border-2 bg-brand-silver px-4 py-[0.6rem] text-[0.95rem] text-heading transition-all duration-300 placeholder-placeholder focus:bg-input-focus-bg focus:border-input-focus-border focus:outline-none focus:ring-4 focus:ring-input-focus-border/10 lg:h-[42px] lg:py-3 ${
                    formErrors.fullName
                      ? "border-red-500"
                      : "border-transparent"
                  }`}
                />
                {formErrors.fullName && (
                  <p className="text-xs text-red-500">{formErrors.fullName}</p>
                )}
              </div>

              <div className="flex flex-col gap-[0.4rem]">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-[#475569]"
                >
                  {t("usernameLabel") || "Username"}
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (formErrors.username)
                      setFormErrors({ ...formErrors, username: "" });
                  }}
                  required
                  className={`h-[38px] w-full rounded-[10px] border-2 bg-brand-silver px-4 py-[0.6rem] text-[0.95rem] text-heading transition-all duration-300 placeholder-placeholder focus:bg-input-focus-bg focus:border-input-focus-border focus:outline-none focus:ring-4 focus:ring-input-focus-border/10 lg:h-[42px] lg:py-3 ${
                    formErrors.username
                      ? "border-red-500"
                      : "border-transparent"
                  }`}
                />
                {formErrors.username && (
                  <p className="text-xs text-red-500">{formErrors.username}</p>
                )}
              </div>

              <div className="flex flex-col gap-[0.4rem]">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-[#475569]"
                >
                  {t("emailLabel")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (formErrors.email)
                      setFormErrors({ ...formErrors, email: "" });
                  }}
                  required
                  className={`h-[38px] w-full rounded-[10px] border-2 bg-brand-silver px-4 py-[0.6rem] text-[0.95rem] text-heading transition-all duration-300 placeholder-placeholder focus:bg-input-focus-bg focus:border-input-focus-border focus:outline-none focus:ring-4 focus:ring-input-focus-border/10 lg:h-[42px] lg:py-3 ${
                    formErrors.email ? "border-red-500" : "border-transparent"
                  }`}
                />
                {formErrors.email && (
                  <p className="text-xs text-red-500">{formErrors.email}</p>
                )}
              </div>

              <div className="flex flex-col gap-[0.4rem]">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-[#475569]"
                >
                  {t("passwordLabel")}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (formErrors.password)
                      setFormErrors({ ...formErrors, password: "" });
                  }}
                  required
                  className={`h-[38px] w-full rounded-[10px] border-2 bg-brand-silver px-4 py-[0.6rem] text-[0.95rem] text-heading transition-all duration-300 placeholder-placeholder focus:bg-input-focus-bg focus:border-input-focus-border focus:outline-none focus:ring-4 focus:ring-input-focus-border/10 lg:h-[42px] lg:py-3 ${
                    formErrors.password
                      ? "border-red-500"
                      : "border-transparent"
                  }`}
                />
                {formErrors.password && (
                  <p className="text-xs text-red-500">{formErrors.password}</p>
                )}
              </div>

              <div className="flex flex-col gap-[0.4rem]">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-label"
                >
                  {t("confirmPasswordLabel")}
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (formErrors.confirmPassword)
                      setFormErrors({ ...formErrors, confirmPassword: "" });
                  }}
                  required
                  className={`h-[38px] w-full rounded-[10px] border-2 bg-brand-silver px-4 py-[0.6rem] text-[0.95rem] text-heading transition-all duration-300 placeholder-placeholder focus:bg-input-focus-bg focus:border-input-focus-border focus:outline-none focus:ring-4 focus:ring-input-focus-border/10 lg:h-[42px] lg:py-3 ${
                    formErrors.confirmPassword
                      ? "border-red-500"
                      : "border-transparent"
                  }`}
                />
                {formErrors.confirmPassword && (
                  <p className="text-xs text-red-500">
                    {formErrors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="mt-2 self-center w-[50%] cursor-pointer rounded-[10px] border-none bg-brand-blue p-[0.65rem] text-[0.9rem] font-semibold tracking-[0.3px] text-brand-black shadow-[0_4px_12px_var(--color-shadow-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_var(--color-brand-blue)] active:translate-y-0 lg:p-3 lg:text-base"
              >
                {t("signUpButton")}
              </button>

              <div className="relative my-[0.5rem] flex items-center gap-4 text-center lg:my-3 lg:gap-4 before:h-px before:flex-1 before:bg-divider after:h-px after:flex-1 after:bg-divider">
                <span className="bg-brand-white px-4 text-[0.8rem] font-medium text-black">
                  {t("orCaps")}
                </span>
              </div>

              <button
                type="button"
                className="flex self-center w-[50%] cursor-pointer items-center justify-center gap-3 rounded-[10px] border-none bg-brand-silver p-[0.65rem] text-[0.9rem] font-semibold text-label transition-all duration-300 hover:-translate-y-0.5 hover:bg-google-btn-hover hover:shadow-[0_4px_12px_var(--color-shadow-google)] active:translate-y-0 lg:p-3 lg:text-[0.95rem]"
              >
                <FcGoogle className="text-2xl" />

                {t("google")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
