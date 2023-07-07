export interface IMatter {
    id: string,
    name: string
}

class MatterService {
    constructor(){}

    createMatter = (matterData: IMatter) => {
        // @ts-ignore
        let matters = JSON.parse(localStorage.getItem('matters'))
        const { v4: uuidv4 } = require('uuid');

        if (!matters) {
            const newData = {
                ...matterData,
                id: uuidv4()
            }
            matters = [newData]
            localStorage.setItem('matters', JSON.stringify(matters))
            return {
                code: 200,
                matters
            }
        }

        if (matterData.id) {
            let dataNewMatters = [...matters.filter((user: any) => user.id !== matterData.id), matterData].sort((a, b) => a.id - b.id)
            localStorage.setItem('matters', JSON.stringify(dataNewMatters))
            return {
                code: 200,
                matters: dataNewMatters
            }
        } else {
            const newData = {
                ...matterData,
                id: uuidv4()
            }
            matters.push(newData)
            localStorage.setItem('matters', JSON.stringify(matters))
            return {
                code: 200,
                matters
            }
        }
    }

}

export default MatterService