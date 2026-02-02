"use client";

import './page.css';
import { Link } from '@/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function RegisterPage() {

    const t = useTranslations("auth");
    return (
        <div className="register-container">
            {/* Left Side - Illustration */}
            <div className="left-section">
                <div className="logo-container">
                    <div className="logo">
                        <div className="logo-icon"><Image src="/edutech logo black 5.png" alt={t("logoAlt")} width={200} height={200} /></div>
                    </div>
                </div>
                <div className="back-to-home-container">
                    <Link href="/" className="back-to-home">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        {t("backToHome")}
                    </Link>
                </div>
                <div className="illustration">
                    <img src="/Rectangle 8.png" alt="" />
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="right-section">
                <div className="form-container">
                    <h1 className="form-title">{t("registerHeading")}</h1>

                    <form className="register-form">
                        <div className="form-group">
                            <label htmlFor="fullName">{t("fullNameLabel")}</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                placeholder=""
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">{t("emailLabel")}</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder=""
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">{t("passwordLabel")}</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder=""
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">{t("confirmPasswordLabel")}</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder=""
                                required
                            />
                        </div>

                        <button type="submit" className="submit-btn">
                            {t("signUpButton")}
                        </button>

                        <div className="divider">
                            <span>{t("orCaps")}</span>
                        </div>

                        <button type="button" className="google-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                            </svg>
                            {t("google")}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
