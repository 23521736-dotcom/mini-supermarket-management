import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/ui/Logo";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import "./ForgetPass.css";

const ForgetPass = () => {
  const [currentStep, setCurrentStep] = useState("email"); // "email" or "verification"
  const [formData, setFormData] = useState({
    email: "",
    verificationCode: "",
  });
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log("Sending verification code to:", formData.email);

    // Simple validation
    if (!formData.email) {
      return;
    }

    // Simulate sending verification code
    setCurrentStep("verification");
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    console.log("Verifying code:", formData.verificationCode);

    // Simple validation
    if (!formData.verificationCode) {
      return;
    }

    // Simulate verification
    navigate("/auth/signin");
  };

  const handleResendCode = async () => {
    setIsResending(true);
    console.log("Resending verification code to:", formData.email);

    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
    }, 2000);
  };

  const handleBackToSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className="forget-pass-container">
      <div className="forget-pass-card">
        <Logo />

        {currentStep === "email" ? (
          <>
            <div className="forget-pass-header">
              <h2 className="forget-pass-title">Forgot Password</h2>
              <p className="forget-pass-subtitle">
                Enter your email address and we'll send you a verification code
                to reset your password.
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="forget-pass-form">
              <div className="forget-pass-group">
                <label className="forget-pass-label">Email Address</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  icon="✉️"
                  required
                />
              </div>

              <Button type="submit" size="large" className="forget-pass-button">
                Send Verification Code
              </Button>
            </form>
          </>
        ) : (
          <>
            <div className="forget-pass-header">
              <h2 className="forget-pass-title">Enter Verification Code</h2>
              <p className="forget-pass-subtitle">
                We've sent a verification code to{" "}
                <strong>{formData.email}</strong>
              </p>
            </div>

            <form
              onSubmit={handleVerificationSubmit}
              className="forget-pass-form"
            >
              <div className="forget-pass-group">
                <label className="forget-pass-label">Verification Code</label>
                <Input
                  type="text"
                  name="verificationCode"
                  placeholder="Enter 6-digit verification code"
                  value={formData.verificationCode}
                  onChange={handleInputChange}
                  icon="🔢"
                  maxLength="6"
                  required
                />
              </div>

              <div className="forget-pass-actions">
                <Button
                  type="button"
                  size="large"
                  className="forget-pass-resend-button"
                  onClick={handleResendCode}
                  disabled={isResending}
                >
                  {isResending ? "Sending..." : "Resend Code"}
                </Button>

                <Button
                  type="submit"
                  size="large"
                  className="forget-pass-button"
                >
                  Verify Code
                </Button>
              </div>
            </form>
          </>
        )}

        <div className="forget-pass-footer">
          <span className="forget-pass-footer-text">
            Remember your password?{" "}
          </span>
          <button
            type="button"
            className="forget-pass-back-link"
            onClick={handleBackToSignIn}
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
