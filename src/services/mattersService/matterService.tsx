export interface IMatter {
    id: number,
    name: string
}

class MatterService {
    constructor(){}

    createMatter = (matterData: IMatter) => {
        // @ts-ignore
        let matters = JSON.parse(localStorage.getItem('matters'))

        if (!matters) {
            const newData = {
                ...matterData,
                id: 1
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
                id: matters[matters?.length - 1].id + 1
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