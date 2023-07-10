import React, { useState, useEffect } from 'react'
import { IAcademicPeriod } from '../../../../services/academicPeriodService/academicPeriodService'
import { Button, TextField, MenuItem, Collapse, Modal, Box, FormControlLabel, Checkbox } from '@mui/material';
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import '../styles/createOrEditPeriod.scss'
import { IMatter } from '../../../../services/mattersService/matterService';
import { IUser } from '../../../../services/userService/userService';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { DataTable } from '../../../commons/dataTable';
import CloseIcon from '@mui/icons-material/Close';
import { fireSimpleMessage } from '../../../../utils/commons';
import DeleteIcon from '@mui/icons-material/Delete';

interface IEditorProps {
    mattersList: IMatter[]
    teachersList: IUser[]
    studentsList: IUser[]
    editPeriodData?: any | null
    savePeriodData: (data: IAcademicPeriod) => void
    handleCancel: () => void
}

const CreateOrEditPeriodLayout = (props: IEditorProps) => {

    const [periodData, setPeriodData] = useState<any>({})
    const [selectedMatter, setSelectedMatter] = useState<string | undefined>()
    const [matterToAdd, setMatterToAdd] = useState<string | undefined>()
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [checkedStudents, setCheckedStudents] = useState<string[]>([])

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90vw',
        maxWidth: 700,
        bgcolor: '#FFFFFF',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        border: 'none'
    };

    useEffect(() => {
        if (props.editPeriodData) {
            setPeriodData({ ...props.editPeriodData, year: new Date(props.editPeriodData.year) })
        }
    }, [props.editPeriodData])

    const addMatter = () => {
        let newData = { ...periodData }
        const matter = props.mattersList.find(matter => matter.id === matterToAdd)
        if (!newData.matters) {
            newData['matters'] = [matter]
        } else {
            newData.matters.push(matter)
        }
        setPeriodData(newData)
        setMatterToAdd(undefined)
    }

    const openOrCloseMatter = (matterId: string) => {
        if (!selectedMatter || selectedMatter !== matterId) {
            setSelectedMatter(matterId)
        } else {
            setSelectedMatter(undefined)
        }
    }

    const addTeacher = (matterIndex: number, teacherId: string) => {
        let newData: IAcademicPeriod = { ...periodData }
        newData.matters[matterIndex]['teacher'] = teacherId
        setPeriodData(newData)
    }

    const checkStudent = (studentId: string) => {
        if (checkedStudents.includes(studentId)) {
            setCheckedStudents(checkedStudents.filter(student => student !== studentId))
        } else {
            setCheckedStudents([...checkedStudents, studentId])
        }
    }

    const handleCLose = () => {
        setCheckedStudents([])
        setOpenModal(false)
    }

    const handleOpenStudentsModal = () => {
        setCheckedStudents([])
        setOpenModal(true)
    }

    const handleAddStudents = () => {
        let newData = { ...periodData }

        const matterIndex = newData.matters.findIndex((matter: any) => matter.id === selectedMatter)
        const newStudents = checkedStudents.map(id => {
            return props.studentsList.find(student => student.id === id)
        })

        if (newData.matters[matterIndex].students) {
            newData.matters[matterIndex].students = [...newData.matters[matterIndex].students, ...newStudents]
        } else {
            newData.matters[matterIndex].students = newStudents
        }

        setPeriodData(newData)
        handleCLose()
    }

    const filterSudents = (student: IUser) => {
        const matter = periodData.matters?.find((matter: any) => matter.id === selectedMatter)
        const validate = matter?.students?.find((studentIn: any) => student.id === studentIn.id)
        if (validate) {
            return false
        } else {
            return true
        }
    }

    const checkAll = () => {
        if (checkedStudents.length === props.studentsList.length) {
            setCheckedStudents([])
        } else {
            setCheckedStudents(props.studentsList.map(student => student.id))
        }
    }

    const handleSavePeriod = () => {
        if (!periodData.year) {
            return fireSimpleMessage('error', 'No se pudo crear el periodo', 'No puedes crear un periodo sin un año')
        }
        if (!periodData.matters?.length) {
            return fireSimpleMessage('error', 'No se pudo crear el periodo', 'debes agregar materias al periodo')
        }

        let validateTeachers: boolean = true
        let validateStudents: boolean = true
        periodData.matters?.forEach((matter: any) => {
            if (!matter.teacher) {
                validateTeachers = false
            }
            if (!matter.students?.length) {
                validateStudents = false
            }
        })
        if (!validateTeachers) {
            return fireSimpleMessage('error', 'No se pudo crear el periodo', 'tienes materias sin profesor asignado')
        }
        if (!validateStudents) {
            return fireSimpleMessage('error', 'No se pudo crear el periodo', 'tienes materias sin estudiantes asignados')
        }
        let newData
        if (props.editPeriodData) {
            newData = {
                id: periodData.id,
                year: periodData.year,
                matters: periodData.matters.map((matter: any) => {
                    const newItem = {
                        matter: matter.id,
                        teacher: matter.teacher,
                        students: matter.students.map((student: any) => ({ student: student.id, qualification: student.qualification || null }))
                    }
                    return newItem
                })
            }
        } else {
            newData = {
                ...periodData,
                matters: periodData.matters.map((matter: any) => {
                    const newItem = {
                        matter: matter.id,
                        teacher: matter.teacher,
                        students: matter.students.map((student: any) => ({ student: student.id, qualification: student.qualification || null }))
                    }
                    return newItem
                })
            }
        }
        props.savePeriodData(newData)
    }

    const deleteStudent = (matterIndex: number, id: string) => {
        let newData: any = { ...periodData }
        newData.matters[matterIndex].students = newData.matters[matterIndex].students.filter((student: any) => student.id !== id)
        setPeriodData(newData)
    }

    return (
        <div className='academic-period-editor-layout'>
            <div className='container'>
                <div className="header-editor">
                    <h1>{props.editPeriodData ? 'Editar' : 'Crear'} Periodo</h1>
                    <div className="actions">
                        <Button variant='contained' sx={{ marginRight: '5px' }} onClick={props.handleCancel}>cancelar</Button>
                        <Button variant='outlined' onClick={handleSavePeriod}>guardar</Button>
                    </div>
                </div>
                <div className="first-info">
                    <div className='input-container'>
                        <label>Año</label>
                        <DatePicker
                            onChange={(date) => setPeriodData({ ...periodData, year: date })}
                            dateFormat='yyyy'
                            showYearPicker
                            className='year-picker'
                            selected={periodData.year}
                            placeholderText='selecciona un año'
                        />
                    </div>
                    <div className='input-container'>
                        <label>Materias</label>
                        <TextField
                            select
                            sx={{ width: '216px' }}
                            onChange={(e) => setMatterToAdd(e.target.value)}
                            value={matterToAdd}
                        >
                            {props.mattersList.filter(matter => !periodData?.matters?.find((data: IMatter) => data.id === matter.id)).map(matter => (
                                <MenuItem
                                    value={matter.id}
                                >
                                    {matter.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <Button
                        variant='contained'
                        size='large'
                        disabled={matterToAdd ? false : true}
                        onClick={addMatter}
                    >
                        agregar materia
                    </Button>
                </div>
                <div className='matters-config-container'>
                    {periodData.matters?.map((matter: any, matterIndex: number) => (
                        <div className="matter-collapse">
                            <div className='collapse-trigger' onClick={() => openOrCloseMatter(matter.id)}>
                                <p>{matter.name}</p>
                                {matter.id === selectedMatter ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </div>
                            <Collapse in={selectedMatter === matter.id}>
                                <div className='matter-content'>
                                    <div className="header-info">
                                        <div className='input-container'>
                                            <label>Profesor</label>
                                            <TextField
                                                select
                                                sx={{ width: '216px' }}
                                                onChange={(e) => addTeacher(matterIndex, e.target.value)}
                                                value={matter.teacher}
                                            >
                                                {props.teachersList.map(teacher => (
                                                    <MenuItem
                                                        value={teacher.id}
                                                    >
                                                        {teacher.name} {teacher.lastName}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                        <Button onClick={handleOpenStudentsModal} disabled={matter.students?.length === props.studentsList.length ? true : false} variant='contained' size='large'>agregar estudiantes</Button>
                                    </div>
                                    <div className="students-table">
                                        <DataTable
                                            data={matter.students}
                                            headerKeys={['Nombre', 'Apellido']}
                                            keys={['name', 'lastName']}
                                            title='Estudiantes'
                                            actions={(data: any) => (
                                                <div style={{ cursor: 'pointer' }} onClick={() => deleteStudent(matterIndex, data.id)}>
                                                    <DeleteIcon />
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>
                            </Collapse>
                        </div>
                    ))}
                </div>
                <Modal open={openModal} className='students-modal'>
                    <Box sx={style} className='modal-students-content'>
                        <span className="close-icon" onClick={() => handleCLose()}><CloseIcon /></span>
                        <h1>Estudiantes</h1>
                        <div className='student-list'>
                            <FormControlLabel sx={{ borderBottom: '1px solid #dadada', margin: 0 }} control={<Checkbox onClick={checkAll} checked={checkedStudents.length === props.studentsList.length ? true : false} />} label='Seleccionar todos' />
                            {props.studentsList.filter(filterSudents).map(student => (
                                <FormControlLabel sx={{ margin: 0 }} control={<Checkbox onClick={() => checkStudent(student.id)} checked={checkedStudents.includes(student.id)} />} label={`${student.name} ${student.lastName}`} />
                            ))}
                        </div>
                        <Button sx={{ marginTop: '1rem' }} onClick={handleAddStudents} disabled={checkedStudents.length ? false : true} variant='contained'>agregar</Button>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}

export default CreateOrEditPeriodLayout