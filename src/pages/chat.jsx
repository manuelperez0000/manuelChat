import { useState } from "react"

function Chat() {

const contacts = [
  {
    id: 1,
    name: "Ana García",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "¡Hola! ¿Cómo estás?",
    time: "10:30",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Carlos López",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Perfecto, nos vemos mañana",
    time: "09:15",
    online: false,
  },
  {
    id: 3,
    name: "María Rodríguez",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "¿Has visto las fotos?",
    time: "Ayer",
    unread: 1,
    online: true,
  },
  {
    id: 4,
    name: "Equipo Desarrollo",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "La reunión es a las 3pm",
    time: "Ayer",
    online: false,
  },
  {
    id: 5,
    name: "Laura Martín",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "¡Gracias por tu ayuda!",
    time: "Lunes",
    online: true,
  },
]

const initialMessages = [
  {
    id: 1,
    text: "¡Hola! ¿Cómo estás?",
    time: "10:25",
    sent: false,
  },
  {
    id: 2,
    text: "¡Hola Ana! Todo bien, ¿y tú?",
    time: "10:26",
    sent: true,
    read: true,
  },
  {
    id: 3,
    text: "Muy bien también. ¿Tienes planes para el fin de semana?",
    time: "10:27",
    sent: false,
  },
  {
    id: 4,
    text: "Sí, pensaba ir al parque con la familia. ¿Te gustaría acompañarnos?",
    time: "10:28",
    sent: true,
    read: true,
  },
  {
    id: 5,
    text: "¡Me encantaría! ¿A qué hora?",
    time: "10:30",
    sent: false,
  },
]

  const [selectedContact, setSelectedContact] = useState(contacts[0])
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        time: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
        sent: true,
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  return (
    <div className="container-fluid p-0" style={{ height: "100vh" }}>
      <div className="row g-0 h-100">
        {/* Sidebar */}
        <div className="col-4 bg-white border-end">
          <div className="d-flex flex-column h-100">
            {/* Header */}
            <div className="p-3 bg-light border-bottom">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0 text-dark">Chats</h4>
                <button className="btn btn-light btn-sm">
                  <i className="bi bi-three-dots-vertical"></i>
                </button>
              </div>

              {/* Search */}
              <div className="position-relative">
                <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Buscar o empezar un chat nuevo"
                  style={{ backgroundColor: "#f8f9fa" }}
                />
              </div>
            </div>

            {/* Contacts List */}
            <div className="flex-grow-1 overflow-auto">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`p-3 border-bottom cursor-pointer ${
                    selectedContact.id === contact.id ? "bg-success bg-opacity-10" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedContact(contact)}
                  onMouseEnter={(e) => {
                    if (selectedContact.id !== contact.id) {
                      e.target.closest("div").style.backgroundColor = "#f8f9fa"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedContact.id !== contact.id) {
                      e.target.closest("div").style.backgroundColor = "transparent"
                    }
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div className="position-relative me-3">
                      <div
                        className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white fw-bold"
                        style={{ width: "50px", height: "50px" }}
                      >
                        {getInitials(contact.name)}
                      </div>
                      {contact.online && (
                        <span
                          className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-white"
                          style={{ width: "15px", height: "15px" }}
                        ></span>
                      )}
                    </div>

                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0 text-dark">{contact.name}</h6>
                        <small className="text-muted">{contact.time}</small>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-1">
                        <p className="mb-0 text-muted small text-truncate" style={{ maxWidth: "200px" }}>
                          {contact.lastMessage}
                        </p>
                        {contact.unread && <span className="badge bg-success rounded-pill">{contact.unread}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="col-8 d-flex flex-column">
          {/* Chat Header */}
          <div className="p-3 bg-light border-bottom d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div className="position-relative me-3">
                <div
                  className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white fw-bold"
                  style={{ width: "45px", height: "45px" }}
                >
                  {getInitials(selectedContact.name)}
                </div>
                {selectedContact.online && (
                  <span
                    className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-white"
                    style={{ width: "12px", height: "12px" }}
                  ></span>
                )}
              </div>
              <div>
                <h6 className="mb-0 text-dark">{selectedContact.name}</h6>
                <small className="text-muted">{selectedContact.online ? "En línea" : "Última vez hace 2 horas"}</small>
              </div>
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-light btn-sm">
                <i className="bi bi-camera-video"></i>
              </button>
              <button className="btn btn-light btn-sm">
                <i className="bi bi-telephone"></i>
              </button>
              <button className="btn btn-light btn-sm">
                <i className="bi bi-three-dots-vertical"></i>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-grow-1 p-3 overflow-auto"
            style={{
              backgroundColor: "#f8f9fa",
              backgroundImage:
                'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="chat-bg" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="%23e9ecef" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23chat-bg)"/></svg>\')',
            }}
          >
            <div className="d-flex flex-column gap-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`d-flex ${message.sent ? "justify-content-end" : "justify-content-start"}`}
                >
                  <div
                    className={`px-3 py-2 rounded-3 position-relative ${
                      message.sent ? "bg-success text-white" : "bg-white text-dark border"
                    }`}
                    style={{ maxWidth: "70%" }}
                  >
                    <p className="mb-1 small">{message.text}</p>
                    <div
                      className={`d-flex align-items-center justify-content-end gap-1 ${
                        message.sent ? "text-white-50" : "text-muted"
                      }`}
                    >
                      <small style={{ fontSize: "0.7rem" }}>{message.time}</small>
                      {message.sent && (
                        <i
                          className={`bi ${message.read ? "bi-check2-all" : "bi-check2"}`}
                          style={{ fontSize: "0.8rem" }}
                        ></i>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-3 bg-white border-top">
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-light btn-sm">
                <i className="bi bi-emoji-smile"></i>
              </button>
              <button className="btn btn-light btn-sm">
                <i className="bi bi-paperclip"></i>
              </button>

              <div className="flex-grow-1">
                <input
                  type="text"
                  className="form-control"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe un mensaje"
                />
              </div>

              {newMessage.trim() ? (
                <button onClick={handleSendMessage} className="btn btn-success btn-sm">
                  <i className="bi bi-send"></i>
                </button>
              ) : (
                <button className="btn btn-light btn-sm">
                  <i className="bi bi-mic"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
