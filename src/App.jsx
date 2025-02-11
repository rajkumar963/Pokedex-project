
import { Router, Link } from 'react-router-dom'
import './App.css'
import CustomRoutes from './routes/CustomRoutes'
function App() {

  return (
    <div className="App-container">
      <h1 id="heading">
        <Link to="/">Pokedex</Link>
      </h1>
      <CustomRoutes />
    </div>
  )
}

export default App
