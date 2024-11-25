"use client";
import { NextPage } from "next";
import InputWrapper from "../components/common/InputWrapper";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUpUser } from "../hooks/useAuth";

const SignUp: NextPage = () => {
  const router = useRouter();
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [dobErrorMessage, setDobErrorMessage] = useState<string>("");
  const [isPregnant, setIsPregnant] = useState<boolean>(false);
  const [gender, setGender] = useState<string>("");
  const [dietary, setDietary] = useState<string>("");
  const [goalType, setGoalType] = useState<string>("");
  const [allergens, setAllergens] = useState<string[]>([]);
  const [disorders, setDisorders] = useState<string[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);
  const [occupation, setOccupation] = useState<string>("");
  const [activities, setActivities] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [bmi, setBmi] = useState<number>(0);
  const [sleepDuration, setSleepDuration] = useState<number>(0);
  const [dailyActivityDuration, setDailyActivityDuration] =
    useState<string>("");

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const dob = document.getElementById("dob") as HTMLInputElement;

    let isValid = true;
    const dobRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else if (!dob.value || !dobRegex.test(dob.value)) {
      setDobErrorMessage(
        "Please enter a valid date of birth in YYYY-MM-DD format."
      );
      isValid = false;
    } else {
      setEmailErrorMessage("");
    }
    return isValid;
  };

  const signup = async () => {
    try {
      const userResponse = await signUpUser({
        name,
        dob,
        phone,
        email,
        password,
        gender,
        pregnancy: isPregnant,
        goal: goalType,
        allergens,
        dietary,
        disorders,
        common_conditions: conditions,
        weight,
        height,
        bmi,
        sleep_duration: sleepDuration,
        occupation,
        daily_activity_duration: dailyActivityDuration,
        physical_activities_preferred: activities,
        created_by: "user",
        updated_by: "user",
      });
      if (userResponse) router.push("/login");
    } catch (error) {
      toast.error("Sign up failed");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateInputs();
    if (!isValid) {
      return;
    } else {
      signup();
    }
  };

  const addAllergen = () => {
    const allergen = document.getElementById("allergens") as HTMLInputElement;
    if (allergen.value === "") return;
    setAllergens((prev) => [...prev, allergen.value.trim()]);
    allergen.value = "";
  };

  const addDisorder = () => {
    const disorder = document.getElementById("disorders") as HTMLInputElement;
    if (disorder.value === "") return;
    setDisorders((prev) => [...prev, disorder.value.trim()]);
    disorder.value = "";
  };

  const addCondition = () => {
    const condition = document.getElementById("conditions") as HTMLInputElement;
    if (condition.value === "") return;
    setConditions((prev) => [...prev, condition.value.trim()]);
    condition.value = "";
  };

  const addActivity = () => {
    const activity = document.getElementById("activities") as HTMLInputElement;
    if (activity.value === "") return;
    setActivities((prev) => [...prev, activity.value.trim()]);
    activity.value = "";
  };

  return (
    <section className="container">
      <div className="flex flex-col items-center justify-center mx-auto md:max-w-[90%]">
        <div className="flex items-center my-6 text-3xl font-bold text-dark">
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Alpha nutrition
        </div>
        <div className="w-full bg-primary-200 rounded-lg shadow">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="font-bold leading-tight tracking-tight text-dark text-2xl">
              Register as a new user
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-x-5">
                <div className="flex-1">
                  <InputWrapper id="name" label="Name" required>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="off"
                      required
                      placeholder="Enter your name"
                      inputMode="text"
                      maxLength={50}
                      value={name}
                      onChange={(e) => setName(e.target.value.trimStart())}
                    />
                  </InputWrapper>
                </div>
                <div className="flex-1">
                  <InputWrapper id="phone" label="Phone" required>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      autoComplete="off"
                      required
                      placeholder="Enter your phone no"
                      inputMode="text"
                      minLength={10}
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.trimStart())}
                    />
                  </InputWrapper>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-x-5">
                <div className="flex-1">
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
                      autoComplete="off"
                      required
                      placeholder="Enter your email address"
                      inputMode="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.trimStart())}
                    />
                  </InputWrapper>
                </div>
                <div className="flex-1">
                  <InputWrapper id="password" label="Password" required>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      autoComplete="off"
                      required
                      placeholder="Enter your password"
                      minLength={3}
                      value={password}
                      onChange={(e) => setPassword(e.target.value.trimStart())}
                      maxLength={16}
                    />
                  </InputWrapper>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-x-5">
                <div className="flex-1">
                  <InputWrapper id="gender" label="Gender" required>
                    <select
                      id="gender"
                      name="gender"
                      required
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="" disabled hidden>
                        Select your gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </InputWrapper>
                </div>
                <div className="flex-1">
                  {gender === "female" && (
                    <InputWrapper
                      id="isPregnant"
                      label="Are you currently pregnant?"
                      required
                    >
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="pregnant"
                          name="pregnant"
                          value={isPregnant}
                          row
                        >
                          <FormControlLabel
                            value={true}
                            control={<Radio />}
                            checked={isPregnant}
                            onChange={() => setIsPregnant(true)}
                            label="Yes"
                          />
                          <FormControlLabel
                            value={false}
                            control={<Radio />}
                            checked={!isPregnant}
                            onChange={() => setIsPregnant(false)}
                            label="No"
                          />
                        </RadioGroup>
                      </FormControl>
                    </InputWrapper>
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-x-5">
                <div className="flex-1">
                  <InputWrapper
                    id="dietary"
                    label="Dietary preference"
                    required
                  >
                    <select
                      id="dietary"
                      name="dietary"
                      required
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                    >
                      <option value="" disabled hidden>
                        Select your dietary preference
                      </option>
                      <option value="veg">Veg</option>
                      <option value="nonveg">Non Veg</option>
                      <option value="vegan">Vegan</option>
                      <option value="egg">Egg</option>
                      <option value="pescatarian">Fish</option>
                    </select>
                  </InputWrapper>
                </div>
                <div className="flex-1">
                  <InputWrapper
                    id="allergens"
                    label="Allergens"
                    explain={allergens.join(", ")}
                  >
                    <input
                      type="text"
                      id="allergens"
                      name="allergens"
                      autoComplete="off"
                      placeholder="Enter any allergens you may have"
                      inputMode="text"
                    />
                    <Button
                      onClick={addAllergen}
                      className="!mt-2 !me-2 !rounded-full"
                    >
                      Add
                    </Button>
                  </InputWrapper>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-x-5">
                <div className="flex-1">
                  <InputWrapper
                    id="disorders"
                    label="Disorders"
                    explain={disorders.join(", ")}
                  >
                    <input
                      type="text"
                      id="disorders"
                      name="disorders"
                      autoComplete="off"
                      placeholder="Enter any disorders you may have"
                      inputMode="text"
                    />
                    <Button
                      onClick={addDisorder}
                      className="!mt-2 !me-2 !rounded-full"
                    >
                      Add
                    </Button>
                  </InputWrapper>
                </div>
                <div className="flex-1">
                  <InputWrapper
                    id="conditions"
                    label="Conditions"
                    explain={conditions.join(", ")}
                  >
                    <input
                      type="text"
                      id="conditions"
                      name="conditions"
                      autoComplete="off"
                      placeholder="Enter any health conditions you may have"
                      inputMode="text"
                    />
                    <Button
                      onClick={addCondition}
                      className="!mt-2 !me-2 !rounded-full"
                    >
                      Add
                    </Button>
                  </InputWrapper>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-x-5">
                <div className="flex-1">
                  <InputWrapper
                    id="goaltype"
                    label="What is your goal?"
                    required
                  >
                    <select
                      id="goaltype"
                      name="goaltype"
                      required
                      value={goalType}
                      onChange={(e) => setGoalType(e.target.value)}
                    >
                      <option value="" disabled hidden>
                        Select your goal
                      </option>
                      <option value="lose weight">Lose weight</option>
                      <option value="gain muscle">Gain muscle</option>
                      <option value="maintain weight">
                        Maintain weight and stay fit
                      </option>
                    </select>
                  </InputWrapper>
                </div>
                <div className="flex-1">
                  <InputWrapper id="weight" label="Weight" required>
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      autoComplete="off"
                      required
                      placeholder="Enter your weight"
                      inputMode="numeric"
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                    />
                  </InputWrapper>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-x-5">
                <div className="flex-1">
                  <InputWrapper id="height" label="Height" required>
                    <input
                      type="number"
                      id="height"
                      name="height"
                      autoComplete="off"
                      required
                      placeholder="Enter your height"
                      inputMode="numeric"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                    />
                  </InputWrapper>
                </div>
                <div className="flex-1">
                  <InputWrapper id="bmi" label="BMI" required>
                    <input
                      type="number"
                      id="bmi"
                      name="bmi"
                      autoComplete="off"
                      required
                      placeholder="Enter your BMI"
                      inputMode="numeric"
                      value={bmi}
                      onChange={(e) => setBmi(Number(e.target.value))}
                    />
                  </InputWrapper>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-x-5">
                <div className="flex-1">
                  <InputWrapper
                    id="sleepduration"
                    label="Sleep duration in hours"
                    required
                  >
                    <input
                      type="number"
                      id="sleepduration"
                      name="sleepduration"
                      autoComplete="off"
                      required
                      placeholder="Enter your sleeping duration"
                      inputMode="numeric"
                      value={sleepDuration}
                      onChange={(e) => setSleepDuration(Number(e.target.value))}
                    />
                  </InputWrapper>
                </div>
                <div className="flex-1">
                  <InputWrapper
                    id="activeduration"
                    label="Daily activity duration"
                    required
                  >
                    <input
                      type="text"
                      id="activeduration"
                      name="activeduration"
                      autoComplete="off"
                      required
                      placeholder="Enter your daily activity duration"
                      inputMode="text"
                      maxLength={50}
                      value={dailyActivityDuration}
                      onChange={(e) =>
                        setDailyActivityDuration(e.target.value.trimStart())
                      }
                    />
                  </InputWrapper>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-x-5">
                <div className="flex-1">
                  <InputWrapper
                    id="dob"
                    label="Date of Birth"
                    required
                    explain="YYYY-MM-DD"
                    error={dobErrorMessage}
                  >
                    <input
                      type="text"
                      id="dob"
                      name="dob"
                      autoComplete="off"
                      required
                      placeholder="Enter your DoB"
                      inputMode="text"
                      maxLength={10}
                      minLength={10}
                      value={dob}
                      onChange={(e) => setDob(e.target.value.trimStart())}
                    />
                  </InputWrapper>
                </div>
                <div className="flex-1">
                  <InputWrapper
                    id="activities"
                    label="Physical activities"
                    explain={activities.join(", ")}
                  >
                    <input
                      type="text"
                      id="activities"
                      name="activities"
                      autoComplete="off"
                      placeholder="Enter your preferred physical activities"
                      inputMode="text"
                    />
                    <Button
                      onClick={addActivity}
                      className="!mt-2 !me-2 !rounded-full"
                    >
                      Add
                    </Button>
                  </InputWrapper>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-x-5">
                <div className="flex-1">
                  <InputWrapper id="occupation" label="Occupation" required>
                    <select
                      id="occupation"
                      name="occupation"
                      required
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                    >
                      <option value="" disabled hidden>
                        Select your occupation
                      </option>
                      <option value="unemployed">Unemployed</option>
                      <option value="studying">Studying</option>
                      <option value="employee">Employee</option>
                      <option value="entrepreneur">Entrepreneur</option>
                      <option value="other">Other</option>
                    </select>
                  </InputWrapper>
                </div>
                <div className="flex-1"></div>
              </div>
              <div className="text-center">
                <Button className="!w-full" type="submit">
                  Sign Up
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
