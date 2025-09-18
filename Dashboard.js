import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView, Dimensions } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; 
import { BarChart, PieChart } from "react-native-chart-kit";

export default function Dashboard() {
  const [doacoes, setDoacoes] = useState([]);

  useEffect(() => {
    async function fetchDoacoes() {
      const querySnapshot = await getDocs(collection(db, "doacoes"));
      const data = querySnapshot.docs.map(doc => doc.data());
      setDoacoes(data);
    }
    fetchDoacoes();
  }, []);

  // Preparar dados para gráfico de barras
  const quantidadePorTipo = doacoes.reduce((acc, item) => {
    acc[item.tipo] = (acc[item.tipo] || 0) + parseInt(item.quantidade);
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(quantidadePorTipo),
    datasets: [
      {
        data: Object.values(quantidadePorTipo)
      }
    ]
  };

  // Dados para gráfico de pizza
  const pieData = Object.keys(quantidadePorTipo).map((key, index) => ({
    name: key,
    quantidade: quantidadePorTipo[key],
    color: index === 0 ? "#0088FE" : "#FF8042",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }));

  const screenWidth = Dimensions.get("window").width;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard de Doações</Text>

      {/* Tabela */}
      <Text style={styles.subtitle}>Lista de Doações</Text>
      <FlatList
        data={doacoes}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.nome}</Text>
            <Text style={styles.cell}>{item.tipo}</Text>
            <Text style={styles.cell}>{item.quantidade}</Text>
            <Text style={styles.cell}>{item.endereco}</Text>
          </View>
        )}
      />

      {/* Gráfico de barras */}
      <Text style={styles.subtitle}>Quantidade por Tipo (Barras)</Text>
      <BarChart
        data={barData}
        width={screenWidth - 20}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 136, 254, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={{ marginVertical: 8 }}
      />

      {/* Gráfico de pizza */}
      <Text style={styles.subtitle}>Proporção de Tipos (Pizza)</Text>
      <PieChart
        data={pieData}
        width={screenWidth - 20}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="quantidade"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#F5F5F5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  subtitle: { fontSize: 18, fontWeight: "600", marginTop: 20, marginBottom: 10 },
  row: { flexDirection: "row", marginBottom: 5, backgroundColor: "#fff", padding: 5, borderRadius: 5 },
  cell: { flex: 1, fontSize: 14 },
});
