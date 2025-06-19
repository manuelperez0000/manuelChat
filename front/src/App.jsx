import { useState } from "react"
import Router from "./Router"
import Loading from "./components/loading"
const App = () => {
  const [loading,setLoading] = useState()
  return (
    <div>
      <Loading loading={loading} />
      <Router setLoading={setLoading} />
    </div>
  )
}

export default App