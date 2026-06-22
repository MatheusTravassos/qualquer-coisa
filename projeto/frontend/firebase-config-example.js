/**
 * Configuração do Firebase (quando necessário)
 * 
 * Para usar Firebase:
 * 1. Crie um projeto em https://console.firebase.google.com
 * 2. Copie as credenciais
 * 3. Descomente o código abaixo
 * 4. Importe firebase-app.js no index.html antes de script.js
 * 5. Use as funções abaixo no seu código
 */

// import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js';
// import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js';
// import { getAuth, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js';

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "your-project.firebaseapp.com",
//   projectId: "your-project-id",
//   storageBucket: "your-project.appspot.com",
//   messagingSenderId: "123456789",
//   appId: "1:123456789:web:abcdef123456"
// };

// // Inicializar Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth(app);

// // Exemplo: Buscar cidades do Firestore
// async function loadCitiesFromFirebase() {
//   const citiesCollection = collection(db, 'cities');
//   const snapshot = await getDocs(citiesCollection);
//   return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// }

// // Exemplo: Adicionar cidade no Firestore
// async function addCityToFirebase(name, info) {
//   await addDoc(collection(db, 'cities'), { name, info });
// }
