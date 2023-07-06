import React, { useEffect, useState } from "react";
import { DataTable } from "../../../commons/dataTable";
import TeachersService, { ITeacher } from "../../../../services/teachersService/teachersService";
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import '../teachersListScreen.scss'
import CreateOrEditUser from "../../../modules/createOrEditUserModal/components/createOrEditUserModal";
import { useDispatch } from "react-redux";
import { updateTeachersAction } from "../../../../reducers/teacherReducer/actions";


interface ITeachersScreenProps {
    teachers: ITeacher[]
}

const TeachersScreenLayout = (props: ITeachersScreenProps) => {

    const [teachersList, setTeachersList] = useState<ITeacher[]>([])
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [editData, setEditData] = useState<ITeacher | undefined>()

    const navigate = useNavigate()
    const teacherService = new TeachersService()
    const dispatch = useDispatch()

    const handleSendInfo = (data?: any) => {
        if (data) {
            const response = teacherService.createTeacher(data)
            if (response.code === 200) {
                setTeachersList(response.teachers)
                dispatch(updateTeachersAction(response.teachers))
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
                    <p>atras</p>
                </span>
                <Button startIcon={<AddIcon />} variant="outlined" onClick={() => setOpenModal(true)}>Agregar profesor</Button>
            </div>
            <div className="data-container">
                <DataTable
                    data={teachersList}
                    headerKeys={['Id', 'Nombre', 'Apellido', 'Edad', 'Direccion', 'Telefono']}
                    keys={['id', 'name', 'lastName', 'age', 'address', 'phone']}
                    actions={(data: any) => (
                        <div style={{cursor: 'pointer'}} onClick={() => editTeacher(data)}>
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