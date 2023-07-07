export interface IUser {
    id: string,
    name: string
    lastName: string
    age: number
    address: string
    phone: number
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
                id: uuidv4()
            }
            users = [newData]
            localStorage.setItem(role, JSON.stringify(users))
            return {
                code: 200,
                users
            }
        }

        if (userData.id) {
            let dataNewUsers = [...users.filter((user: any) => user.id !== userData.id), userData].sort((a, b) => a.id - b.id)
            localStorage.setItem(role, JSON.stringify(dataNewUsers))
            return {
                code: 200,
                users: dataNewUsers
            }
        } else {
            const newData = {
                ...userData,
                id: uuidv4()
            }
            users.push(newData)
            localStorage.setItem(role, JSON.stringify(users))
            return {
                code: 200,
                users
            }
        }
    }
}

export default UserService