import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { modalStyles } from "../styles/Styles";
import Ionicons from "@expo/vector-icons/build/Ionicons";

type FilterModalProps = {
  visible: boolean;
  onFilterSelect: (filter: string) => void;
  onClose: () => void;
};

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onFilterSelect,
  onClose,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("Any");

  const handleFilterPress = (filter: string) => {
    setSelectedFilter(filter); // Establece el filtro seleccionado
    onFilterSelect(filter); // Envía el filtro seleccionado al componente padre
    onClose(); // Cierra el modal
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={modalStyles.modalBackground}>
          <TouchableWithoutFeedback>
            <View style={modalStyles.modalContent}>
              <View style={modalStyles.modalButtons}>
                {["Alcoholic", "Non alcoholic", "Any"].map((filter) => (
                  <Pressable
                    key={filter}
                    style={{
                      ...modalStyles.modalButton,
                      backgroundColor:
                        selectedFilter === filter ? "#4b85e3" : "white", // Cambia el color de fondo
                    }}
                    onPress={() => handleFilterPress(filter)}
                  >
                    <Text
                      style={{
                        ...modalStyles.modalButtonText,
                        color: selectedFilter === filter ? "white" : "black",
                      }}
                    >
                      {filter}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FilterModal;
