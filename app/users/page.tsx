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
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Index: NextPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [dietPlans, setDietPlans] = useState<any[]>([]);
  const [userId, setUserId] = useState<string>("");
  const { getUsers, getAllItems, getDietPlanbyUserId, createDietPlan } =
    useAPI();
  const [value, setValue] = useState<Dayjs | null>(dayjs("2022-04-17T15:30"));
  const [itemId, setItemId] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const [viewPlans, setViewPlans] = useState<boolean>(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [viewRecipe, setViewRecipe] = useState<boolean>(false);
  const [dialogData, setDialogData] = useState<any>(null);

  const fetchUsers = async () => {
    try {
      const userResponse = await getUsers();
      if (userResponse) setUsers(userResponse);
    } catch (error) {
      toast.error("Fetch users failed");
    }
  };
  const fetchItems = async () => {
    try {
      const response = await getAllItems();
      if (response) setItems(response);
    } catch (error) {
      console.log("Fetch items failed");
    }
  };

  const fetchDietPlans = async () => {
    try {
      const response = await getDietPlanbyUserId({ userId });
      if (response) setDietPlans(response);
    } catch (error) {
      toast.error("Fetch plans failed");
      setViewPlans(false);
      setDietPlans([]);
      setUserId("");
    }
  };

  const submitPlan = async (newValue: dayjs.Dayjs | null) => {
    try {
      const response = await createDietPlan({
        userID: userId,
        dateTime: newValue?.toISOString(),
        itemID: itemId,
        isCompleted: false,
      });
      if (response) {
        toast.success("Added day plan");
      }
    } catch (error) {
      console.log("Fetch plans failed");
    } finally {
      setStep(0);
      setUserId("");
      setItemId("");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchItems();
  }, []);

  useEffect(() => {
    if (userId && viewPlans) fetchDietPlans();
  }, [userId]);

  const getFormattedDate = (date: Date | string): string => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleRecipeClose = () => {
    setDialogData(null);
    setViewRecipe(false);
  };

  const createData = (
    id: string,
    name: string,
    dob: string,
    phone: string,
    email: string,
    goal: string,
    allergens: string[],
    dietary: string,
    disorders: string[],
    commonConditions: string[],
    weight: number,
    height: number,
    bmi: number,
    sleepDuration: number,
    occupation: string,
    dailyActivityDuration: string,
    preferredActivities: string[]
  ) => {
    return {
      id,
      name,
      dob,
      phone,
      email,
      goal,
      allergens,
      dietary,
      disorders,
      commonConditions,
      weight,
      height,
      bmi,
      sleepDuration,
      occupation,
      dailyActivityDuration,
      preferredActivities,
    };
  };

  const rows = users.map((user) =>
    createData(
      user.id,
      user.name,
      getFormattedDate(user.dob),
      user.phone,
      user.email,
      user.goal,
      user.allergens.join(", "),
      user.dietary,
      user.disorders.join(", "),
      user.common_conditions.join(", "),
      user.weight,
      user.height,
      user.bmi,
      user.sleep_duration,
      user.occupation,
      user.daily_activity_duration,
      user.physical_activities_preferred.join(", ")
    )
  );

  return (
    <section className="container !mb-12">
      <p className="my-8 text-3xl font-bold">All registered users</p>
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
              <TableCell align="center">Diet Plans</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell sx={{ minWidth: 150 }}>{row.name}</TableCell>
                <TableCell align="right" sx={{ minWidth: 150 }}>
                  {row.dob}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 120 }}>
                  {row.phone}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 200 }}>
                  {row.email}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 150 }}>
                  {row.goal}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 180 }}>
                  {row.allergens}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 120 }}>
                  {row.dietary}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 150 }}>
                  {row.disorders}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 180 }}>
                  {row.commonConditions}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 120 }}>
                  {row.weight}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 120 }}>
                  {row.height}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 100 }}>
                  {row.bmi}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 180 }}>
                  {row.sleepDuration}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 150 }}>
                  {row.occupation}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 200 }}>
                  {row.dailyActivityDuration}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 180 }}>
                  {row.preferredActivities}
                </TableCell>
                <TableCell align="center">
                  <div className="flex flex-row gap-2">
                    <Button
                      onClick={() => {
                        setUserId(row.id), setStep(1);
                      }}
                    >
                      Add
                    </Button>
                    <Button
                      onClick={() => {
                        setUserId(row.id), setViewPlans(true);
                      }}
                    >
                      View
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {step == 1 && userId && items.length > 0 && (
        <>
          <div className="flex flex-row justify-between items-center">
            <p className="my-8 text-2xl font-bold">Select an item to add</p>
            <Button onClick={() => setStep(0)}>Back</Button>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="items table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Portion Size</TableCell>
                  <TableCell>Calories (per serving)</TableCell>
                  <TableCell>Dietary Preference</TableCell>
                  <TableCell>Iron</TableCell>
                  <TableCell>Fiber</TableCell>
                  <TableCell>Vitamin C</TableCell>
                  <TableCell>Is Recipe</TableCell>
                  <TableCell>Add To Plan</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.itemName}</TableCell>
                    <TableCell>
                      {item.portionSizeNumber} {item.portionQuantity}
                    </TableCell>
                    <TableCell>{item.caloriesPerServing}</TableCell>
                    <TableCell>{item.dietaryPreference}</TableCell>
                    <TableCell>{item.nutritionContent.iron}</TableCell>
                    <TableCell>{item.nutritionContent.fiber}</TableCell>
                    <TableCell>{item.nutritionContent.vitaminC}</TableCell>
                    <TableCell>
                      {item.isRecipe ? (
                        <Button
                          onClick={() => {
                            setDialogData(item.recipeDescription);
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
                      <Button
                        onClick={() => {
                          setItemId(item.id), setStep(2);
                        }}
                      >
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      {step == 2 && itemId && (
        <>
          <div className="flex flex-row justify-between items-center">
            <p className="my-8 text-2xl font-bold">Select date</p>
            <Button onClick={() => setStep(1)}>Back</Button>
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
              <DateTimePicker
                label="Controlled picker"
                value={value}
                onChange={(newValue) => submitPlan(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </>
      )}
      {viewPlans && dietPlans.length > 0 && (
        <>
          <div className="flex flex-row justify-between items-center">
            <p className="my-8 text-2xl font-bold">Diet Plans Added for user</p>
            <Button
              onClick={() => {
                setViewPlans(false), setDietPlans([]), setUserId("");
              }}
            >
              Clear
            </Button>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 800 }} aria-label="plans table">
              <TableHead>
                <TableRow>
                  <TableCell>Date/Time</TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Portion Size</TableCell>
                  <TableCell>Calories</TableCell>
                  <TableCell>Is Recipe</TableCell>
                  <TableCell>Is Completed</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dietPlans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell>
                      {new Date(plan.dateTime).toLocaleString()}
                    </TableCell>
                    <TableCell>{plan.item.itemName}</TableCell>
                    <TableCell>
                      {plan.item.portionSizeNumber} {plan.item.portionQuantity}
                    </TableCell>
                    <TableCell>{plan.item.caloriesPerServing}</TableCell>
                    <TableCell>{plan.item.isRecipe ? "Yes" : "No"}</TableCell>
                    <TableCell>{plan.isCompleted ? "Yes" : "No"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
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
