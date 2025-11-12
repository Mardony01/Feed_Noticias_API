import { Stack, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Layout = () => {
  const router = useRouter();

  return (
    <Stack>
      {/* Tela inicial (login) sem cabeçalho */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      {/* Tela principal (Home) com botão de sair no topo */}
      <Stack.Screen
        name="home"
        options={{
          title: "📰 Notícias",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.replace("/")}
              style={{ marginRight: 16 }}
            >
              <Ionicons name="log-out-outline" size={24} color="#007AFF" />
            </TouchableOpacity>
          ),
        }}
      />

      {/* Tela de detalhes */}
      <Stack.Screen
        name="Details"
        options={{
          title: "Detalhes da Notícia",
          headerBackTitle: "Voltar",
        }}
      />
    </Stack>
  );
};

export default Layout;
