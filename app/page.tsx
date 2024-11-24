"use client";
import { Margin } from "@mui/icons-material";
import { NextPage } from "next";
import * as React from "react";

const Index: NextPage = () => {
  return (
    <section className="max-w-7xl mx-auto p-8 mt-4" style={{ marginTop: "50px"}}>
    <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Alpha Nutrition
        </h1>
        <p className="text-gray-600 mb-4" style={{ textAlign: "justify" }}>
          Your ultimate companion for a healthier, happier you. At Alpha
          Nutrition, we believe that achieving your health and wellness goals
          should be simple, personalized, and empowering. That’s why we’ve
          designed an app that adapts to your unique needs, offering tailored
          meal plans, expert nutrition insights, and AI-driven
          recommendations to help you thrive.
        </p>
        <p className="text-gray-600" style={{ textAlign: "justify" }}>
          Whether you're aiming to lose weight, build muscle, manage a health
          condition, or simply adopt a balanced lifestyle, our app provides
          the tools and guidance you need. Track your calories, monitor your
          macros, and gain a deeper understanding of your nutrient intake—all
          while exploring delicious recipes designed to suit your preferences
          and goals.
        </p>
      </div>
      <div className="flex-1">
        <img
          src="/Healthypyramid.png"
          alt="Healthy Diet"
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>

    <div className="flex flex-col md:flex-row-reverse items-center gap-8">
      <div className="flex-1 text-center md:text-left">
        <p className="text-gray-600 mb-4" style={{ textAlign: "justify" }}>
          But Alpha Nutrition is more than just a tool—it’s a supportive
          community. Connect with like-minded individuals who share your
          journey, celebrate milestones, and stay motivated every step of the
          way. With science-backed solutions and an easy-to-use interface,
          Alpha Nutrition transforms healthy living from a challenge into a
          rewarding experience.
        </p>
        <p className="text-gray-600" style={{ textAlign: "justify" }} >
          Take control of your nutrition and unlock your full potential. Let
          Alpha Nutrition fuel your body, mind, and soul—because a better life
          starts with the right choices. Ready to begin? Start your journey
          today!
        </p>
      </div>
      <div className="flex-1">
        <img
          src="/HealthyDiet.png"
          alt="Healthy Pyramid"
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  </section>
  );
};
export default Index;
