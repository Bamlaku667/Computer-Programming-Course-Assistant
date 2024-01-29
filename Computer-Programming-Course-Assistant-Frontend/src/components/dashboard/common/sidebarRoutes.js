import { MdOutlineDashboard, MdLibraryBooks } from "react-icons/md";
import { IoThermometerOutline } from "react-icons/io5";

export const sideBarRoutes = (user) => {
    const name = user
    const SidebarItems = [
        
        {
            id: 0,
            name: "Profile",
            link: "/profile",
            icon: MdOutlineDashboard,
            show: user!== UserRole.admin ? true:false
        },
        {
            id: 1, name: `${name}-Dashboard`,
            link: `/${name}-dashboard`,
            icon: MdOutlineDashboard,
            show: true
        },
        {
            id: 2, name:"MyCourses",
            link: "/myCourses", 
            icon:MdLibraryBooks,
            show: true
        },
        {
            id: 3, name:"Create course",
            link: "/instructor", 
            icon:IoThermometerOutline,
            show: name!== UserRole.instructor ? false:true
        },
        {
            id: 5, name:"create Instructor",
            link: "/admin-instructors/create", 
            icon:IoThermometerOutline,
            // show: name!== UserRole.instructor ? false:true
            show: true
        },
        {
            id: 4, name:"Admin Dashboard",
            link: "/admin/instructors", 
            icon:IoThermometerOutline,
            // show: name!== UserRole.instructor ? false:true
            show: true
        },
        


        
       
    ];

    return SidebarItems.filter(item => item.show === true)
}

export const UserRole = {
    student: "Student",
    instructor: "Instructor",
    admin: "Admin"
}