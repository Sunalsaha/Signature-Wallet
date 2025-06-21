const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  setGeneratedOtp(otp);

  // Simulate async OTP sending delay
  setTimeout(() => {
    alert(`Demo OTP sent: ${otp}`);
    setShowOtpInput(true);
    setLoading(false);
  }, 1000);
};
