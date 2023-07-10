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
}

export default AcademicPeriodService