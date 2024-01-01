import { CourseModule } from "../models/Course";

export interface AddCourseInput {
    title: string, 
    description: string, 
    modules: CourseModule[]
}

