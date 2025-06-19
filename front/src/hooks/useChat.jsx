import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { serverUri } from "../serverUri";
const socket = io(serverUri); // Usa tu dominio backend en producción

const useChat = () => {
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [myUser, setMyUser] = useState(null);
  const [selectedContact, setSelectedContact] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef(socket);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const getMyUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setMyUser(user);
    } else {
      console.log("No user found in localStorage");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(serverUri + "/api/v1/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchChats = async () => {
      try {
        const response = await axios.get(serverUri + "/api/v1/chats");
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchUsers();
    getMyUser();
    fetchChats();

    // Socket listener
    socketRef.current.on("receiveMessage", (message) => {
      setChats((prevChats) => [...prevChats, message]);
    });

    return () => {
      socketRef.current.off("receiveMessage");
    };
  }, []);

  function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = fecha.getFullYear();
    const horas = String(fecha.getHours()).padStart(2, "0");
    const minutos = String(fecha.getMinutes()).padStart(2, "0");
    return `${dia}-${mes}-${anio} ${horas}:${minutos}`;
  }

  const handleSendMessage = () => {
    const data = {
      fromId: myUser?._id,
      toId: selectedContact?._id,
      message: newMessage
    };

    if (!data.fromId || !data.toId || !data.message.trim()) {
      alert("Debes elegir un contacto y escribir un mensaje");
      return;
    }

    sendMessage(data);
    socketRef.current.emit("sendMessage", data);
    setNewMessage("");
  };

  const sendMessage = async ({ fromId, toId, message }) => {
    try {
      const response = await axios.post(serverUri + "/api/v1/chats", {
        fromId,
        toId,
        message
      });
      // Ya lo agrega el socket, así que puedes evitar duplicados si quieres
    } catch (error) {
      alert("Error al enviar el mensaje");
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (chats.length > 0 && myUser) {
      const filtered = chats.filter(chat =>
        [chat.fromId, chat.toId].includes(myUser._id) &&
        [chat.fromId, chat.toId].includes(selectedContact._id)
      );
      setFilteredChats(filtered);
    } else {
      setFilteredChats([]);
    }
  }, [chats, myUser, selectedContact]);

  return {
    handleKeyPress, users, setUsers,
    chats, setChats,
    myUser, setMyUser,
    selectedContact, setSelectedContact,
    messages, setMessages,
    newMessage, setNewMessage,
    getMyUser, handleSendMessage,
    formatearFecha,
    sendMessage,
    filteredChats, setFilteredChats
  };
};

export default useChat;
