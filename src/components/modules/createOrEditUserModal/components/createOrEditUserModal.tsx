import React, { useEffect, useState } from "react";
import { Modal, Box, TextField, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../createOrEditUserModal.scss'

interface IModalProps {
    open: boolean
    close: (data?: any) => void
    title: string
    data?: any
    minAge: number
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

const styleInputsContainer = {
    gap: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 50%)',
    margin: '20px 0'
}

const CreateOrEditUser = (props: IModalProps) => {

    const [data, setData] = useState<any>({})

    const handleChange = (event: any) => {
        const { name, value } = event.target
        const newData = { ...data }
        newData[name] = value
        setData(newData)
    }

    const handleSumbmit = (event: any) => {
        event.preventDefault()
        props.close(data)
        setData({})
    }
    
    const handleClose = () => {
        props.close()
        setData({})
    }

    useEffect(() => {
        if(props.data){
            setData(props.data)
        }
    }, [props.data])

    return (
        <Modal
            open={props.open}
        >
            <Box sx={style} className='modal-content'>
                <span className="close-icon" onClick={handleClose}><CloseIcon /></span>
                <Typography variant="h5">{props.data ? 'Editar' : 'Agregar'} {props.title}</Typography>
                <Box component='form' onSubmit={handleSumbmit} >
                    <Box sx={styleInputsContainer}>
                        <TextField id="outlined-required" required label='Nombre' name="name" value={data.name} onChange={handleChange} />
                        <TextField id="outlined-required" required label='Apellido' name="lastName" value={data.lastName} onChange={handleChange} />
                        <TextField inputProps={{min: props.minAge}} id="outlined-required" required label='Edad' type="number" name="age" value={data.age} onChange={handleChange} />
                        <TextField id="outlined-required" required label='Dirección ' name="address" value={data.address} onChange={handleChange} />
                        <TextField placeholder="ejm: 311567890" inputProps={{pattern:"[0-9]{10}"}} id="outlined-required" required label='Teléfono ' type="tel" name="phone" value={data.phone} onChange={handleChange} />
                    </Box>
                    <Button variant="contained" type="submit">{props.data ? 'Editar' : 'Agregar'}</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default CreateOrEditUser