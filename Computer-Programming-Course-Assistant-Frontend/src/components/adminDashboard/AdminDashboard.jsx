import React, { useState } from 'react'
import MainLayout from '../dashboard/common/MainLayout'
import { useAuth } from '../../hooks/useAuthContex'
import Input from '../reusable-components/input';
import { CiEdit } from 'react-icons/ci';
import { IoAdd, IoBook } from 'react-icons/io5';
import { MdUploadFile } from 'react-icons/md';

const AdminDashboard = () => {
  const [show,setShow] = useState("hidden")
  // const {data,error} = supabase.storage.getBucket("course-image");
  return (
    <div>
      <MainLayout>
        <div className="grid grid-cols-2 grid-flow-column gap-5 md:grid-cols-2 p-5">
          <div className="grid grid-cols-1 grid-flow-row rounded-md gap-5">
            <h1 className="font-bold text-3xl">Create a Course</h1>
            <div className="flex flex-col justify-between bg-slate-100 p-5 rounded-md">
              <InputForm />
            </div>
            <div className="flex flex-col justify-between bg-slate-100 p-5 rounded-md">
              <TextAreaForm />
            </div>
            <div className="flex flex-col justify-between bg-slate-100 p-5 rounded-md">
              <ImageUpload />
            </div>
          </div>
          <div className="flex flex-col gap-5 rounded-m">
            <div className="flex justify-between">
             <h1 className="font-bold text-3xl">Create Course Modules</h1>
                <IoAdd className='w-8 h-8 cursor-pointer bg-blue-500 rounded-full text-white' onClick={()=>setShow("flex")}/>
            </div>
            <div className="flex flex-col space-y-2 bg-slate-100 p-5 rounded-md">
               <div className="flex gap-4 p-2 bg-slate-400 rounded-lg cursor-pointer" onClick={()=>setShow("flex")}>
                 <IoBook className='w-8 h-8 cursor-pointer text-white'/>
                <p className="text-lg font-semibold italic">Chapter 1</p>
               </div>
            </div>
            <ModulForm className={show}/>
          </div>
        </div>
        <div class={`fixed inset-0 z-40 min-h-screen w-full bg-black bg-opacity-50 ${show}`} onClick={()=>setShow("hidden")}/>
      </MainLayout>
    </div>
  )
}

export default AdminDashboard

export const InputForm = () => {
  return (
    <form className='flex flex-col space-y-5'>
      <div className="flex justify-between">
        <label className="font-bold text-xl font-roboto">Title</label>
        <CiEdit className='font-bold w-6 h-6' />
      </div>
      <input type="text" placeholder='Computer programming course ...' />
      <button type='' onClick={() => { }}>
        create
      </button>
    </form>
  )
}

export const TextAreaForm = () => {
  return (
    <form className='flex flex-col space-y-5'>
      <div className="flex justify-between">
        <label className="font-bold text-xl font-roboto">Description</label>
        <CiEdit className='font-bold w-6 h-6' />
      </div>
      <textarea type="text" placeholder='Computer programming course ...' />
      <button type='' onClick={() => { }}>
        Add
      </button>
    </form>
  )
}

export const ModulForm = ({className}) => {
  return (
        <form className={`fixed inset-0 z-50 flex flex-col space-y-5 bg-white w-[60vw] h-[70vh] m-auto p-5 md:p-8 rounded-lg shadow-sm ${className}`}>
          <div className="flex justify-between">
            <label className="font-bold text-xl font-roboto">Chapter Name</label>
          </div>
          <input type="text" placeholder='chapter name ...' />

          <div className="flex justify-between">
            <label className="font-bold text-xl font-roboto">Chapter Content</label>
          </div>
          <textarea type="text" placeholder='chapter contents here ...' />
          <button type='' onClick={() => { }}>
            Add
          </button>
        </form>
  )
}

export const ImageUpload = () => {
   const [file, setFile] = React.useState();
   const onChange = (e) => {
        setFile(e.target.files[0]);
    }
    const handleClick = () => {
        document.querySelector(".input-file").click();
    }
    return (
        <div className="flex flex-col space-y-4 w-full h-full ">
            <input
                hidden
                type="file"
                className="input-file"
                onChange={onChange}
            />
            {!file && <div className="w-full h-[200px] flex flex-col items-center justify-center border-dashed border-emerald-500 border-2 rounded-lg cursor-pointer" onClick={handleClick}>
                <MdUploadFile size={50} />
                <p className="font-bold text-xl text-emerald-700 hover:underline line-clamp-1">Upload course Image</p>
            </div>}
            {file && <img src={URL.createObjectURL(file)} className="object-contain w-[200px] h-[200px]" />}
            {file && <button > Upload </button>}
        </div>
    );
}
