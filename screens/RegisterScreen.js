import { View, Text, KeyboardAvoidingView, StatusBar } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { auth } from "../firebase";
import { Button, Input, Image } from "react-native-elements";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageURL, setImageURL] = useState("");
  //

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Voltar",
    });
  }, [navigation]);

  // Função de registro do usuário
  const register = () => {
    auth;
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL:
            imageURL ||
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 items-center p-10 bg-white justify-center"
    >
      <StatusBar style="light" />
      <Text className="b-10 mb-10 text-2xl">Crie uma conta no Signal</Text>
      <View className="w-full mb-10">
        <Input
          placeholder="Nome Completo *"
          autoFocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
          autoCapitalize="words"
        />
        <Input
          placeholder="E-mail *"
          type="text"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        <Input
          placeholder="Senha *"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Foto do Perfil (URL)"
          type="text"
          value={imageURL}
          onChangeText={(text) => setImageURL(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button className="w-40 " raised title="Registrar" onPress={register} />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

// Parei o video em : 12:07:35
