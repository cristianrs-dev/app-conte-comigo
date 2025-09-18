import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Suas telas
import DoacaoForm from "./DoacaoForm";
import ListaDoacoes from "./ListaDoacoes";
import Dashboard from "./Dashboard";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Formulário de Doação"
        screenOptions={{
          headerStyle: { backgroundColor: "#2e7d32" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Drawer.Screen name="Formulário de Doação" component={DoacaoForm} />
        <Drawer.Screen name="ListaDoações" component={ListaDoacoes} />
        <Drawer.Screen name="Dashboard" component={Dashboard} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
