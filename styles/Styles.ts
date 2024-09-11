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
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingLeft: 10, // Espacio para el icono
    paddingRight: 10,
    width: "100%",
  },
  searchIcon: {
    position: "absolute",
    left: 10, // Ajustar según el diseño
    zIndex: 1,
  },
  searchBar: {
    flex: 1,
    height: 40,
    paddingLeft: 40, // Espacio para el icono dentro del TextInput
    color: "#000",
  },
});

export const cardStyles = StyleSheet.create({
  cardContainer: {
    flexGrow: 1,
    width: "100%",
  },
  cardBackground: {
    backgroundColor: "#303c70",
    height: "auto",
    width: "60%",
    margin: 5,
    borderWidth: 1,
    borderColor: "white",
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    height: "auto",
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 5,
  },
  image: {
    height: 130,
    width: 130,
    borderRadius: 65,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "white",
    margin: 10,
    resizeMode: "cover",
    overflow: "hidden",
    zIndex: 1,
  },
  textName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
});

export const detailStyles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    backgroundColor: "#11141f",
    alignItems: "center",
    padding: 20,
  },
  image: {
    height: 300,
    width: 300,
    borderRadius: 50,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "white",
    margin: 10,
    resizeMode: "cover",
    overflow: "hidden",
  },
  textName: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  
});
