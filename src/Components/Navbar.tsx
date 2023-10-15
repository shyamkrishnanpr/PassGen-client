import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogin = () =>{
    navigate('/login')
  }

  return (
    <>
      <nav className="bg-gradient-to-r from-green-600 via-blue-600 to-violet-700 p-4 m-5 w-auto rounded-3xl">
        <div className="container mx-auto flex justify-between items-center">
          <a
            href="#"
            className="text-white text-2xl font-extrabold hover:text-violet-300 transition-colors"
          >
            PassWord Generator
          </a>
          <button type="button" onClick={handleLogin} className="bg-white text-blue-500 hover:bg-blue-100 text-sm font-semibold px-4 py-2 rounded-full transition duration-300 ease-in-out">
            Login
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
