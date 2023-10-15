
import Router from "./Routes/Router"
import{Route,Routes,BrowserRouter as Routers} from 'react-router-dom'

function App() {
 

  return (
    <>

    <Routers>
      <Routes>
        <Route path="/*" element={<Router/>}/>
      </Routes>
    </Routers>
    
    </>
  )
}

export default App
