import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from "react-native-elements";
import { db } from "../firebase";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const CustomListItens = ({ navigation, id, chatName, enterChat, route }) => {
  const [lastMessage, setLastMessage] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "chats", id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message)
      ),
    [doc, db]
  );

  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
      <Avatar
        rounded
        source={{
          uri: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
        }}
      />
      <ListItem.Content>
        <ListItem.Title className="font-bold">{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {lastMessage || "Inicie uma conversa..."}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItens;
