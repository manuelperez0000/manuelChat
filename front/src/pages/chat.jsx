"use client"

import avatarImages from "../avatars/importers"
import useChat from "../hooks/useChat"


function Chat() {

  const { handleKeyPress, users,
    filteredChats,
    myUser,
    selectedContact, setSelectedContact,
    newMessage, setNewMessage, handleSendMessage, formatearFecha } = useChat()

  return (
    <div className="container-fluid p-0" style={{ height: "100vh" }}>
      <div className="row g-0 h-100">
        {/* Sidebar */}
        <div className="col-4 bg-white border-end h-100">
          <div className="d-flex flex-column h-100">
            {/* Header */}

            {myUser && (
              <div className="p-3 bg-light border-bottom d-flex align-items-center">
                <div className="position-relative me-3">
                  <div
                    className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white fw-bold"
                    style={{ width: "45px", height: "45px" }}
                  >
                    <img src={avatarImages[myUser.avatar - 1]?.img} className="avatarImg" alt="" />
                  </div>
                </div>
                <h6 className="mb-0 text-dark">{myUser.name} <br /></h6>
              </div>
            )}

            {/* usuarios */}
            <div className="px-2 py-2 bg-light border-bottom">
              <div className="d-flex justify-content-between align-items-center mb-0">
                <h4 className="mb-0 text-dark">Usuarios</h4>
              </div>
            </div>

            {/* Contactos */}
            <div className="flex-grow-1 overflow-auto">
              {users.filter((user) => user.name !== myUser.name).map((contact) => (
                <div
                  key={contact._id}
                  className={`p-3 border-bottom cursor-pointer ${selectedContact._id === contact._id ? "bg-success bg-opacity-10" : ""
                    }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedContact(contact)}
                  onMouseEnter={(e) => {
                    if (selectedContact._id !== contact._id) {
                      e.target.closest("div").style.backgroundColor = "#f8f9fa"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedContact._id !== contact._id) {
                      e.target.closest("div").style.backgroundColor = "transparent"
                    }
                  }}
                >
                  <div className="d-flex align-items-center bg-trasparent">
                    <div className="position-relative me-3">
                      <div
                        className="rounded-circle bg-secondary d-flex align-items-center justify-content-center fw-bold"
                        style={{ width: "50px", height: "50px" }}
                      >
                        <img src={avatarImages[contact.avatar - 1].img} className="avatarImg" alt="" />
                      </div>

                      {/* {contact.online && (
                        <span
                          className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-white"
                          style={{ width: "15px", height: "15px" }}
                        ></span>
                      )} */}
                    </div>

                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0 text-dark">{contact.name}</h6>

                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-1">
                        <p className="mb-0 text-muted small text-truncate" style={{ maxWidth: "200px" }}>

                        </p>
                        {/* {contact.unread && <span className="badge bg-success rounded-pill">{contact.unread}</span>} */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="col-8 d-flex flex-column h-100" >
          {/* Chat Header */}
          <div className="p-3 bg-light border-bottom d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div className="position-relative me-3">
                <div
                  className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white fw-bold"
                  style={{ width: "45px", height: "45px" }}
                >
                  <img src={avatarImages[selectedContact.avatar - 1]?.img} className="avatarImg" alt="" />

                </div>
                {/* {selectedContact.online && (
                  <span
                    className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-white"
                    style={{ width: "12px", height: "12px" }}
                  ></span>
                )} */}
              </div>
              <div>
                {selectedContact.name ? (
                  <h6 className="mb-0 text-dark">{selectedContact.name}</h6>
                ) : (
                  <h6 className="mb-0 text-dark">Selecciona un contacto</h6>
                )}
              </div>
            </div>
            <div>
              {/*boton de regresar al lobby*/}
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => window.location.href = "/"}
              >
                <i className="bi bi-arrow-left"></i> Regresar al Lobby
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-grow-1 p-3 overflow-auto" >
            <div className="d-flex flex-column gap-3">
              {filteredChats.map((message) => (
                <div
                  key={message._id}
                  className={`d-flex ${myUser._id === message.fromId ? "justify-content-end" : "justify-content-start"}`}
                >
                  <div
                    className={`px-3 py-2 rounded-3 position-relative ${myUser._id === message.fromId ? "bg-success text-white" : "bg-white text-dark border"
                      }`}
                    style={{ maxWidth: "70%" }}
                  >
                    <p className="mb-1 small">{message.message}</p>
                    {/* <div>
                      from: <small style={{ fontSize: "0.7rem" }}>{message.fromId}</small>
                    </div>
                    <div>
                      to: <small style={{ fontSize: "0.7rem" }}>{message.toId}</small>
                    </div> */}
                    <div
                      className={`d-flex align-items-center justify-content-end gap-1 ${myUser._id === message.fromId ? "text-white-50" : "text-muted"
                        }`}
                    >
                      <small style={{ fontSize: "0.7rem" }}>{formatearFecha(message.createdAt)}</small>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-3 bg-white border-top">
            <div className="d-flex align-items-center gap-2">


              <div className="flex-grow-1">
                <input
                  type="text"
                  className="form-control"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyUp={handleKeyPress}
                  placeholder="Escribe un mensaje"
                />
              </div>


              <button onClick={handleSendMessage} className="btn btn-success btn-sm">
                <i className="bi bi-send"></i>
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
