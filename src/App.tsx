import { Routes , Route } from "react-router-dom"
import Discover from "./pages/Discover"
import Home from "./pages/Home"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Home /> }></Route>
        <Route path="/discover" element={ <Discover /> }></Route>
      </Routes>
    </>
  )
}

export default App
