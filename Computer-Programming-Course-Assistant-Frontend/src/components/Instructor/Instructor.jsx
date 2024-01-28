import React, { useState } from 'react'
import MainLayout from '../dashboard/common/MainLayout'
import { CiEdit } from 'react-icons/ci';
import { IoAdd, IoBook } from 'react-icons/io5';
import { MdUploadFile } from 'react-icons/md';
import { useAuth } from '../../hooks/useAuthContex';
import axios from "axios";
import { url } from '../../constants';
const InstructorDashboard = () => {
  const [show,setShow] = useState("hidden")
  const {user,dispatch} = useAuth()
  // const {data,error} = supabase.storage.getBucket("course-image");
  return (
    <div>
      <MainLayout>
        <div className="grid grid-cols-2 grid-flow-column gap-5 md:grid-cols-2 p-5">
          <div className="grid grid-cols-1 grid-flow-row rounded-md gap-5">
            <h1 className="font-bold text-3xl">Create a Course</h1>
            <div className="flex flex-col justify-between bg-slate-100 p-5 rounded-md">
              <InputForm token={user.token}/>
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

export default InstructorDashboard

export const InputForm = ({token}) => {
  const [isEditing,setEditing] = useState(false)
  const [title,setTitle] = useState("")
  
  const createTitle = async (title) => {
      try {
        if (token) {
          const response = await axios.post(`${url}/instructor/courses`,{title:title} ,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          console.log(response.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      console.log(token)
    
  }
  return (
    <form className='flex flex-col space-y-5'>
      <div className="flex justify-between">
        <label className="font-bold text-xl font-roboto">Title</label>
        {!isEditing && <CiEdit className='font-bold w-6 h-6 cursor-pointer' onClick={()=> setEditing(true)}/>}
      </div>
      {isEditing && <>
      <input type="text" placeholder='Computer programming course ...' onChange={(e)=>setTitle(e.target.value)}/>
      <div className="flex gap-4">
        <button className='bg-blue-500' type='button' onClick={createTitle}>create</button>
        <button className='bg-black' type='button' onClick={() => setEditing(false)}>cancel</button>
      </div>
      </>}
    </form>
  )
}


export const ModulForm = ({ className }) => {
  const [chapterName, setChapterName] = useState('');
  const [chapterContent, setChapterContent] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorContent, setErrorContent] = useState('');

  const handleAdd = () => {
    if (!chapterName.trim()) {
      setErrorName('Chapter Name cannot be empty');
      return;
    }

    if (!chapterContent.trim()) {
      setErrorContent('Chapter Content cannot be empty');
      return;
    }

    const minNameCharCount = 3;
    const maxNameCharCount = 50;

    if (chapterName.trim().length < minNameCharCount || chapterName.trim().length > maxNameCharCount) {
      setErrorName(`Chapter Name must be between ${minNameCharCount} and ${maxNameCharCount} characters`);
      return;
    }

    const minContentCharCount = 10;
    const maxContentCharCount = 500;

    if (chapterContent.trim().length < minContentCharCount || chapterContent.trim().length > maxContentCharCount) {
      setErrorContent(`Chapter Content must be between ${minContentCharCount} and ${maxContentCharCount} characters`);
      return;
    }

    setChapterName('');
    setChapterContent('');
    setErrorName('');
    setErrorContent('');
  };

 
  return (
    <form
      className={`fixed inset-0 z-50 flex flex-col space-y-5 bg-white w-[60vw] h-[70vh] m-auto p-5 md:p-8 rounded-lg shadow-sm ${className}`}
    >
      <div className="flex justify-between">
        <label className="font-bold text-xl font-roboto">Chapter Name</label>
      </div>
      <input
        type="text"
        placeholder="chapter name ..."
        value={chapterName}
        onChange={(e) => setChapterName(e.target.value)}
      />
      {errorName && <p className="text-red-500">{errorName}</p>}

      <div className="flex justify-between">
        <label className="font-bold text-xl font-roboto">Chapter Content</label>
      </div>
      <textarea
        type="text"
        placeholder="chapter contents here ..."
        value={chapterContent}
        onChange={(e) => setChapterContent(e.target.value)}
      />
      {errorContent && <p className="text-red-500">{errorContent}</p>}

      <button type="button" className='bg-blue-500' onClick={handleAdd}>
        Add
      </button>
    </form>
  );
};

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


export const TextAreaForm = () => {
  
  const [isEditing, setEditing] = useState(false);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleCreate = () => {
    const trimmedDescription = description.trim();
    if (!trimmedDescription) {
      setError('Description cannot be empty');
      return;
    }

    if (/^\s+$/.test(trimmedDescription)) {
      setError('Description cannot be only whitespace');
      return;
    }

    const minCharCount = 5;
    const maxCharCount = 100;

    if (trimmedDescription.length < minCharCount || trimmedDescription.length > maxCharCount) {
      setError(`Description must be between ${minCharCount} and ${maxCharCount} characters`);
      return;
    }

    if (/^\d+$/.test(trimmedDescription)) {
      setError('Description cannot be a number');
      return;
    }

    setEditing(false);
    setDescription('');
    setError('');
  };

  return (
    <form className="flex flex-col space-y-5">
      <div className="flex justify-between">
        <label className="font-bold text-xl font-roboto">course description</label>
        {!isEditing && <CiEdit className="font-bold w-6 h-6 cursor-pointer" onClick={() => setEditing(true)} />}
      </div>
      {isEditing && (
        <>
          <textarea
            type="text"
            placeholder="Computer programming course ..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex gap-4">
            <button className="bg-blue-500" type="button" onClick={handleCreate}>
              create
            </button>
            <button
              className="bg-black"
              type="button"
              onClick={() => {
                setEditing(false);
                setDescription('');
                setError('');
              }}
            >
              cancel
            </button>
          </div>
        </>
      )}
    </form>
  )}