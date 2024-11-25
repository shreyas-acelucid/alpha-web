"use client";
import { NextPage } from "next";
import { Button } from "@mui/material";
import { useState } from "react";
import InputWrapper from "../components/common/InputWrapper";
import { loginDietitian } from "../hooks/useAuth";
import { setRole, setToken } from "../utils/helpers";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LogIn: NextPage = () => {
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateInputs();
    if (!isValid) {
      return;
    } else {
      const data = new FormData(event.currentTarget);
      login(data.get("email") as string, data.get("password") as string);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const tokenResponse = await loginDietitian({ email, password });
      setToken(tokenResponse);
      setRole('diet');
      router.push("/users");
    } catch (error) {
      toast.error("Login failed");
    }
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    let isValid = true;
    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailErrorMessage("");
    }
    return isValid;
  };

  return (
    <section className="container">
      <div className="flex flex-col items-center justify-center mx-auto">
        <div className="flex items-center my-6 text-3xl font-bold text-dark">
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Alpha nutrition
        </div>
        <div className="w-full bg-primary-200 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="font-bold leading-tight tracking-tight text-dark text-2xl">
              Sign in as a dietitian
            </h1>
            <form onSubmit={handleSubmit}>
              <InputWrapper
                id="email"
                label="Email"
                required
                error={emailErrorMessage}
              >
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="Enter your email address"
                  inputMode="email"
                />
              </InputWrapper>
              <InputWrapper id="password" label="Password" required>
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="password"
                  required
                  placeholder="Enter your password"
                  minLength={3}
                  // onChange={(e) => setFullName(e.target.value.trimStart())}
                  maxLength={50}
                />
              </InputWrapper>
              <div className="text-center">
                <Button className="!w-full" type="submit">
                  Sign In
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
