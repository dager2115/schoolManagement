import React, { useEffect, useState } from "react";
import { DataTable } from "../../../commons/dataTable";
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import '../studentsListScreen.scss'
import CreateOrEditUser from "../../../modules/createOrEditUserModal/components/createOrEditUserModal";
import { useDispatch } from "react-redux";
import UserService, { IUser } from "../../../../services/userService/userService";
import { updateStudentsAction } from "../../../../reducers/studentReducer/actions";
import DeleteIcon from '@mui/icons-material/Delete';

interface IStudentsScreenProps {
    students: IUser[]
}

const StudentsScreenLayout = (props: IStudentsScreenProps) => {

    const [studentList, setStudentList] = useState<IUser[]>([])
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [editData, setEditData] = useState<IUser | undefined>()

    const navigate = useNavigate()
    const userService = new UserService()
    const dispatch = useDispatch()

    const handleSendInfo = (data?: any) => {
        if (data) {
            const response = userService.createUser(data, 'students')
            if (response.code === 200) {
                setStudentList(response.users)
                dispatch(updateStudentsAction(response.users))
            }
        }
        setEditData(undefined)
        setOpenModal(false)
    }

    const editStudent = (data: any) => {
        setEditData(data)
        setOpenModal(true)
    }


    useEffect(() => {
        setStudentList(props.students)
    }, [props.students])

    return (
        <div className="students-screen-layout">
            <div className="header-action">
                <span onClick={() => navigate('/')}>
                    <ArrowBackIosNewIcon />
                    <p>atras</p>
                </span>
                <Button startIcon={<AddIcon />} variant="outlined" onClick={() => setOpenModal(true)}>Agregar estudiante</Button>
            </div>
            <div className="data-container">
                <DataTable
                    data={studentList}
                    headerKeys={['Id', 'Nombre', 'Apellido', 'Edad', 'Direccion', 'Telefono']}
                    keys={['id', 'name', 'lastName', 'age', 'address', 'phone']}
                    title="Listado de estudiantes"
                    actions={(data: any) => (
                        <>
                            <div style={{ cursor: 'pointer' }} onClick={() => editStudent(data)}>
                                <EditIcon />
                            </div>
                            <div style={{ cursor: 'pointer' }} onClick={() => editStudent(data)}>
                                <DeleteIcon />
                            </div>
                        </>
                    )}
                />
            </div>
            <CreateOrEditUser
                open={openModal}
                close={handleSendInfo}
                title="Estudiante"
                data={editData}
            />
        </div>
    )
}

export default StudentsScreenLayout