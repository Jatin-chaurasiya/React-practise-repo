import React from "react";
import {useState, useEffect} from "react";
import Form from "./form";

const MainContent = () => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    body: ""
  });

  useEffect(() => { 
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error("Error fetching data:", error));
  }, []);
  const nextPost = () => {
    if(index < data.length - 1) {
      setIndex(index + 1);
    } 
  };
  const prevPost = () => {
    if(index > 0) {
      setIndex(index - 1);
    }
  };
  if(data.length === 0) { 
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <h2>Post Id: {data[index].id}</h2>
      <h3>{data[index].title}</h3>

      <p>{data[index].body}</p>
      <button
        onClick={prevPost}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mr-2"
        disabled={index === 0}
      >
        Previous Post
      </button>
      <button 
        onClick={nextPost}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        disabled={index >= data.length - 1}
      >
        Next Post
      </button> 
      <div className="mt-8">
      <h2 className="bg-black text-white text-center">Add Post</h2>
      <Form/>
      </div>
    </div>
  );
}
export default MainContent;