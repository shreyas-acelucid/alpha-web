"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import useAPI from "../hooks/useAPI";
import toast from "react-hot-toast";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { getToken } from "../utils/helpers";
import { jwtDecode, JwtPayload } from "jwt-decode";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CustomJwtPayload extends JwtPayload {
  userId?: string;
}

const Index: NextPage = () => {
  const [dietPlans, setDietPlans] = useState<any[]>([]);
  const { getDietPlanbyUserId, completeDietPlanbyUserId } = useAPI();
  const [userId, setUserId] = useState<string>("");
  const token = getToken();
  const [dialogData, setDialogData] = useState<any>(null);
  const [viewRecipe, setViewRecipe] = useState<boolean>(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleRecipeClose = () => {
    setDialogData(null);
    setViewRecipe(false);
  };

  const fetchDietPlans = async (userId: string) => {
    try {
      const response = await getDietPlanbyUserId({ userId });
      if (response) setDietPlans(response);
    } catch (error) {
      toast.error("Fetch plans failed");
    }
  };

  const markComplete = async (planId: string) => {
    try {
      const response = await completeDietPlanbyUserId(planId, { userId });
      if (response) {
        toast.success("Marked as complete");
        fetchDietPlans(userId);
      }
    } catch (error) {
      toast.error("Fetch plans failed");
    }
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      if (decoded.userId) {
        fetchDietPlans(decoded.userId);
        setUserId(decoded.userId);
      }
    }
  }, []);

  const [sortOrder, setSortOrder] = useState("asc");

  const sortedPlans = [...dietPlans].sort((a, b) => {
    const dateA = new Date(a.dateTime);
    const dateB = new Date(b.dateTime);
    return sortOrder === "asc"
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <section className="container !mb-12">
      <p className="my-8 text-3xl font-bold">All Diet Plans</p>
      {dietPlans.length > 0 ? (
        <>
          <div className="mb-8">
            <Button onClick={toggleSortOrder}>
              Sort by Date: {sortOrder === "asc" ? "Oldest to Newest" : "Newest to Oldest"}
            </Button>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 800 }} aria-label="plans table">
              <TableHead>
                <TableRow>
                  <TableCell
                    onClick={toggleSortOrder}
                    style={{ cursor: "pointer" }}
                  >
                    Date/Time {sortOrder === "asc" ? "↑" : "↓"}
                  </TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Portion Size</TableCell>
                  <TableCell>Calories</TableCell>
                  <TableCell>Dietary Preference</TableCell>
                  <TableCell>Iron</TableCell>
                  <TableCell>Fiber</TableCell>
                  <TableCell>Vitamin C</TableCell>
                  <TableCell>Is Recipe</TableCell>
                  <TableCell>Plan Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedPlans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell>
                      {new Date(plan.dateTime).toLocaleString()}
                    </TableCell>
                    <TableCell>{plan.item.itemName}</TableCell>
                    <TableCell>
                      {plan.item.portionSizeNumber} {plan.item.portionQuantity}
                    </TableCell>
                    <TableCell>{plan.item.caloriesPerServing}</TableCell>
                    <TableCell>{plan.item.dietaryPreference}</TableCell>
                    <TableCell>{plan.item.nutritionContent.iron}</TableCell>
                    <TableCell>{plan.item.nutritionContent.fiber}</TableCell>
                    <TableCell>{plan.item.nutritionContent.vitaminC}</TableCell>
                    <TableCell>
                      {plan.item.isRecipe ? (
                        <Button
                          onClick={() => {
                            setDialogData(plan.item.recipeDescription);
                            setViewRecipe(true);
                          }}
                        >
                          View
                        </Button>
                      ) : (
                        "No"
                      )}
                    </TableCell>
                    <TableCell>
                      {plan.isCompleted ? (
                        <Button disabled>Completed</Button>
                      ) : (
                        <Button onClick={() => markComplete(plan.id)}>
                          Mark complete
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <p className="my-8 text-2xl font-semibold text-center">
          No plans found, please wait until a dietitian is assigned to you
        </p>
      )}

      <Dialog
        fullScreen={fullScreen}
        open={viewRecipe}
        onClose={handleRecipeClose}
        PaperProps={{
          sx: { borderRadius: { xs: "0px", md: "22px" }, maxWidth: "43%" },
        }}
        scroll={"body"}
        fullWidth={true}
      >
        <DialogTitle>
          <div className="flex flex-row justify-between items-center">
            <p className="text-2xl font-semibold">Recipe</p>
            <IconButton sx={{ color: "inherit" }} onClick={handleRecipeClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <hr />
        <DialogContent sx={{ fontSize: "16px" }}>
          <p className="my-8 text-lg font-semibold">{dialogData}</p>
        </DialogContent>
      </Dialog>
    </section>
  );
};
export default Index;
