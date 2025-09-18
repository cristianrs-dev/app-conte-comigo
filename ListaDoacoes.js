import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export default function ListaDoacoes() {
  const [doacoes, setDoacoes] = useState([]);

  const carregarDoacoes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "doacoes"));
      const lista = [];
      querySnapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setDoacoes(lista);
    } catch (error) {
      console.error("Erro ao carregar doações:", error);
    }
  };

  useEffect(() => {
    carregarDoacoes();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.valor}>{item.nome}</Text>

      <Text style={styles.label}>Item:</Text>
      <Text style={styles.valor}>{item.tipo}</Text>

      <Text style={styles.label}>Quantidade:</Text>
      <Text style={styles.valor}>{item.quantidade}</Text>

      <Text style={styles.label}>Endereço:</Text>
      <Text style={styles.valor}>{item.endereco}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {doacoes.length === 0 ? (
        <Text style={styles.vazio}>Nenhuma doação registrada ainda.</Text>
      ) : (
        <FlatList
          data={doacoes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  card: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3, // sombra no Android
    shadowColor: '#000', // sombra no iOS
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  valor: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  vazio: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#666' },
});
