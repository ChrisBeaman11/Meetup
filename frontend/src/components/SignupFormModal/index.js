import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      email: "invalid email",
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <>
      <div className="signupModal">
        <h1 className="signupHeader">Join Airbnb</h1>
        <p className="signupSubheader">
          Discover amazing places to stay around the world.
        </p>
        <form className="signupForm" onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.email && <p className="errors">{errors.email}</p>}
          {errors.username && <p className="errors">{errors.username}</p>}
          {errors.firstName && <p className="errors">{errors.firstName}</p>}
          {errors.lastName && <p className="errors">{errors.lastName}</p>}
          {errors.password && <p className="errors">{errors.password}</p>}
          {errors.confirmPassword && (
            <p className="errors">{errors.confirmPassword}</p>
          )}
          <button
            className="signupButton"
            disabled={
              username.length < 4 ||
              password.length < 6 ||
              email.length < 1 ||
              confirmPassword.length < 1 ||
              firstName.length < 1 ||
              lastName.length < 1
            }
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
