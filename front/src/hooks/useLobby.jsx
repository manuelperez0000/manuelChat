const serverUrl = "http://localhost:3000/api/v1"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const useLobby = () => {
    const navigate = useNavigate()
    const [selectedAvatar, setSelectedAvatar] = useState(null)
    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(false)

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleContinue()
        }
    }

    const login = async () => {
        setLoading(true)
        if (!selectedAvatar || !username.trim()) return

        const userData = {
            name: username.trim(),
            avatar: selectedAvatar.id
        }


        try {
            const response = await axios.post(serverUrl + "/users", userData)
            console.log("User created:", response.data)

            localStorage.setItem("user", JSON.stringify(response.data))

            setLoading(false)
            navigate("/chat")

        } catch (error) {
            alert("Error al intentar crear el usuario. Por favor, inténtalo de nuevo.")
            console.error("Error creating user:", error)
        } finally {
            setLoading(false)
        }
    }


    return {
        selectedAvatar, setSelectedAvatar,
        username, setUsername,
        handleKeyPress,
        login, loading, setLoading,


    }
}

export default useLobby