import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import awsconfig from "../amplify_outputs.json"
import { Amplify } from "aws-amplify"
Amplify.configure(awsconfig)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
