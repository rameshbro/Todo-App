// import React from 'react'
// import { useState, useRef, useEffect } from 'react';
// import { IoCheckmarkDoneSharp } from "react-icons/io5";
// import { AiTwotoneDelete } from "react-icons/ai";
// import { FaRegEdit } from "react-icons/fa";

// const Toto = () => {

//   const [todo, setTodo] = useState("");
//   const [todos, setTodos] = useState([]);
//   const [editId,setEditId] = useState(0);


//   const handleSubmit = (e) => {
//     e.preventDefault();


//   }
//   const addTodo = () => {
//     if (todo !== '') {
//       // Handle the add case
//       setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
//       setTodo("");


//     if (editId) {
//       // Handle the update case
//       const updatedTodos = todos.map((to) =>
//         to.id === editId ? { ...to, list: todo } : to
//       );
//       setTodos(updatedTodos);
//       setEditId(0);
//       setTodo("");
//     }  
//     }
//   };
  
//   const inputRef = useRef('null')

//   useEffect(() => {
//     inputRef.current.focus();

//   })
//   const onDelete=(id)=>{
//     setTodos(todos.filter((to)=>to.id !== id))
//   }

//   const onComplete = (id)=>{
//     let complete = todos.map((list)=>{
//        if(list.id === id){
//         return ({...list,status : !list.status })
//        }
//        return list;
//     })
//     setTodos(complete)

//   }

//   const onEdit = (id)=>{
//    const editTodo= todos.find((to)=>to.id === id)
//    setTodo(editTodo.list);
//    setEditId(editTodo.id)
//   }

//   return (
//     <div className=' mx-80 p-5 space-y-4 mt-6 border-none rounded-xl bg-emerald-800'>
//       <h1 className='text-center text-3xl font-bold text-white'>TODO APP</h1>
//       <form className='flex w-auto m-5 space-x-3 form-control' onSubmit={handleSubmit}>
//         <input type="text" className='border-2 border-gray-400 w-11/12' ref={inputRef} value={todo} onChange={(event) => setTodo(event.target.value)} />
//         <button className='text-white font-bold bg-black rounded-xl p-2 ' type='submit' onClick={addTodo} >{editId ? 'Edit':'Add '}</button>

//       </form>
//       <ul className='ml-4 space-y-3'>
//         {
//           todos.map((to, index) => {
//             return <li className={to.status ? 'border-none bg-black text-white line-through text-opacity-25 rounded-xl p-2 flex justify-between':'border-none bg-black text-white rounded-xl p-2 flex justify-between'} key={index} ><div >{to.list}</div>
//               <span className='flex gap-2'>
//                     <IoCheckmarkDoneSharp title='Complete' className='text-green-400' onClick={()=>onComplete(to.id)} />
//                     <FaRegEdit title='Edit' className='text-blue-500' onClick={()=>onEdit(to.id)} />
//                      <AiTwotoneDelete title='Delete' className='text-yellow-400' onClick={()=>onDelete(to.id)}/>
//               </span> </li>
//           })
//         }

//       </ul>
//     </div>
//   )
// }

// export default Toto

import React, { useState, useRef, useEffect } from 'react';
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";

const TodoApp = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      // Update existing todo
      setTodos(todos.map(item => item.id === editId ? { ...item, list: todo } : item));
      setEditId(null);
    } else if (todo.trim()) {
      // Add new todo
      setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
    }
    setTodo("");
  };

  const onDelete = (id) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  const onComplete = (id) => {
    setTodos(todos.map(item => item.id === id ? { ...item, status: !item.status } : item));
  };

  const onEdit = (id) => {
    const todoToEdit = todos.find(item => item.id === id);
    setTodo(todoToEdit.list);
    setEditId(id);
  };

  return (
    <div className='mx-80 p-5 space-y-4 mt-6 border-none rounded-xl bg-emerald-800'>
      <h1 className='text-center text-3xl font-bold text-white'>TODO APP</h1>
      <form className='flex w-auto m-5 space-x-3' onSubmit={handleSubmit}>
        <input
          type="text"
          className='border-2 border-gray-400 w-11/12'
          ref={inputRef}
          value={todo}
          onChange={(event) => setTodo(event.target.value)}
        />
        <button className='text-white font-bold bg-black rounded-xl p-2' type='submit'>
          {editId ? 'Edit' : 'Add'}
        </button>
      </form>
      <ul className='ml-4 space-y-3'>
        {todos.map((item) => (
          <li key={item.id} className={`border-none bg-black text-white rounded-xl p-2 flex justify-between ${item.status ? 'line-through text-opacity-25' : ''}`}>
            <div>{item.list}</div>
            <span className='flex gap-2'>
              <IoCheckmarkDoneSharp title='Complete' className='text-green-400' onClick={() => onComplete(item.id)} />
              <FaRegEdit title='Edit' className='text-blue-500' onClick={() => onEdit(item.id)} />
              <AiTwotoneDelete title='Delete' className='text-yellow-400' onClick={() => onDelete(item.id)} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
