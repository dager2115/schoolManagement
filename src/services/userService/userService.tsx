export interface IUser {
    id: number,
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

        if (!users) {
            const newData = {
                ...userData,
                id: 1
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
                id: users[users?.length - 1].id + 1
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