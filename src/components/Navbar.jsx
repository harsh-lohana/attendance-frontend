import { Link } from "react-router";
import { useNavigate } from "react-router";

const Navbar = ({ setSearch }) => {
  const navigate = useNavigate();
  const item = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(item);
  return (
    <div className="flex justify-center ">
      <nav className="w-[90%] p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-500">
          <Link to="/">Attendance</Link>
        </h1>
        <form action="">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            className="border-solid border-2 border-blue-500 rounded-md bg-yellow-300"
          />
        </form>
        <div className="flex gap-3 items-center">
          <button
            className="my-2 py-1 px-2"
            onClick={() => navigate(`/user/${userInfo._id}`)}
          >
            <img
              src={userInfo.dp}
              alt="dp"
              className="w-10 h-10 rounded-full"
            />
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("userInfo");
              navigate("/");
            }}
            className="border-solid border-2 bg-yellow-300 font-semibold border-blue-500 text-blue-700 rounded-md py-1 px-2 my-2"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
