import React, { Component } from 'react'
import AcademicPeriodService, { IAcademicPeriod } from '../../../../services/academicPeriodService/academicPeriodService'
import { AppComponent } from '../../../layouts/AppComponent'
import AcademicPeriodsScreenLayout from '..'
import CreateOrEditPeriodLayout from '../components/createOrEditPeriodLayout'
import MatterService, { IMatter } from '../../../../services/mattersService/matterService'
import UserService, { IUser } from '../../../../services/userService/userService'
import store from '../../../../store/redux-storage'
import { updateStudentsAction } from '../../../../reducers/studentReducer/actions'
import { connect } from 'react-redux'
import { updateTeachersAction } from '../../../../reducers/teacherReducer/actions'
import { updateMattersAction } from '../../../../reducers/mattersReducer/actions'
import { updatePeriodsAction } from '../../../../reducers/periodsReducer/actions'

interface IAcademiPeriodScreen {
    academicPeriods: IAcademicPeriod[]
    view: 'list' | 'editor'
    editPeriodData?: any | null
    matters: IMatter[]
    teachers: IUser[]
    students: IUser[]
}

class AcademiPeriodScreenContainer extends Component<any, IAcademiPeriodScreen> {

    private matterService = new MatterService()
    private userService = new UserService()
    private academicPeriodService = new AcademicPeriodService()

    constructor(props: any) {
        super(props)

        this.state = {
            academicPeriods: [],
            view: 'list',
            editPeriodData: null,
            matters: [],
            students: [],
            teachers: []
        }
    }

    componentDidMount(): void {
        this.getMatters()
        this.getStudents()
        this.getTeachers()
        this.getPeriods()
    }

    changeView = (view: 'list' | 'editor') => {
        this.setState({ view: view })
    }

    addNewPeriod = () => {
        this.setState({
            view: 'editor',
            editPeriodData: null
        })
    }

    getMatters = () => {
        const matters = store.getState().mattersReducers.matters
        if (!matters?.length) {

            const response = this.matterService.getMatters()
            if (response.code === 200) {
                this.setState({ matters: response.matters })
                store.dispatch(updateMattersAction(response.matters))
            }
        } else {
            this.setState({ matters })
        }
    }

    getTeachers = () => {
        const teachers = store.getState().teacherReducers.teachers
        if (!teachers?.length) {
            const response = this.userService.getUsers('teachers')
            if (response.code === 200) {
                this.setState({ teachers: response.users })
                store.dispatch(updateTeachersAction(response.users))
            }
        } else {
            this.setState({ teachers })
        }
    }

    getStudents = () => {
        const students = store.getState().studentsReducer.students
        if (!students?.length) {
            const response = this.userService.getUsers('students')
            if (response.code === 200) {
                this.setState({ students: response.users })
                store.dispatch(updateStudentsAction(response.users))
            }
        } else {
            this.setState({ students })
        }
    }

    getPeriods = () => {
        const periods = store.getState().periodsReducer.periods
        if (!periods.length) {
            const response = this.academicPeriodService.getAcademicPeriods()
            if (response.code === 200) {
                this.setState({ academicPeriods: response.periods })
                store.dispatch(updatePeriodsAction(response.periods))
            }
        } else {
            this.setState({ academicPeriods: periods })
        }
    }

    savePeriodData = (data: IAcademicPeriod) => {
        const response = this.academicPeriodService.createOrEditPeriod(data)
        if (response.code === 200) {
            this.setState({ academicPeriods: response.periods, view: 'list' })
            store.dispatch(updateStudentsAction(response.periods))
        }
    }

    editPeriodData = (period: IAcademicPeriod) => {
        const editData = {
            ...period,
            matters: period.matters.map(matter => {
                return {
                    ...this.state.matters.find(matterData => matterData.id ===  matter.matter),
                    teacher: matter.teacher,
                    students: matter.students.map(student => {
                        return {
                            ...this.state.students.find(studentData => studentData.id === student.student)
                        }
                    })
                }
            })
        }
        this.setState({editPeriodData: editData, view: 'editor'})
    }

    handleCancel = () => {
        this.setState({
            editPeriodData: null,
            view: 'list',
        })
    }

    render() {
        return (
            <AppComponent>
                {this.state.view === 'list' ?
                    <AcademicPeriodsScreenLayout
                        academicPeriods={this.state.academicPeriods}
                        addNewPeriod={this.addNewPeriod}
                        editPeriodData={this.editPeriodData}
                    />
                    : null
                }
                {this.state.view === 'editor' ?
                    <CreateOrEditPeriodLayout
                        mattersList={this.state.matters}
                        studentsList={this.state.students}
                        teachersList={this.state.teachers}
                        savePeriodData={this.savePeriodData}
                        editPeriodData={this.state.editPeriodData}
                        handleCancel={this.handleCancel}
                    />
                    : null
                }
            </AppComponent>
        )
    }

}

export default connect()(AcademiPeriodScreenContainer)