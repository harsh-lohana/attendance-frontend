import { Link } from "react-router";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import toast from "react-hot-toast";

const Card = ({ title, content, id, date, user }) => {
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        const item = localStorage.getItem("userInfo");
        const userInfo = JSON.parse(item);
        const config = {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        };
        await axios.delete(`/api/blogs/${id}`, config);
        toast.success("Deleted blog successfully!");
      } catch (error) {
        toast.error("Error occured!");
        console.log(error.message);
      }
    }
  };
  return (
    <div className="border-solid border-2 border-blue-500 rounded-md my-5 bg-yellow-300">
      <h3 className="text-2xl border-solid border-b-2 border-blue-500 my-1 mx-2">
        {title}
      </h3>
      <ReactMarkdown className="text-lg my-1 mx-2">{content}</ReactMarkdown>
      <Link
        className="bg-blue-500 m-2 py-1 px-2 rounded-md font-semibold"
        to={`/blogs/${id}`}
      >
        Edit
      </Link>
      <button
        className="bg-red-600 m-2 py-1 px-2 rounded-md font-semibold"
        onClick={() => deleteHandler(id)}
      >
        Delete
      </button>
      <p className="text-sm text-gray-700 my-1 mx-2">
        Created at {date.substring(0, 10)}
      </p>
      <p className="text-sm text-gray-700 my-1 mx-2">Created by {user}</p>
    </div>
  );
};

export default Card;
