import React, { useState } from 'react'
import '../qualificationScreen.scss'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import { Button, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import AcademicPeriodService, { IAcademicPeriod } from '../../../../services/academicPeriodService/academicPeriodService';
import { IMatter } from '../../../../services/mattersService/matterService';
import { fireSimpleMessage } from '../../../../utils/commons';
import { useDispatch } from 'react-redux';
import { updatePeriodsAction } from '../../../../reducers/periodsReducer/actions';

interface IQualificationScreenProps {
    periods: IAcademicPeriod[]
    getPeriodData: (id: string) => void
}

const QualificationScreenLayout = (props: IQualificationScreenProps) => {

    const dispatch = useDispatch()

    const [selectedPeriod, setSelectedPeriod] = useState<any | undefined>()
    const [matterSelected, setMatterSelected] = useState<any | undefined>()

    const navigate = useNavigate()
    const academicPeriodService = new AcademicPeriodService()

    const setPeriod = (id: string) => {
        const newData = props.getPeriodData(id)
        setSelectedPeriod(newData)
        if(matterSelected) setMatterSelected(undefined)
    }

    const setMatter = (id: string) => {
        let matterIndex: number = 0
        const matter = selectedPeriod.matters.find((matter: any, index: number) => {
            if (matter.id === id) {
                matterIndex = index
                return matter
            } else {
                return undefined
            }
        })
        setMatterSelected({ ...matter, index: matterIndex })
    }

    const handleChangeQualification = (event: any, index: number) => {
        const { value } = event.target
        if (value > 5 || value < 0) return
        let newData = { ...selectedPeriod }
        selectedPeriod.matters[matterSelected.index].students[index].qualification = value
        setSelectedPeriod(newData)
    }

    const handleSave = () => {
        let newData = {
            ...selectedPeriod,
            matters: selectedPeriod.matters.map((matter: any) => {
                return {
                    matter: matter.id,
                    teacher: matter.teacher,
                    students: matter.students.map((student: any) => {
                        return {
                            student: student.id,
                            qualification: student.qualification
                        }
                    })
                }
            })
        }
        const response = academicPeriodService.createOrEditPeriod(newData)
        if(response.code === 200) {
            fireSimpleMessage('success', 'Guardado con exito')
            dispatch(updatePeriodsAction(response.periods))
        }
    }

    return (
        <div className="qualification-screen-layout">
            <div className="header-action">
                <span onClick={() => navigate('/')}>
                    <ArrowBackIosNewIcon />
                    <Typography variant='h5'>Herramienta de Calificación</Typography>
                </span>
                <Button variant="contained" disabled={matterSelected ? false : true} onClick={handleSave}>Guardar calificaciónes</Button>
            </div>
            <div className="filters">
                <div className='input-container'>
                    <label>Periodos académicos</label>
                    <TextField
                        select
                        sx={{ width: '216px' }}
                        onChange={(e) => setPeriod(e.target.value)}
                    >
                        {props.periods.map(period => (
                            <MenuItem
                                value={period.id}
                            >
                                {new Date(period.year).getFullYear()}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                {selectedPeriod &&
                    <div className='input-container'>
                        <label>Materias</label>
                        <TextField
                            select
                            sx={{ width: '216px' }}
                            onChange={(e) => setMatter(e.target.value)}
                            value={matterSelected?.id || ''}
                        >
                            {selectedPeriod.matters.map((matter: any) => (
                                <MenuItem
                                    value={matter.id}
                                >
                                    {matter.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                }
            </div>
            <div className="students-list-container">
                {matterSelected &&
                    <TableContainer sx={{ maxWidth: 1200, margin: 'auto' }} component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Código</TableCell>
                                    <TableCell align='right'>Calificación</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {matterSelected.students?.map((student: any, index: number) => (
                                    <TableRow>
                                        <TableCell>{student.name}</TableCell>
                                        <TableCell>{student.code}</TableCell>
                                        <TableCell align='right'>
                                            <TextField
                                                size='small'
                                                type='number'
                                                onChange={(e) => handleChangeQualification(e, index)}
                                                value={selectedPeriod.matters[matterSelected.index].students[index].qualification || ''}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </div>
        </div>
    )
}

export default QualificationScreenLayout