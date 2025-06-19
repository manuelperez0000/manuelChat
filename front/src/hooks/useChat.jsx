import { useEffect, useState } from "react"
import axios from "axios"
const useChat = () => {

    const [users, setUsers] = useState([])
    const [chats, setChats] = useState([])
    const [filteredChats, setFilteredChats] = useState([])
    const [myUser, setMyUser] = useState(null)
    const [selectedContact, setSelectedContact] = useState({})
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSendMessage()
        }
    }

    const getMyUser = () => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            setMyUser(user)
        } else {
            console.log("No user found in localStorage")
        }
    }

    useEffect(() => {
        // Fetch users from the API and set them in Zustand store
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/users")
                setUsers(response.data)
            } catch (error) {
                console.error("Error fetching users:", error)
            }
        }

        // Fetch chats from the API
        const fetchChats = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/chats")
                setChats(response.data)
                console.log("Chats fetched:", response.data)
            } catch (error) {
                console.error("Error fetching chats:", error)
            }
        }

        fetchUsers()
        getMyUser()
        fetchChats()
    }, [])



    function formatearFecha(fechaISO) {
        const fecha = new Date(fechaISO);

        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // los meses empiezan en 0
        const anio = fecha.getFullYear();

        const horas = String(fecha.getHours()).padStart(2, '0');
        const minutos = String(fecha.getMinutes()).padStart(2, '0');

        return `${dia}-${mes}-${anio} ${horas}:${minutos}`;
    }

    const handleSendMessage = () => {
        const data = {
            fromId: myUser._id,
            toId: selectedContact._id,
            message: newMessage
        }

        if (!data.fromId || !data.toId || !data.message) {
            alert("Debes elegir un contacto y escribir un mensaje")
            console.error("All fields are required to send a message")
            return
        }
        sendMessage(data)
    }

    const sendMessage = async ({ fromId, toId, message }) => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/chats", {
                fromId,
                toId,
                message
            });
            console.log("Message sent:", response.data);
            setChats([...chats, response.data]);

        } catch (error) {
            alert("Error al enviar el mensaje")
            console.error("Error sending message:", error);
        }
    }

    useEffect(() => {
        if (chats.length > 0 && myUser) {
            const filtered = chats.filter(chat => chat.fromId === myUser._id || chat.toId === myUser._id);
            const nextFilter = filtered.filter(chat => chat.fromId === selectedContact._id || chat.toId === selectedContact._id); 
            setFilteredChats(nextFilter);
            console.log("Filtered chats:", filtered);
        } else {
            setFilteredChats([]);
        }
    }
    ,[chats, myUser, selectedContact])

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

    }
}

export default useChat