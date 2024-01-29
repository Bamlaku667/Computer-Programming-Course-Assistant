import React from 'react'
import MainLayout from '../common/MainLayout'
import { useNavigate } from 'react-router-dom';

const userList = [
  { id: 1, name: 'User-1', email: 'user1@example.com', role: 'user' },
  { id: 2, name: 'User-2', email: 'user2@example.com', role: 'admin' },
  { id: 3, name: 'User-3', email: 'user3@example.com', role: 'instructor' },
  { id: 4, name: 'User-4', email: 'user4@example.com', role: 'user' },
  { id: 5, name: 'User-5', email: 'user5@example.com', role: 'admin' },
  { id: 6, name: 'User-6', email: 'user6@example.com', role: 'instructor' },
  { id: 7, name: 'User-7', email: 'user7@example.com', role: 'user' },
  { id: 8, name: 'User-8', email: 'user8@example.com', role: 'admin' },
  { id: 9, name: 'User-9', email: 'user9@example.com', role: 'instructor' },
  { id: 10, name: 'User-10', email: 'user10@example.com', role: 'user' }
];

console.log(userList);


export const InstructorList = () => {
  const navigate = useNavigate();
  const Item = ({name}) => {
    return(<p className="font-semibold text-sm">
      {name}
    </p>)
    
  }

  const viewInstructor = (id) => {
    console.log("single user")
    navigate(`/admin/instructors/create?id=${id}`)
  }
  return (
    <MainLayout>
        <div className="gride grid-flow-cols gap-3 p-5">
          <div className="flex gap-4 items-center justify-between p-2 bg-slate-100 rounded-t-lg">
              <Item name={"Name"}/>
              <Item name={"Email"}/>
              <Item name={"Role"}/>
              <Item name={"action"}/>
          </div>
          {userList.map(user => (
            <div className="flex gap-4 items-center justify-between p-2 bg-slate-100 m-1">
            <Item name={user.name}/>
            <Item name={user.email}/>
            <Item name={user.role}/>
            <button onClick={e => viewInstructor(user.id)}>view</button>
        </div>
          ))}

        </div>
    </MainLayout>
  )
}

