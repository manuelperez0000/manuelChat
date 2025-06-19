import useLobby from "../hooks/useLobby"
import avatarImages from "../avatars/importers"
import Loading from "../components/Loading"

export default function Home() {

  const { selectedAvatar, setSelectedAvatar,
    username, setUsername,
    handleKeyPress,
    login, loading } = useLobby()

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#f8f9fa" }}>
      {loading && <Loading loading={loading} />}
      <div className="container p-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow-lg border-0 rounded-5">
              <div className="card-body p-5">
                <div className="text-center mb-5">
                  <div className="mb-4">
                    <i className="bi bi-chat-dots-fill text-success" style={{ fontSize: "4rem" }}></i>
                  </div>
                  <h1 className="h2 text-dark mb-2">¡Bienvenido al Chat!</h1>
                  <p className="text-muted">Personaliza tu perfil para comenzar a chatear</p>
                </div>

                {/* Avatar Selection */}
                <div className="mb-4">
                  <h5 className="text-dark mb-3">
                    <i className="bi bi-person-circle me-2"></i>
                    Selecciona tu avatar
                  </h5>
                  <div className="row g-3">
                    {avatarImages.map((avatar) => (
                      <div key={avatar.id} className="col-3">
                        <div
                          className={`avatar-option rounded-circle d-flex align-items-center justify-content-center text-white fw-bold position-relative
                             ${selectedAvatar?.id === avatar.id ? "selected" : ""}`}
                          style={{
                            width: "60px",
                            height: "60px",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            transform: selectedAvatar?.id === avatar.id ? "scale(1.1)" : "scale(1)",
                            border: selectedAvatar?.id === avatar.id ? "3px solid #198754" : "3px solid transparent",
                          }}
                          onClick={() => setSelectedAvatar(avatar)}
                          onMouseEnter={(e) => {
                            if (selectedAvatar?.id !== avatar.id) {
                              e.target.style.transform = "scale(1.05)"
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedAvatar?.id !== avatar.id) {
                              e.target.style.transform = "scale(1)"
                            }
                          }}
                        >
                          <img src={avatar.img} className="avatarImg" alt="" />

                          {selectedAvatar?.id === avatar.id && (
                            <div
                              className="position-absolute top-0 end-0 bg-success rounded-circle d-flex align-items-center justify-content-center"
                              style={{ width: "20px", height: "20px", transform: "translate(25%, -25%)" }}
                            >
                              <i className="bi bi-check text-white" style={{ fontSize: "0.8rem" }}></i>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {!selectedAvatar && (
                    <small className="text-muted mt-2 d-block">
                      <i className="bi bi-info-circle me-1"></i>
                      Haz clic en un avatar para seleccionarlo
                    </small>
                  )}
                </div>

                {/* Username Input */}
                <div className="mb-4">
                  <h5 className="text-dark mb-3">
                    <i className="bi bi-person-badge me-2"></i>
                    Tu nombre de usuario
                  </h5>
                  <div className="position-relative">
                    <i className="bi bi-person position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                    <input
                      type="text"
                      className="form-control form-control-lg ps-5"
                      placeholder="Ingresa tu nombre"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onKeyPress={handleKeyPress}
                      maxLength={20}
                      style={{ backgroundColor: "#f8f9fa", border: "2px solid #e9ecef" }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#198754"
                        e.target.style.backgroundColor = "#fff"
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e9ecef"
                        e.target.style.backgroundColor = "#f8f9fa"
                      }}
                    />
                  </div>

                </div>

                {/* Preview */}
                {selectedAvatar && username.trim() && (
                  <div className="mb-4 p-3 bg-light rounded-3">
                    <h6 className="text-dark mb-2">
                      <i className="bi bi-eye me-2"></i>
                      Vista previa
                    </h6>
                    <div className="d-flex align-items-center">
                      <div
                        className={`rounded-circle d-flex align-items-center justify-content-center text-white fw-bold me-3 ${selectedAvatar.color}`}
                        style={{ width: "45px", height: "45px" }}
                      >
                        <img src={selectedAvatar.img} className="avatarImg" alt="" />
                      </div>
                      <div>
                        <h6 className="mb-0 text-dark">{username}</h6>
                        <small className="text-success">
                          <i className="bi bi-circle-fill me-1" style={{ fontSize: "0.5rem" }}></i>
                          En línea
                        </small>
                      </div>
                    </div>
                  </div>
                )}

                {/* Continue Button */}
                <div className="d-grid">
                  <button
                    onClick={login}
                    disabled={!selectedAvatar || !username.trim()}
                    className={`btn btn-lg ${selectedAvatar && username.trim() ? "btn-success" : "btn-secondary"}`}
                    style={{
                      transition: "all 0.3s ease",
                      transform: selectedAvatar && username.trim() ? "scale(1)" : "scale(0.98)",
                    }}
                  >
                    {selectedAvatar && username.trim() ? (
                      <>
                        <i className="bi bi-chat-right-dots me-2"></i>
                        Comenzar a chatear
                      </>
                    ) : (
                      <>
                        <i className="bi bi-exclamation-circle me-2"></i>
                        Completa tu perfil
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
