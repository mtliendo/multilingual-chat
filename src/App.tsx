import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ChatProvider } from "./context/ChatContext"
import LandingPage from "./pages/LandingPage"
import ChatPage from "./pages/ChatPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/chat"
          element={
            <ChatProvider>
              <ChatPage />
            </ChatProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
