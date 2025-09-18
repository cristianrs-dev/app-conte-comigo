const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyC6La-DP5JrxzxsAL-2VOCL2xr4I6iFB3A",
  authDomain: "conte-comigo-a3a67.firebaseapp.com",
  projectId: "conte-comigo-a3a67",
  storageBucket: "conte-comigo-a3a67.firebasestorage.app",
  messagingSenderId: "795235615155",
  appId: "1:795235615155:web:470acddad3ef1af9f4cbc6",
  measurementId: "G-8L87WRGTR8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const dados = [
  {
    endereco: "rua são francisco, 88 - Cachoeirinha, Manaus",
    id: "1757186200019",
    nome: "paulo henrique",
    quantidade: "4",
    tipo: "Alimentos"
  },
  {
    endereco: "av. sete de setembro, 321 - Centro, Manaus",
    id: "1757186200020",
    nome: "luana ribeiro",
    quantidade: "2",
    tipo: "Roupas"
  },
  {
    endereco: "rua das andorinhas, 65 - Parque 10, Manaus",
    id: "1757186200021",
    nome: "ricardo monteiro",
    quantidade: "5",
    tipo: "Alimentos"
  },
  {
    endereco: "travessa esperança, 40 - Compensa, Manaus",
    id: "1757186200022",
    nome: "camila barros",
    quantidade: "3",
    tipo: "Roupas"
  },
  {
    endereco: "rua do comércio, 77 - Educandos, Manaus",
    id: "1757186200023",
    nome: "daniel costa",
    quantidade: "6",
    tipo: "Alimentos"
  },
  {
    endereco: "av. constantino nery, 1000 - Chapada, Manaus",
    id: "1757186200024",
    nome: "aline cardoso",
    quantidade: "1",
    tipo: "Roupas"
  },
  {
    endereco: "rua bela vista, 12 - São Jorge, Manaus",
    id: "1757186200025",
    nome: "mateus vieira",
    quantidade: "8",
    tipo: "Alimentos"
  },
  {
    endereco: "rua ipê, 200 - Aleixo, Manaus",
    id: "1757186200026",
    nome: "patrícia melo",
    quantidade: "2",
    tipo: "Roupas"
  },
  {
    endereco: "rua das castanheiras, 150 - Adrianópolis, Manaus",
    id: "1757186200027",
    nome: "thiago pinto",
    quantidade: "7",
    tipo: "Alimentos"
  },
  {
    endereco: "rua aurora, 300 - Alvorada, Manaus",
    id: "1757186200028",
    nome: "carolina ferraz",
    quantidade: "3",
    tipo: "Roupas"
  }
];

async function popularFirestore() {
  try {
    for (let item of dados) {
      await addDoc(collection(db, "doacoes"), item);
      console.log("Documento adicionado:", item.nome);
    }
    console.log("✅ Dados populados com sucesso!");
  } catch (e) {
    console.error("Erro ao adicionar documentos: ", e);
  }
}

popularFirestore();
