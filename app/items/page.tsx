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
import {
  Button,
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
import InputWrapper from "../components/common/InputWrapper";

const Index: NextPage = () => {
  const [items, setItems] = useState<any[]>([]);
  const { getAllItems, createItem, deleteItemById } = useAPI();
  const [viewAddItem, setViewAddItem] = useState<boolean>(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [dialogData, setDialogData] = useState<any>(null);
  const [viewRecipe, setViewRecipe] = useState<boolean>(false);

  const [itemName, setItemName] = useState<string>("");
  const [caloriesPerServing, setCaloriesPerServing] = useState<number | null>(
    0
  );
  const [portionSizeNumber, setPortionSizeNumber] = useState<number | null>(0);
  const [portionQuantity, setPortionQuantity] = useState<string>("");
  const [dietaryPreference, setDietaryPreference] = useState<string>("");
  const [iron, setIron] = useState<string>("");
  const [fiber, setFiber] = useState<string>("");
  const [vitaminC, setVitaminC] = useState<string>("");
  const [isRecipe, setIsRecipe] = useState<boolean>(false);
  const [recipeDescription, setRecipeDescription] = useState<string | null>(
    null
  );

  const handleClose = () => {
    setViewAddItem(false);
  };

  const handleRecipeClose = () => {
    setDialogData(null);
    setViewRecipe(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addItem();
  };

  const addItem = async () => {
    try {
      const response = await createItem({
        itemName,
        caloriesPerServing,
        portionSizeNumber,
        portionQuantity,
        dietaryPreference,
        nutritionContent: {
          iron,
          fiber,
          vitaminC,
        },
        isRecipe,
        recipeDescription,
      });
      if (response) {
        toast.success("Item added");
        setViewAddItem(false);
        fetchItems();
      }
    } catch (error) {
      toast.error("Add item failed");
    }
  };

  const fetchItems = async () => {
    try {
      const response = await getAllItems();
      if (response) setItems(response);
    } catch (error) {
      toast.error("Fetch items failed");
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const response = await deleteItemById(id);
      if (response) {
        toast.success("Deleted Successfully");
        fetchItems();
      }
    } catch (error) {
      toast.error("Fetch items failed");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <section className="container !mb-12">
      <div className="flex flex-row justify-between items-center">
        <p className="my-8 text-3xl font-bold">All items</p>
        <Button onClick={() => setViewAddItem(true)}>Add Item</Button>
      </div>
      {items.length > 0 && (
        <>
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
                  <TableCell>Delete Item</TableCell>
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
                      <Button onClick={() => deleteItem(item.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      <Dialog
        fullScreen={fullScreen}
        open={viewAddItem}
        onClose={handleClose}
        PaperProps={{
          sx: { borderRadius: { xs: "0px", md: "22px" }, maxWidth: "43%" },
        }}
        scroll={"body"}
        fullWidth={true}
      >
        <DialogTitle>
          <div className="flex flex-row justify-between items-center">
            <p className="text-2xl font-semibold">Add Item</p>
            <IconButton sx={{ color: "inherit" }} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <hr />
        <DialogContent sx={{ fontSize: "16px" }}>
          <form onSubmit={handleSubmit}>
            <InputWrapper id="itemName" label="Item Name" required>
              <input
                type="text"
                id="itemName"
                name="itemName"
                autoComplete="off"
                required
                placeholder="Enter item name"
                inputMode="text"
                maxLength={50}
                value={itemName}
                onChange={(e) => setItemName(e.target.value.trimStart())}
              />
            </InputWrapper>
            <InputWrapper
              id="caloriesPerServing"
              label="Calories Per Serving"
              required
            >
              <input
                type="number"
                id="caloriesPerServing"
                name="caloriesPerServing"
                autoComplete="off"
                required
                placeholder="Enter calories per serving"
                inputMode="numeric"
                value={caloriesPerServing || ""}
                onChange={(e) =>
                  setCaloriesPerServing(
                    e.target.value === "" ? null : Number(e.target.value)
                  )
                }
              />
            </InputWrapper>
            <InputWrapper id="portionQuantity" label="Portion Unit" required>
              <select
                id="portionQuantity"
                name="portionQuantity"
                required
                value={portionQuantity}
                onChange={(e) => setPortionQuantity(e.target.value)}
              >
                <option value="" disabled hidden>
                  Enter portion unit
                </option>
                <option value="kg">kg</option>
                <option value="gm">gm</option>
                <option value="litre">litre</option>
                <option value="ml">ml</option>
                <option value="piece">piece</option>
              </select>
            </InputWrapper>
            <InputWrapper
              id="portionSizeNumber"
              label="Portion Quantity"
              required
            >
              <input
                type="number"
                id="portionSizeNumber"
                name="portionSizeNumber"
                autoComplete="off"
                required
                placeholder="Enter portion quantity"
                inputMode="numeric"
                value={portionSizeNumber || ""}
                onChange={(e) =>
                  setPortionSizeNumber(
                    e.target.value === "" ? null : Number(e.target.value)
                  )
                }
              />
            </InputWrapper>
            <InputWrapper
              id="dietaryPreference"
              label="Dietary preference"
              required
            >
              <select
                id="dietaryPreference"
                name="dietaryPreference"
                required
                value={dietaryPreference}
                onChange={(e) => setDietaryPreference(e.target.value)}
              >
                <option value="" disabled hidden>
                  Select dietary preference of item
                </option>
                <option value="veg">Veg</option>
                <option value="nonveg">Non Veg</option>
                <option value="vegan">Vegan</option>
                <option value="egg">Egg</option>
                <option value="pescatarian">Fish</option>
              </select>
            </InputWrapper>
            <InputWrapper id="iron" label="Iron" required>
              <input
                type="text"
                id="iron"
                name="iron"
                autoComplete="off"
                required
                placeholder="0.1g"
                inputMode="text"
                maxLength={50}
                value={iron}
                onChange={(e) => setIron(e.target.value.trimStart())}
              />
            </InputWrapper>
            <InputWrapper id="fiber" label="Fiber" required>
              <input
                type="text"
                id="fiber"
                name="fiber"
                autoComplete="off"
                required
                placeholder="4g"
                inputMode="text"
                maxLength={50}
                value={fiber}
                onChange={(e) => setFiber(e.target.value.trimStart())}
              />
            </InputWrapper>
            <InputWrapper id="vitaminC" label="Vitamin C" required>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="off"
                required
                placeholder="0.084mg"
                inputMode="text"
                maxLength={50}
                value={vitaminC}
                onChange={(e) => setVitaminC(e.target.value.trimStart())}
              />
            </InputWrapper>
            <InputWrapper id="isRecipe" label="Is this item a recipe?" required>
              <FormControl>
                <RadioGroup
                  aria-labelledby="isRecipe"
                  name="isRecipe"
                  value={isRecipe}
                  row
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    checked={isRecipe}
                    onChange={() => setIsRecipe(true)}
                    label="Yes"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    checked={!isRecipe}
                    onChange={() => setIsRecipe(false)}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
            </InputWrapper>
            {isRecipe && (
              <InputWrapper
                id="description"
                label="Recipe Description"
                required
              >
                <textarea
                  id="description"
                  name="description"
                  autoComplete="off"
                  required
                  placeholder="Enter description"
                  rows={4}
                  value={recipeDescription ?? ""}
                  onChange={(e) =>
                    setRecipeDescription(e.target.value.trimStart())
                  }
                />
              </InputWrapper>
            )}

            <div className="text-center">
              <Button className="!w-full" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

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
