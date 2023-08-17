import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const PasswordValidation = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    validatePasswordsMatch(event.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    validatePasswordsMatch(password, event.target.value);
  };

  const validatePasswordsMatch = (password, confirmPassword) => {
    setPasswordsMatch(password === confirmPassword);
  };

  return (
    <div>
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <TextField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        error={!passwordsMatch}
        helperText={!passwordsMatch && "Passwords do not match"}
      />
    </div>
  );
};

export default PasswordValidation;
