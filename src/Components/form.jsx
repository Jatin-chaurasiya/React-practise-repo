import React from "react";
import {useState} from "react";

const Form = ({addPost}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      body
    };  
    addPost(newPost);
    setTitle("");
    setBody("");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">  
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"  
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter post title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
            Body
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter post body"
            rows="4"
          ></textarea>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Post
        </button>
      </form> 
    </div>
  );
}
export default Form;