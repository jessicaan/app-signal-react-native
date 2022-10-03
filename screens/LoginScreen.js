import React, { useEffect, useState } from "react";

import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  // Set State/use State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UseEffect

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });
  }, []);

  // Funções
  const signIn = () => {
    auth;
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      alert(error)
    );
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1  items-center justify-center p-10 bg-white"
    >
      <StatusBar style="light" />

      <Image
        className="w-40 h-40 rounded-2xl m-2 "
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/2048px-Signal-Logo.svg.png",
        }}
      />
      <View className="w-full">
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        <Input
          placeholder="Senha"
          type="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>
      <Button className="w-40 mt-3" title="Entrar" onPress={signIn} />
      <Button
        className="w-40 mt-3"
        type="outline"
        title="Registrar"
        onPress={() => navigation.navigate("Register")}
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
