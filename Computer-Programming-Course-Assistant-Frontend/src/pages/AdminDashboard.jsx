import React from 'react'
import MainLayout from '../components/dashboard/common/MainLayout'
import { Form, InputForm } from '../components/Instructor/Instructor'
import { useAuth } from '../hooks/useAuthContex'
import { useState } from 'react'
import { UserRole } from '../components/dashboard/common/sidebarRoutes'
import { useLocation } from 'react-router-dom';

const AdminDashboard = () => {
    const { user } = useAuth()
    return (
        <MainLayout>
            <AdminForm token={user.token}/>
        </MainLayout>
    )
}

export default AdminDashboard

const AdminForm = ({ token }) => {

    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const paramValue = searchParams.get('id');
    console.log(paramValue)

    const [error, setError] = useState({
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        password: '',
        role: ''
    })
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        password: '',
        role: UserRole.student
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validate = () => {
        if (!userData.firstName.trim()) {
            setError(error => ({...error,[error.firstName]:'First name is required'}));
            console.log(error.firstName)
            return false;
          }
        
          // Validate lastName
          if (!userData.lastName.trim()) {
            setError(error => ({...error,[error.lastName]:'Last name is required'}));
            return false;
          }
        
          // Validate address
          if (!userData.address.trim()) {
            setError(error => ({...error,[error.address]:'address  is required'}));
            return false;
          }
        
          // Validate phone
          if (!userData.phone.trim()) {
            setError(error => ({...error,[error.phone]:'phone is is required'}));
            return false;
          } else if (!/^\d{10}$/.test(userData.phone.trim())) {
            setError(error => ({...error,[error.phone]:'Phone number must be 10 digits'}));
            return false;
          }
        
          // Validate password
          if (!userData.password.trim()) {
            setError(error => ({...error,[error.password]:'password is required'}));;
            return false;
          } else if (userData.password.trim().length < 6) {
            setError(error => ({...error,[error.password]:'Password must be at least 6 characters'}));
            return false;
          }

        
          return true;
        };
    
    const createInstructor = (e) => {
        const isValid = validate()
        console.log("User created",isValid)
    }

    return (
        <div className="grid grid-cols-2 grid-flow-column gap-1 md:grid-cols-2 p-5 bg-slate-100">
            <div className="col-span-2 font-bold p-3 text-2xl">
                Create Instructor
            </div>
            <div className="grid grid-cols-1 grid-flow-row rounded-md gap-2">
                <div className="flex flex-col justify-between  p-5 rounded-md gap-3">
                    <FormLabel name={"FirstName"}/>
                    <input
                        type="text"
                        name='firstName'
                        placeholder="jhon doe"
                        value={userData.firstName}
                        onChange={handleInputChange}
                    />
                    {error.firstName && <p className="text-red-500">{error.firstName}</p>}
                </div>
            </div>
            <div className="grid grid-cols-1 grid-flow-row rounded-md gap-5">
                <div className="flex flex-col justify-between  p-5 rounded-md gap-3">
                    <FormLabel name={"Last Name"}/>
                    <input
                        type="text"
                        placeholder="jhone"
                        name='lastName'
                        value={userData.lastName}
                        onChange={handleInputChange}
                    />
                    {error.lastName && <p className="text-red-500">{error.lastName}</p>}
                </div>
            </div>
            <div className="grid grid-cols-1 grid-flow-row rounded-md gap-5">
                <div className="flex flex-col justify-between  p-5 rounded-md gap-3">
                    <FormLabel name={"Address"}/>
                    <input
                        type="text"
                        placeholder="Addis Ababa"
                        name='address'
                        value={userData.address}
                        onChange={handleInputChange}
                    />
                    {error.address && <p className="text-red-500">{error.address}</p>}
                </div>
            </div>
            <div className="grid grid-cols-1 grid-flow-row rounded-md gap-5">
                <div className="flex flex-col justify-between  p-5 rounded-md gap-3">
                <   FormLabel name={"Phone"}/>
                    <input
                        type="text"
                        placeholder="+2519 **** ***"
                        name='phone'
                        value={userData.phone}
                        onChange={handleInputChange}
                    />
                    {error.phone && <p className="text-red-500">{error.phone}</p>}
                </div>
            </div>
            <div className="grid grid-cols-1 grid-flow-row rounded-md gap-2">
                <div className="flex flex-col justify-between  p-5 rounded-md gap-3">
                    <FormLabel name={"Password"}/>
                    <input
                        type="text"
                        name='password'
                        placeholder="jhon doe"
                        value={userData.password}
                        onChange={handleInputChange}
                    />
                    {error.password && <p className="text-red-500">{error.password}</p>}
                </div>
            </div>
            <div className="grid grid-cols-1 grid-flow-row rounded-md gap-2">
                <div className="flex flex-col justify-between p-5 rounded-md gap-3">
                    <FormLabel name={"Role"}/>
                    <select onChange={handleInputChange}>
                        <option value={UserRole.admin} class="text-black">{UserRole.admin}</option>
                        <option value={UserRole.instructor} class="text-black">{UserRole.instructor}</option>
                        <option value={UserRole.student} selected class="text-black">{UserRole.student}</option>
                    </select>
                </div>
            </div>
            
            <div className="grid grid-cols-1 grid-flow-row rounded-md gap-2">
                <div className="flex flex-col justify-between p-5 rounded-md gap-3">
                    <button  className='' onClick={(e)=>createInstructor(e)}>Create</button>
                </div>
            </div>

        </div>
    )

}

const FormLabel = ({name}) => {
    return (
        <div className="flex justify-between">
            <label className="text-md font-roboto">{name}</label>
        </div>
    )
}