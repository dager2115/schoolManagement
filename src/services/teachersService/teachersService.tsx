export interface ITeacher {
    id: number,
    name: string
    lastName: string
    age: number
    address: string
    phone: number
}

class TeachersService {

    constructor() { }
    createTeacher = (teacherData: ITeacher) => {
        // @ts-ignore
        const teachers = JSON.parse(localStorage.getItem('teachers'))

        if (teacherData.id) {
            let dataNewTeachers = [...teachers.filter((teacher: any) => teacher.id !== teacherData.id), teacherData].sort((a, b) => a.id - b.id)
            localStorage.setItem('teachers', JSON.stringify(dataNewTeachers))
            return {
                code: 200,
                teachers: dataNewTeachers
            }
        } else {
            const newData = {
                ...teacherData,
                id: teachers[teachers.length - 1].id + 1
            }
            teachers.push(newData)
            localStorage.setItem('teachers', JSON.stringify(teachers))
            return {
                code: 200,
                teachers
            }
        }
    }
}

export default TeachersService