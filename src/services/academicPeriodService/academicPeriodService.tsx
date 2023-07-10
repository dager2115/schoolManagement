import { IMatter } from "../mattersService/matterService"
import { IUser } from "../userService/userService"

export interface IAcademicPeriod {
    id: string
    year: Date
    matters: {
        matter: string,
        teacher: string,
        students: {
            student: string
            qualification: number | null
        }[]
    }[]
}

class AcademicPeriodService {
    constructor() { }

    createOrEditPeriod = (periodData: IAcademicPeriod) => {
        const { v4: uuidv4 } = require('uuid');

        //@ts-ignore
        let periods = JSON.parse(localStorage.getItem('periods'))
        if (!periods) {
            periods = [{ ...periodData, id: uuidv4() }]
        } else if (!periodData.id) {
            periods.push({ ...periodData, id: uuidv4() })
        } else {
            periods = [...periods.filter((period: IAcademicPeriod) => period.id !== periodData.id), periodData]
        }

        localStorage.setItem('periods', JSON.stringify(periods))
        return {
            code: 200,
            periods
        }

    }

    getAcademicPeriods = () => {
        //@ts-ignore
        let periods = JSON.parse(localStorage.getItem('periods'))
        return {
            code: 200,
            periods: periods || []
        }
    }

    getPediodData = (id: string) => {
        //@ts-ignore
        let periods = JSON.parse(localStorage.getItem('periods'))
        //@ts-ignore
        let students = JSON.parse(localStorage.getItem('students'))
        // @ts-ignore
        let matters = JSON.parse(localStorage.getItem('matters'))
        const period: IAcademicPeriod = periods.find((period: IAcademicPeriod) => period.id === id)

        const data = {
            ...period,
            matters: period.matters.map(matter => {
                return {
                    id: matter.matter,
                    name: matters.find((matterDate: IMatter) => matterDate.id === matter.matter)?.name,
                    students: matter.students.map(student => {
                        const studentData = students.find((studentData: IMatter) => studentData.id === student.student)
                        return {
                            id: student.student,
                            name: `${studentData.name} ${studentData.lastName}`,
                            qualification: student.qualification,
                            code: studentData.code
                        }
                    })
                }
            })
        }

        return {
            code: 200,
            data
        }
    }
}

export default AcademicPeriodService