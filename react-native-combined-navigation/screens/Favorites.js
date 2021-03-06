import { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import MealsList from "../components/MealsList/MealsList";
import { MEALS } from "../data/dummy-data";
import { FavoritesContext } from "../store/context/favriotes-context";

const Favorites = () => {
  const favoriteMealCtx = useContext(FavoritesContext);
  const favoriteMeals = MEALS.filter((meal) =>
    favoriteMealCtx.ids.includes(meal.id)
  );
  const Output = () => {
      return (
        <View style={styles.rootContainer}>
          <Text style={styles.text}>You have no favorite meals yet.</Text>
        </View>
      );
  }
  return favoriteMeals.length===0 ?<Output/>: <MealsList items={favoriteMeals} />;
};

export default Favorites;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
