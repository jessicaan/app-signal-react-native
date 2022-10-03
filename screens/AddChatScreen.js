import { View, Text } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Criar nova conversa",
      headerBackTitle: "Voltar",
    });
  }, [navigation]);

  const createChat = async () => {
    await addDoc(collection(db, "chats"), {
      chatName: input,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => alert(error));
  };

  return (
    <View className="bg-white p-10 h-full justify-center items-center">
      <View className="w-full pb-3">
        <Input
          placeholder="Digite um nome para a conversa"
          value={input}
          onChangeText={(text) => setInput(text)}
          leftIcon={
            <Icon name="wechat" type="antdesign" size={20} color="black" />
          }
        />
      </View>
      <Button onPress={createChat} title="Criar nova conversa" />
    </View>
  );
};

export default AddChatScreen;
