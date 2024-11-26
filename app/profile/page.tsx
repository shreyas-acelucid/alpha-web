"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import useAPI from "../hooks/useAPI";
import { Button } from "@mui/material";
import { getToken } from "../utils/helpers";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  userId?: string;
}

const Index: NextPage = () => {
  const { getUserById } = useAPI();
  const [userId, setUserId] = useState<string>("");
  const token = getToken();


  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      if (decoded.userId) {
        setUserId(decoded.userId);
      }
    }
  }, []);

  return (
    <section className="container !mb-12">
      <p className="my-8 text-3xl font-bold">User Profile</p>
    </section>
  );
};
export default Index;
