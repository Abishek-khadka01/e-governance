import { BrowserRouter } from "react-router-dom"
import { AppRoute } from "./routes/app.route"

export default   ()=>{
  return (
  <BrowserRouter>
  
    <AppRoute/>
  </BrowserRouter>
  )

}