import { Routes , Route } from "react-router-dom"
import Discover from "./pages/Discover"
import Home from "./pages/Home"
import DiscoverMore from "./pages/DiscoverMore"
function App() {
  return (
    <main className="">
      <Routes>
        <Route path="/" element={ <Home /> }></Route>
        <Route path="/discover" element={ <Discover /> }></Route>
        <Route path="/discoverMore" element={<DiscoverMore />} />
      </Routes>
    </main>
  )
}

export default App
