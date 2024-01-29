import React, { useState } from 'react'
import MainLayout from '../dashboard/common/MainLayout'
import { CiEdit } from 'react-icons/ci';
import { IoAdd, IoBook } from 'react-icons/io5';
import { MdUploadFile } from 'react-icons/md';
import { useAuth } from '../../hooks/useAuthContex';
import axios from "axios";
import { url } from '../../constants';
import Navbar from '../Navbar';
import Footer from '../Footer';
const InstructorDashboard = () => {
  const [show,setShow] = useState("hidden")
  const {user,dispatch} = useAuth()
  console.log(user)
  // if(user.role !== "Instructor") return;
  return (
    <div>
      <Navbar/>
      <MainLayout>
        <div className="grid grid-cols-2 grid-flow-column gap-5 md:grid-cols-2 p-5">
          <div className="grid grid-cols-1 grid-flow-row rounded-md gap-5">
            <h1 className="font-bold text-3xl">Create a Course</h1>
            <div className="flex flex-col justify-between bg-slate-100 p-5 rounded-md">
              <InputForm token={user.token}/>
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
      <Footer/>
    </div>
  )
}

export default InstructorDashboard


export const InputForm = ({ token }) => {

  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [courseData, setCourseData] = useState({
    title: '',
    description: ''
  })

  const handleAdd = () => {
    if (!courseData.title.trim()) {
      setTitleError('Chapter Name cannot be empty');
      return false;
    }

    if (!courseData.description.trim()) {
      setDescriptionError('Chapter Content cannot be empty');
      return false;
    }

    const minNameCharCount = 3;
    const maxNameCharCount = 50;

    if (courseData.title.trim().length < minNameCharCount || courseData.title.trim().length > maxNameCharCount) {
      setTitleError(`Chapter Name must be between ${minNameCharCount} and ${maxNameCharCount} characters`);
      return false;
    }

    const minContentCharCount = 10;
    const maxContentCharCount = 500;

    if (courseData.description.trim().length < minContentCharCount || courseData.description.trim().length > maxContentCharCount) {
      setDescriptionError(`Chapter Content must be between ${minContentCharCount} and ${maxContentCharCount} characters`);
      return false;
    }

    setCourseData({title:"",description:""})
    setTitleError("")
    setDescriptionError("")
    console.log("data is valid")
    return true
  };

const createCourse = (e) => {
  e.preventDefault();
  const isValid = handleAdd();
  if(isValid){
  const course =  async () => {
    console.log(courseData)
    try {
      if (token) {
        const response = await axios.post(`${url}/instructor/courses`, courseData ,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        console.log("response form api",response.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  course()
}
  else console.log("not created")

}

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setCourseData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

 
  return (
    <form
      className={`flex flex-col space-y-5`}
    >
      <div className="flex justify-between">
        <label className="font-bold text-xl font-roboto">Title</label>
      </div>
      <input
        type="text"
        placeholder="chapter name ..."
        name='title'
        value={courseData.title}
        onChange={handleInputChange}
      />
      {titleError && <p className="text-red-500">{titleError}</p>}

      <div className="flex justify-between">
        <label className="font-bold text-xl font-roboto">Description</label>
      </div>
      <textarea
        type="text"
        name='description'
        placeholder="chapter contents here ..."
        value={courseData.description}
        onChange={handleInputChange}
      />
      {descriptionError && <p className="text-red-500">{descriptionError}</p>}

      <button className='bg-blue-500' onClick={createCourse}>
        Add
      </button>
    </form>
  );
};

export const ModulForm = ({ className }) => {
  const [chapterName, setChapterName] = useState('');
  const [chapterContent, setChapterContent] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorContent, setErrorContent] = useState('');

  const handleAdd = () => {
    console.log(chapterContent,chapterName)
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
      className={`fixed inset-0 z-50 flex flex-col space-y-5 bg-white w-[700px] h-[400px] m-auto p-5 md:p-8 rounded-lg shadow-sm ${className}`}
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
            {file && <button type='button' className='bg-blue-500'> Upload </button>}
        </div>
    );
}


export const Form = () => {
  
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    password: '',
    role: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
    <form className="grid grid-cols-2 space-y-5">
          <div className="flex justify-between">
            <label className="font-bold text-xl font-roboto">Name</label>
          </div>
          <input
            type="text"
            placeholder="jhon doe"
            value={userData.firstName}
            onChange={(e) => setUserData(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-between">
            <label className="font-bold text-xl font-roboto">Name</label>
          </div>
          <input
            type="text"
            placeholder="jhon doe"
            value={userData.firstName}
            onChange={(e) => setUserData(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-between">
            <label className="font-bold text-xl font-roboto">Name</label>
          </div>
          <input
            type="text"
            placeholder="jhon doe"
            value={userData.firstName}
            onChange={(e) => setUserData(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-between">
            <label className="font-bold text-xl font-roboto">Name</label>
          </div>
          <input
            type="text"
            placeholder="jhon doe"
            value={userData.firstName}
            onChange={(e) => setUserData(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-between">
            <label className="font-bold text-xl font-roboto">Name</label>
          </div>
          <input
            type="text"
            placeholder="jhon doe"
            value={userData.firstName}
            onChange={(e) => setUserData(e.target.value)}
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
    </form>
  )}


