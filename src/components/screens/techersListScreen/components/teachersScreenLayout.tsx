import React, { useEffect, useState } from "react";
import { DataTable } from "../../../commons/dataTable";
import TeachersService, { IUser } from "../../../../services/userService/userService";
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import '../teachersListScreen.scss'
import CreateOrEditUser from "../../../modules/createOrEditUserModal/components/createOrEditUserModal";
import { useDispatch } from "react-redux";
import { updateTeachersAction } from "../../../../reducers/teacherReducer/actions";
import UserService from "../../../../services/userService/userService";


interface ITeachersScreenProps {
    teachers: IUser[]
}

const TeachersScreenLayout = (props: ITeachersScreenProps) => {

    const [teachersList, setTeachersList] = useState<IUser[]>([])
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [editData, setEditData] = useState<IUser | undefined>()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userService = new UserService()

    const handleSendInfo = (data?: any) => {
        if (data) {
            const response = userService.createUser(data, 'teachers')
            if (response.code === 200) {
                setTeachersList(response.users)
                dispatch(updateTeachersAction(response.users))
            }
        }
        setEditData(undefined)
        setOpenModal(false)
    }

    const editTeacher = (data: any) => {
        setEditData(data)
        setOpenModal(true)
    }


    useEffect(() => {
        setTeachersList(props.teachers)
    }, [props.teachers])

    return (
        <div className="teachers-screen-layout">
            <div className="header-action">
                <span onClick={() => navigate('/')}>
                    <ArrowBackIosNewIcon />
                    <Typography variant='h5'>Lista de profesores</Typography>
                </span>
                <Button startIcon={<AddIcon />} variant="outlined" onClick={() => setOpenModal(true)}>Agregar profesor</Button>
            </div>
            <div className="data-container">
                <DataTable
                    data={teachersList}
                    headerKeys={['Codigo', 'Nombre', 'Apellido', 'Edad', 'Direccion', 'Telefono']}
                    keys={['code', 'name', 'lastName', 'age', 'address', 'phone']}
                    title="Listado de profesores"
                    actions={(data: any) => (
                        <div style={{ cursor: 'pointer' }} onClick={() => editTeacher(data)}>
                            <EditIcon />
                        </div>
                    )}
                />
            </div>
            <CreateOrEditUser
                open={openModal}
                close={handleSendInfo}
                title="Profesor"
                data={editData}
            />
        </div>
    )
}

export default TeachersScreenLayout