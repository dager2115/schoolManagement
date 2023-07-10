import React, { Component } from "react";
import { AppComponent } from "../../../layouts/AppComponent";
import QualificationScreenLayout from "..";
import store from "../../../../store/redux-storage";
import AcademicPeriodService, { IAcademicPeriod } from "../../../../services/academicPeriodService/academicPeriodService";
import { updatePeriodsAction } from "../../../../reducers/periodsReducer/actions";
import MatterService, { IMatter } from "../../../../services/mattersService/matterService";
import { updateMattersAction } from "../../../../reducers/mattersReducer/actions";

interface IQualificationScreenState {
    periods: IAcademicPeriod[]
}

class QualificationScreenContainer extends Component<any, IQualificationScreenState> {

    private academicPeriodService = new AcademicPeriodService()
    private matterService = new MatterService()

    constructor(props: any) {
        super(props)

        this.state = {
            periods: [],
        }
    }

    componentDidMount() {
        this.getPeriods()
    }

    getPeriods = () => {
        const periods = store.getState().periodsReducer.periods
        if (!periods.length) {
            const response = this.academicPeriodService.getAcademicPeriods()
            if (response.code === 200) {
                this.setState({ periods: response.periods })
                store.dispatch(updatePeriodsAction(response.periods))
            }
        } else {
            this.setState({ periods })
        }
    }

    getPeriodData =(id: string) => {
        const response = this.academicPeriodService.getPediodData(id)
        if(response.code === 200) {
            return response.data
        }
    }


    render() {
        return (
            <AppComponent>
                <QualificationScreenLayout
                    periods={this.state.periods}
                    getPeriodData={this.getPeriodData}
                />
            </AppComponent>
        )
    }
}

export default QualificationScreenContainer