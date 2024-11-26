"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import useAPI from "../hooks/useAPI";
import { Button } from "@mui/material";
import { getToken, logout } from "../utils/helpers";
import { jwtDecode, JwtPayload } from "jwt-decode";
import toast from "react-hot-toast";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface CustomJwtPayload extends JwtPayload {
  userId?: string;
}

const Index: NextPage = () => {
  const { getUserById } = useAPI();
  const token = getToken();
  const [user, setUser] = useState<any>(null);

  const fetchDietPlans = async (userId: string) => {
    try {
      const response = await getUserById(userId);
      if (response) setUser(response);
    } catch (error) {
      toast.error("Fetch user failed");
    }
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      if (decoded.userId) {
        fetchDietPlans(decoded.userId);
      }
    }
  }, []);

  const getFormattedDate = (date: Date | string): string => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  //   const row = createData(
  //     user.id,
  //     user.name,
  //     getFormattedDate(user.dob),
  //     user.phone,
  //     user.email,
  //     user.goal,
  //     user.allergens.join(", "),
  //     user.dietary,
  //     user.disorders.join(", "),
  //     user.common_conditions.join(", "),
  //     user.weight,
  //     user.height,
  //     user.bmi,
  //     user.sleep_duration,
  //     user.occupation,
  //     user.daily_activity_duration,
  //     user.physical_activities_preferred.join(", ")
  //   );

  return (
    <section className="container !mb-12">
      <p className="my-8 text-3xl font-bold">User Profile</p>

      {user && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="user table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 150 }}>Name</TableCell>
                <TableCell align="right" sx={{ minWidth: 150 }}>
                  Date of Birth
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 120 }}>
                  Phone
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 200 }}>
                  Email
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 150 }}>
                  Goal
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 180 }}>
                  Allergens
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 120 }}>
                  Dietary
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 150 }}>
                  Disorders
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 180 }}>
                  Common Conditions
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 120 }}>
                  Weight (kg)
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 120 }}>
                  Height (cm)
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 100 }}>
                  BMI
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 180 }}>
                  Sleep Duration (hrs)
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 150 }}>
                  Occupation
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 200 }}>
                  Daily Activity
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 180 }}>
                  Preferred Activities
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ minWidth: 150 }}>{user.name}</TableCell>
                <TableCell align="right" sx={{ minWidth: 150 }}>
                  {getFormattedDate(user.dob)}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 120 }}>
                  {user.phone}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 200 }}>
                  {user.email}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 150 }}>
                  {user.goal}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 180 }}>
                  {user.allergens.join(", ")}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 120 }}>
                  {user.dietary}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 150 }}>
                  {user.disorders.join(", ")}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 180 }}>
                  {user.common_conditions.join(", ")}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 120 }}>
                  {user.weight}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 120 }}>
                  {user.height}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 100 }}>
                  {user.bmi}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 180 }}>
                  {user.sleep_duration}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 150 }}>
                  {user.occupation}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 200 }}>
                  {user.daily_activity_duration}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 180 }}>
                  {user.physical_activities_preferred.join(", ")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <p className="my-8 text-right">
        <Button onClick={logout}>Log Out</Button>
      </p>
    </section>
  );
};
export default Index;
