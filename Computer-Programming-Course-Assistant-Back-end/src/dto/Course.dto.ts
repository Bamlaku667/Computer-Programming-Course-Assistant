import { CourseModule } from "../models/Course";

export interface AddCourseInput {
    title: string, 
    description: string, 
    modules: CourseModule[]
}


export interface CourseUpdateInputs {
    title: string, 
    description: string, 
    modules: CourseModule[];
}
