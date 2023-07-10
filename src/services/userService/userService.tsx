import { generarCodeId } from "../../utils/commons"
import { IAcademicPeriod } from "../academicPeriodService/academicPeriodService"

export interface IUser {
    id: string,
    name: string
    lastName: string
    age: number
    address: string
    phone: number
    code: number
}

class UserService {

    constructor() { }
    createUser = (userData: IUser, role: string) => {
        // @ts-ignore
        let users = JSON.parse(localStorage.getItem(role))
        const { v4: uuidv4 } = require('uuid');

        if (!users) {
            const newData = {
                ...userData,
                id: uuidv4(),
                code: generarCodeId(0, 99999)
            }
            users = [newData]
            localStorage.setItem(role, JSON.stringify(users))
            return {
                code: 200,
                users
            }
        }

        if (userData.id) {
            let dataNewUsers = [...users.filter((user: any) => user.id !== userData.id), userData]
            localStorage.setItem(role, JSON.stringify(dataNewUsers))
            return {
                code: 200,
                users: dataNewUsers
            }
        } else {
            const newData = {
                ...userData,
                id: uuidv4(),
                code: generarCodeId(0, 99999)
            }
            users.push(newData)
            localStorage.setItem(role, JSON.stringify(users))
            return {
                code: 200,
                users
            }
        }
    }

    getUsers = (role: string) => {
        // @ts-ignore
        let users = JSON.parse(localStorage.getItem(role))

        return {
            code: 200,
            users: users || []
        }
    }

    deleteUser = (id: string, role: string) => {
        //@ts-ignore
        const periods = JSON.parse(localStorage.getItem('periods'))
        let registered: boolean = false
        periods.forEach((period: IAcademicPeriod) => {
            period.matters.forEach(matter => {
                const inMatter = matter.students.find(student => student.student === id)
                if(inMatter){
                    registered = true
                }
            })
        });
        // @ts-ignore
        let users = JSON.parse(localStorage.getItem(role))
        if (registered) {
            return {
                code: 403
            }
        }
        users = users.filter((user: IUser) => user.id !== id)
        localStorage.setItem(role, JSON.stringify(users))
        return {
            code: 200,
            users: users
        }
    }
}

export default UserService