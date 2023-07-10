import React, { useState, useEffect } from 'react'
import { IAcademicPeriod } from '../../../../services/academicPeriodService/academicPeriodService'
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../../../commons/dataTable';
import EditIcon from '@mui/icons-material/Edit';

import '../styles/academicPeriodsScreen.scss'

interface IAcademicPeriodsScreenLayoutProps {
    academicPeriods: IAcademicPeriod[]
    addNewPeriod: () => void
    editPeriodData: (data: IAcademicPeriod) => void
}

const AcademicPeriodsScreenLayout = (props: IAcademicPeriodsScreenLayoutProps) => {

    const [academicPeriodsList, setAcademicPeriodList] = useState<any[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        setAcademicPeriodList(props.academicPeriods.map(period => {

            const students: string[] = []
            period.matters.forEach(matter => {
                matter.students.forEach(student => {
                    if (!students.includes(student.student)) {
                        return students.push(student.student)
                    }
                })
            })

            return {
                ...period,
                numberMatters: period.matters.length,
                numberStudents: students.length,
                yearFormat: new Date(period.year).getFullYear()
            }
        }))
    }, [props.academicPeriods])

    return (
        <div className='academic-periods-screen-layout'>
            <div className="header-action">
                <span onClick={() => navigate('/')}>
                    <ArrowBackIosNewIcon />
                    <p>atras</p>
                </span>
                <Button startIcon={<AddIcon />} variant="outlined" onClick={props.addNewPeriod}>Agregar periodo</Button>
            </div>
            <div className="data-container">
                <DataTable
                    data={academicPeriodsList}
                    headerKeys={['Año', 'materias', 'estudiantes']}
                    keys={['yearFormat', 'numberMatters', 'numberStudents']}
                    title="Listado de periodos académicos"
                    actions={(data: any) => (
                        <div style={{ cursor: 'pointer' }} onClick={() => props.editPeriodData(data)}>
                            <EditIcon />
                        </div>
                    )}
                />
            </div>
        </div>
    )
}

export default AcademicPeriodsScreenLayout