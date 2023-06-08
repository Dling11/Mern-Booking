import "./index.css"
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <a href="http://localhost:3000/"><span className="Logo">DLing's Hotel</span></a>
        <div className="navItems">
          <button className="navButton">
            Register
          </button>
          <button className="navButton">
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar