import { StudentTokenPayload } from "./Student.dto";
import { InstructorTokenPayload } from "./Instructor.dto";

export type AuthPayload = StudentTokenPayload | InstructorTokenPayload