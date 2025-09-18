import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase"; 

export default function DoacaoForm({ navigation, doacoes, setDoacoes }) {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [tipoDoacao, setTipoDoacao] = useState('Roupas');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');

  const tipos = ['Roupas', 'Alimentos'];

  const enviarDoacao = async () => {
    if (!nome || !quantidade || !rua || !numero || !bairro || !cidade) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const novaDoacao = { 
      id: Date.now().toString(), 
      nome, 
      tipo: tipoDoacao, 
      quantidade, 
      endereco: `${rua}, ${numero} - ${bairro}, ${cidade}` 
    };

    try {
    await addDoc(collection(db, "doacoes"), novaDoacao);

    setDoacoes([novaDoacao, ...doacoes]);

    // limpar campos
    setNome('');
    setQuantidade('');
    setRua('');
    setNumero('');
    setBairro('');
    setCidade('');
    setTipoDoacao('Roupas');

    Alert.alert("Sucesso", "Doação registrada!");

  }catch (error) {

    console.error("Erro ao salvar no Firebase: ", error);
    Alert.alert("Erro", "Não foi possível registrar a doação.");

  }
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Formulário de Doação</Text>

      <Text>Nome do doador:</Text>
      <TextInput style={styles.input} placeholder="Digite seu nome" value={nome} onChangeText={setNome} />

      <Text>Tipo de doação:</Text>
      <View style={styles.tipoContainer}>
        {tipos.map((tipo) => (
          <TouchableOpacity
            key={tipo}
            style={[styles.tipoBotao, tipoDoacao === tipo && styles.tipoSelecionado]}
            onPress={() => setTipoDoacao(tipo)}
          >
            <Text style={tipoDoacao === tipo && styles.textSelecionado}>{tipo}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text>Quantidade:</Text>
      <TextInput style={styles.input} placeholder="Quantidade de itens ou kg" keyboardType="numeric" value={quantidade} onChangeText={setQuantidade} />

      <Text>Rua:</Text>
      <TextInput style={styles.input} placeholder="Digite a rua" value={rua} onChangeText={setRua} />

      <Text>Número:</Text>
      <TextInput style={styles.input} placeholder="Digite o número" keyboardType="numeric" value={numero} onChangeText={setNumero} />

      <Text>Bairro:</Text>
      <TextInput style={styles.input} placeholder="Digite o bairro" value={bairro} onChangeText={setBairro} />

      <Text>Cidade:</Text>
      <TextInput style={styles.input} placeholder="Digite a cidade" value={cidade} onChangeText={setCidade} />

      <Button title="Enviar Doação" onPress={enviarDoacao} color="#2e7d32" />
{/*
 <View style={{ marginTop: 15 }}>
        <Button title="Ver Doações" onPress={() => navigation.navigate("ListaDoacoes")} />
      </View>
*/}
     
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f5f5f5' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#2e7d32', textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#aaa', padding: 10, marginBottom: 15, borderRadius: 5, backgroundColor: '#fff' },
  tipoContainer: { flexDirection: 'row', marginBottom: 15, justifyContent: 'space-between' },
  tipoBotao: { width: '48%', padding: 12, borderWidth: 1, borderColor: '#aaa', borderRadius: 5, alignItems: 'center', backgroundColor: '#fff' },
  tipoSelecionado: { backgroundColor: '#2e7d32' },
  textSelecionado: { color: '#fff', fontWeight: 'bold' },
});
