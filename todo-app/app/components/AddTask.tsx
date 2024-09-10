"use client";
import React, { FormEventHandler, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import Modal from './Modal'
import { addTodo } from '@/api';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';   // id generator

const AddTask = () => {
    
    const router =useRouter();  //FOR auto refresh 

    const [modalOpen,setModalOpen] = useState<boolean>(false);
    const [newTaskValue,setNewTaskValue] = useState<string>('');

    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

       {/* console.log(newTaskValue);*/}

       await addTodo({
          id:uuidv4(),   // id generator earlier it was 1
        text:newTaskValue,
       });

        setNewTaskValue('');
        setModalOpen(false);
        router.refresh(); //FOR auto refresh 
    }


  return (
    <div>
        <button 
        onClick={() =>setModalOpen(true)} 
        className='btn btn-primary w-full'>Add new task
        <AiOutlinePlus className='ml-2' size={18}/>
        
        </button>
         
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>

          <form  onSubmit={handleSubmitNewTodo} >
            <h3 className='font-bold text-lg'>Add new task</h3>
            <div className='modal-action '>
              
                <input 
                 value={newTaskValue}
                 onChange={e => setNewTaskValue(e.target.value)}
                  type='text'
                  placeholder='Task name'
                  className='input input-bordered w-full '
                />
                
                <button type='submit' className='btn'>Submit</button>

            </div>
          </form>

        </Modal>
       
    </div>
  )
}

export default AddTask