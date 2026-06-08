import React from "react";
import {useState, useEffect} from "react";
import Form from "./form";
import DeletePop from "./DeletePop";

const MainContent = () => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    body: ""
  });
  const [showDeletePop, setShowDeletePop] = useState(false);

  useEffect(() => { 
    fetch("http://localhost:5000/posts")
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
  const addPost = async(newPost) => {
    try {
      const response = await fetch("http://localhost:5000/posts", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost)
      });
      const data = await response.json();
      setData((prevPost) => [...prevPost,
        {
          ...data,
          id: prevPost.length + 1
        }
      ]);
      console.log("Post added:", data);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };
  const deletePost = async(id) => {
    try {
      const response = await fetch(`http://localhost:5000/posts/${id}`, {
        method: "DELETE"
      });
      if(response.ok) {
        setData((prevPost) => prevPost.filter(post => post.id !== id));
        console.log("Post deleted:", id);
      } else {
        console.error("Error deleting post:", response.status);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    } 
  };

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
      <Form addPost={addPost}/>
      </div>
      <div className="mt-8">
       <h2 className="bg-black text-white text-center mt-8">Delete Post</h2>
        <button
          onClick={() => setShowDeletePop(true)}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >
          Delete Current Post
        </button>
        {
          showDeletePop && (
            <DeletePop
              onClose={() => setShowDeletePop(false)} 
              onDelete={() => {
                deletePost(data[index].id);
                setShowDeletePop(false);
              }}
            />
          )
        }
      </div>
    </div>
  );
}
export default MainContent;