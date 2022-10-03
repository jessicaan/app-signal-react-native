import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Keyboard,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Avatar } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { useRoute } from "@react-navigation/native";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitleAlign: "left",
      headerBackTitleVisible: false,
      headerTitle: () => (
        <View className="flex-row items-center mr-40">
          <Avatar
            rounded
            source={{
              uri: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
            }}
            className="h-8 w-8"
          />
          <Text className="text-white ml-1 font-extrabold font-xl">
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View className="flex-row justify-between w-20 items-center">
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const sendMessage = () => {
    Keyboard.dismiss();

    addDoc(collection(db, "chats", route.params.id, "messages"), {
      timestamp: serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    setInput("");
  };

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "chats", route.params.id, "messages"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
    );
  }, [route.params.id, db]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="light" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView className="flex-1">
              {messages.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View
                    className="bg-[#ECECEC] rounded-2xl rounded-br-none px-5 py-5 mx-10 my-2 ml-14"
                    style={{ alignSelf: "flex-end" }}
                  >
                    <Avatar
                      className="w-8 h-8 top-8 -right-8 absolute "
                      rounded
                      source={{ uri: data.photoURL }}
                    />
                    <Text className="">{data.message}</Text>
                  </View>
                ) : (
                  <View
                    className="bg-[#2b68e1] rounded-2xl rounded-tl-none px-5 py-3 mx-3 my-2 ml-14"
                    style={{ alignSelf: "flex-start" }}
                  >
                    <Avatar
                      className="w-8 h-8 top-8 -left-8 absolute "
                      rounded
                      source={{ uri: data.photoURL }}
                    />
                    <Text className="text-white">{data.message}</Text>
                    <Text className="text-white font-light">
                      {data.displayName}
                    </Text>
                  </View>
                )
              )}
            </ScrollView>

            <View className="flex-row items-center w-full p-5">
              <TextInput
                placeholder="Enviar uma mensagem"
                value={input}
                onSubmitEditing={sendMessage}
                onChangeText={setInput}
                className="bottom-0 h-10 flex-1 mr-5 border='#ECECEC' pl-4 bg-gray-100 rounded-lg "
              />
              <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                <Ionicons name="send" size={24} color="#2b68e6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
