import React from "react";

const PasswordStrengthMeter = (props) => {
  const password = props.password;

  const passwordStrength = () => {
    let score = 0;
    let validateRegex = ["[A-Z]", "[a-z]", "[0-9]", "\\W"];

    validateRegex.forEach((regex) => {
      if (new RegExp(regex).test(password)) {
        score++;
      }
    });

    switch (score) {
      case 0:
        return {
          value: 0,
          info: "",
        };

      case 1:
        return {
          value: 1,
          info: "Weak",
        };

      case 2:
        return {
          value: 2,
          info: "Fair",
        };

      case 3:
        return {
          value: 3,
          info: "Good",
        };

      case 4:
        return {
          value: 4,
          info: "Strong",
        };

      default:
        return null;
    }
  };

  return (
    <div className="password-strength-meter">
      <div className="password-strength-meter-label">
        {password && (
          <p className={`strength-${passwordStrength().info}`}>
            <span>{passwordStrength().info} </span>
          </p>
        )}
      </div>
    </div>
  );
};
export default PasswordStrengthMeter;
