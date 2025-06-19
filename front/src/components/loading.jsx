const Loading = ({loading}) => {
    if(loading) return (
        <div className="loading-bg min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#000000cc" }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center">
                        <h1 className="mb-4">Loading...</h1>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading