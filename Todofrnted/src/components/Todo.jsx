import { CirclePlus, Check, Trash, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { addTodo, deletTodo, getTodos, updateTodo } from "../utils/apihandler.js";
import updated from '../assets/updated.png'
export default function TodoApp() {
  const [todos, setTodo] = useState([]);
  const [text, settext] = useState('');
  const [isupdating, setisupdating] = useState(false);
  const [todoId, setTodoId] = useState('');
  useEffect(() => {
    getTodos(setTodo); 
  }, []);
  const formSubmit = async (e) => {
    e.preventDefault();
    addTodo(text, settext, setTodo);
  }

  const updateformtodo = async (e) => {
    e.preventDefault();
    updateTodo(todoId, text, settext, setTodo, setisupdating);
  }
  const updateMode = async (id,text) => {
    setisupdating(true);
    setTodoId(id);
    settext(text);
  }
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 to-purple-700 px-2">
      <div className="container mx-auto flex flex-col items-center px-4">
        <h1 className="mt-10 text-purple-200 text-4xl md:text-6xl font-extrabold drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] uppercase tracking-wider text-center">
          Todo App
        </h1>

        {/* Input Form */}
        <form onSubmit={isupdating ? updateformtodo : formSubmit} className="w-full flex justify-center items-center mt-6 gap-4">
          <input
            type="text"
            className="border-none p-2 rounded-lg w-full md:w-1/2 focus:outline-none bg-white text-black"
            placeholder="Add new todo"
            value={text}
            onChange={(e)=> settext(e.target.value)}
          />
          <button
            type="submit"
            className="text-white bg-blue-900 rounded-full p-2 cursor-pointer hover:bg-blue-800 transition"
          >
            {
            isupdating ? 
            <img src={updated} className=" h-11 w-11"  />
            :
            <CirclePlus size={45} />
          }
          </button>
        </form>

        <div className="w-full md:w-2/3 mt-6 flex justify-center gap-4 flex-wrap">
          <button className="cursor-pointer px-4 py-2 rounded-xl bg-white text-black font-medium shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition">
            All
          </button>
          <button className="cursor-pointer px-4 py-2 rounded-xl bg-white text-black font-medium shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition">
            Active
          </button>
          <button className="cursor-pointer px-4 py-2 rounded-xl bg-white text-black font-medium shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition">
            Completed
          </button>
        </div>

        {/* Todo Cards */}
        <div className="flex flex-wrap items-center mb-5 justify-center mt-6 gap-6">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="border-none bg-purple-200 px-6 py-6 flex flex-col justify-between rounded-lg h-auto w-full md:w-80 shadow-md"
            >
              <p className="text-zinc-900  font-semibold text-sm md:text-base">
                {todo.text}
              </p>
              <div className="flex gap-4 justify-end mt-4">
                <button className="text-white bg-green-500 rounded-md p-2 hover:bg-green-600 transition">
                  <Check size={18} />
                </button>
                <button onClick={()=> deletTodo(todo._id,setTodo)}  className="text-white bg-red-500 rounded-md p-2 hover:bg-red-600 transition">
                  <Trash size={18} />
                </button>
                <button  onClick={()=> updateMode(todo._id,todo.text)}  className="text-white bg-blue-500 rounded-md p-2 hover:bg-blue-600 transition">
                  <Edit size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
