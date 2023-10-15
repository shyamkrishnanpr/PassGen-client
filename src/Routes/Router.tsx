
import {Routes,Route} from 'react-router-dom'

import HomePage from '../Pages/HomePage'
import LoginPage from '../Pages/LoginPage'

const Router: React.FC  = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/login' element={<LoginPage/>}/>

        </Routes>
      
    </div>
  )
}

export default Router
