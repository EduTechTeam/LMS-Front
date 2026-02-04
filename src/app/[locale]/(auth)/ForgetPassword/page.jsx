"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Link } from "@/navigation";
import apiClient from "@/utils/apiClient";
import toast, { Toaster } from "react-hot-toast";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

const ForgetPassword = () => {
    const t = useTranslations("auth");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return toast.error(t("emailRequired") || "Email is required");

        setLoading(true);

        try {
            const res = await apiClient.post(
                "/auth/forget-password",
                { email }
            );
            toast.success(res.data.message || "Check your email for reset link");
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4 font-sans">
            {/* Toaster for notifications */}
            <Toaster position="top-center" reverseOrder={false} />

            <div className="flex w-full max-w-[1200px] flex-col overflow-hidden rounded-[30px] border border-gray-200 bg-white shadow-sm lg:flex-row min-h-[600px]">

                {/* Left Side - Logo & Illustration */}
                <div className="relative flex-1 flex flex-col items-center justify-center bg-white p-8 lg:p-12">
                    <div className="absolute left-8 top-8">
                        <div className="h-[60px] w-auto max-w-[150px]">
                            <Image
                                src="/edutech logo black 5.png"
                                alt="EduTech Logo"
                                width={150}
                                height={50}
                                className="block h-full w-full object-contain"
                            />
                        </div>
                    </div>


                    {/* Illustration */}
                    <div className="mt-10 flex w-full flex-1 items-center justify-center">
                        <Image
                            src="/rafiki.png"
                            alt="Forgot Password Illustration"
                            width={550}
                            height={550}
                            className="h-auto w-[100%] object-contain max-w-[550px]"
                            priority
                        />
                    </div>
                </div>

                {/* Right Side - Forgot Password Form */}
                <div className="flex flex-1 items-center justify-center bg-white p-8 lg:p-12">
                    <div className="w-full max-w-[420px]">
                        <div className="mb-12 mt-4">
                            <h2 className="text-3xl font-bold text-center lg:text-left text-black">
                                {t("forgotPassword")}
                            </h2>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Email Input */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-700 ml-1"
                                >
                                    {t("emailLabel")}
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder=""
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-sky-400 focus:border-sky-400 focus:outline-none transition-all"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full rounded-2xl bg-[#87CEEB] py-3.5 text-xl font-semibold text-black shadow-md transition-all hover:brightness-105 hover:shadow-lg active:scale-[0.98] ${loading ? "opacity-70 cursor-not-allowed" : ""
                                        }`}
                                >
                                    {loading ? "Sending..." : t("resetPasswordButton")}
                                </button>
                            </div>

                            {/* Footer Links */}
                            <div className="mt-10 text-center text-sm">
                                <p className="text-gray-600">
                                    {t("dontHaveAccount")}{" "}
                                    <Link
                                        href="/register"
                                        className="font-bold text-gray hover:underline"
                                    >
                                        {t("signUp")}
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
