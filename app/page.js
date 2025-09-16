"use client"
import Todo from "@/components/Todo";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  const [formData, setFormData] = useState({
    title: "",
    description: ""
  })

  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const response = await axios.get('/api');
    setTodos(response.data.todos);
  }

  const deleteTodo = async (mongoId) => {
    const response = await axios.delete('/api', {
      params: { mongoId }
    });
    toast.success(response.data.message);
    await fetchTodos();
  }

  const updateTodo = async (id) => {
    const response = await axios.put('/api', {}, {
      params: { mongoId: id }
    });
    toast.success(response.data.message);
    await fetchTodos();
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    console.log(formData);
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post('/api', formData);
      toast.success(response.data.message);
      setFormData({
        title: "",
        description: ""
      });
      await fetchTodos();
    } catch (error) {
      toast.error("Error", error.message);
    }

  }

  return (
    <>
      <ToastContainer />
      <form onSubmit={onSubmitHandler} className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto">
        <input
          value={formData.title}
          type="text"
          onChange={handleChange}
          name="title"
          placeholder="Enter Title"
          className="py-2 px-3 border-2 w-full"
        />
        <textarea
          value={formData.description}
          name="description"
          onChange={handleChange}
          placeholder="Enter Description"
          className="py-2 px-3 border-2 w-full"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 py-3 px-11 text-white cursor-pointer"
        >
          Add Todo
        </button>
      </form>

      <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              todos.map((todo, index) => (
                <Todo key={index} id={index} title={todo.title} description={todo.description} complete={todo.isCompleted} mongoId={todo._id} deleteTodo={deleteTodo} completeTodo={updateTodo} />
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
