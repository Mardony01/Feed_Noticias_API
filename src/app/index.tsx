import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useLoginViewModel } from "../viewmodel/UserLoginViewModel";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userId, loading, error, handleLogin } = useLoginViewModel();

  useEffect(() => {
    if (userId) {
      router.replace("/home");
    } else {
      setEmail("");
      setPassword("");
    }
  }, [userId, error]);

  if (loading) {
    return (
      <View style={styles.splashContainer}>
        <Ionicons name="newspaper-outline" size={100} color="#007AFF" />
        <Text style={styles.splashText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Ionicons name="newspaper-outline" size={80} color="#007AFF" style={{ marginBottom: 10 }} />
      <Text style={styles.title}>MDN Notice</Text>
      <Text style={styles.subtitle}>Acesse sua conta</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={() => handleLogin(email, password)}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {error ? <Text style={styles.error}>⚠️ {error}</Text> : null}
      </View>

      <View style={styles.testInfo}>
        <Text style={styles.testTitle}>🧪 Login de Teste</Text>
        <Text style={styles.testText}>Email: <Text style={styles.bold}>Noobmaster69 </Text></Text>
        <Text style={styles.testText}>Senha: <Text style={styles.bold}>entradaUSB</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Layout principal
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fb",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007AFF",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },

  form: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  input: {
    width: "100%",
    height: 46,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  error: {
    color: "#c00",
    marginTop: 10,
    fontWeight: "500",
    textAlign: "center",
  },

  // Splash
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  splashText: {
    fontSize: 18,
    color: "#007AFF",
    marginTop: 12,
    fontWeight: "600",
  },

  // Card de login de teste
  testInfo: {
    marginTop: 30,
    backgroundColor: "#eaf3ff",
    padding: 16,
    borderRadius: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "#bcd7ff",
  },
  testTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#007AFF",
    marginBottom: 6,
  },
  testText: {
    fontSize: 14,
    color: "#333",
  },
  bold: {
    fontWeight: "600",
  },
});
