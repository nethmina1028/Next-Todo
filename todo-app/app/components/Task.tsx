"use client";
import { ITask } from '@/types/tasks'
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import React, { FormEventHandler, useState } from 'react'
import Modal from './Modal';
import { text } from 'stream/consumers';
import { useRouter } from 'next/navigation';
import { deleteTodo, editTodo } from '@/api';

interface TaskProps {
    task: ITask
}


const Task:React.FC<TaskProps> = ({task}) => {

  const router = useRouter();  //FOR auto refresh

  const [openModalEdit,setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted,setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit,setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo : FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

   {/* console.log(newTaskValue);*/}

   await editTodo({
      id:task.id,   // id generator earlier it was 1
    text:taskToEdit,
   });

   
    setOpenModalEdit(false);
    router.refresh(); //FOR auto refresh 
}

   const handleDeteteTask = async (id:string) =>{
        
     await deleteTodo(id);
     setOpenModalDeleted(false);
     router.refresh(); //FOR auto refresh
   }

  return (
    <tr key={task.id}>        
    <td className='w-full'>{task.text}</td>
    <td className='flex gap-5 '>

      <FiEdit onClick={() =>setOpenModalEdit(true)} cursor="pointer" className='text-blue-500' size={25} />

      <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>

    <form  onSubmit={handleSubmitEditTodo} >
      <h3 className='font-bold text-lg'>Edit task</h3>
      <div className='modal-action '>
    
      <input 
       value={taskToEdit}
       onChange={e => setTaskToEdit(e.target.value)}
        type='text'
        placeholder='Task name'
        className='input input-bordered w-full '
      />
      
      <button type='submit' className='btn'>Submit</button>

  </div>
  </form>

  </Modal>

      <FiTrash2 
      onClick={() =>setOpenModalDeleted(true)} 
      cursor="pointer"
       className='text-red-500' 
       size={25} />

      <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
               <h3 className='text-lg'>Are you sure, you want to delete this task ?</h3>
               <div className='modal-action'>
                    <button
                    onClick={() => handleDeteteTask(task.id)}
                    className='btn'
                    >
                      Yes
                    </button>
               </div>
     </Modal>

    </td>        
  </tr>
  )
}

export default Task