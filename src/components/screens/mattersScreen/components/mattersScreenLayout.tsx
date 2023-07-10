import React, { useState, useEffect } from "react";
import { DataTable } from "../../../commons/dataTable";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import { Modal, Box, TextField, Typography, Button } from '@mui/material';
import { useDispatch } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';

import '../mattersScreen.scss'
import MatterService, { IMatter } from "../../../../services/mattersService/matterService";
import { updateMattersAction } from "../../../../reducers/mattersReducer/actions";

interface MattersScreenLayoutProps {
    matters: IMatter[]
}

const MattersScreenLayout = (props: MattersScreenLayoutProps) => {

    const [mattersList, setMattersList] = useState<any[]>([])
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [editData, setEditData] = useState<any>({})
    const [edit, setEdit] = useState<boolean>(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const mattersService = new MatterService()

    useEffect(() => {
        setMattersList(props.matters)
    }, [props.matters])

    const styleInputsContainer = {
        gap: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 50%)',
        margin: '20px 0'
    }

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
        borderRadius: 2
    };


    const handleSendInfo = () => {
        const response = mattersService.createMatter(editData)
        if (response.code === 200) {
            setMattersList(response.matters)
            dispatch(updateMattersAction(response.matters))
            setEditData({})
            setOpenModal(false)
        }
    }

    const editMatter = (data: any) => {
        setEditData(data)
        setOpenModal(true)
    }

    const handleCLose = () => {
        setEditData({})
        setOpenModal(false)
    }

    const handleAddMatter = () => {
        setOpenModal(true)
        setEditData({})
        setEdit(false)
    }

    return (
        <div className="matters-screen-layout">
            <div className="header-action">
                <span onClick={() => navigate('/')}>
                    <ArrowBackIosNewIcon />
                    <p>atras</p>
                </span>
                <Button startIcon={<AddIcon />} variant="outlined" onClick={handleAddMatter}>Agregar materia</Button>
            </div>
            <div className="data-container">
                <DataTable
                    data={mattersList}
                    headerKeys={['Codigo', 'Nombre']}
                    keys={['code', 'name']}
                    title="Listado de materias"
                    actions={(data: any) => (
                        <div style={{ cursor: 'pointer' }} onClick={() => editMatter(data)}>
                            <EditIcon />
                        </div>
                    )}
                />
            </div>
            <Modal
                open={openModal}
            >
                <Box sx={style} className='modal-content'>
                    <span className="close-icon" onClick={() => handleCLose()}><CloseIcon /></span>
                    <Typography variant="h5">{edit ? 'Editar' : 'Agregar'} Materia</Typography>
                    <Box component='form' onSubmit={handleSendInfo} >
                        <Box sx={styleInputsContainer}>
                            <TextField id="outlined-required" required label='Nombre' name="name" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                        </Box>
                        <Button variant="contained" type="submit">{edit ? 'Editar' : 'Agregar'}</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default MattersScreenLayout