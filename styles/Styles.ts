import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#11141f",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export const searchBarStyles = StyleSheet.create({
  searchBarContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 60, // Define una altura específica
    marginBottom: 20, // O cualquier margen que desees
  },
  searchBar: {
    width: "80%",
    backgroundColor: "#303c70",
    padding: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    color: "white",
  },
});

export const cardStyles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  card: {
    height: 150,
    width: "45%",
    backgroundColor: "#303c70",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 5,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  textName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: 5,
  },
});
