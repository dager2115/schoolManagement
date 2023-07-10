import React, { useEffect, useState } from "react";
import { IReportData } from "../containers/academicPeriodScreenContainer";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import '../styles/reportData.scss'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface IReportProps {
    reportData: IReportData[]
    back: () => void
}

const ReportLayout = (props: IReportProps) => {
    
    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(5)
    const [rows, setRows] = useState<any[]>([])

    useEffect(() => {
        const newData = props.reportData?.slice(page * rowsPerPage, rowsPerPage * (page + 1))
        setRows(newData)
    }, [props.reportData, page, rowsPerPage])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const keys = [
        'Año académico',
        'Identificaión alumno',
        'Nombre alumno',
        'Código materia',
        'Nombre materia',
        'Identicación del profesor',
        'Nombre del profesor',
        'calificación final',
        'Aprobó'
    ]

    return (
        <div className="report-layout">
            <div className="header-action">
                <span onClick={props.back}>
                    <ArrowBackIosNewIcon />
                    <Typography variant='h5'>Reporte</Typography>
                </span>
            </div>
            <TableContainer component={Paper} sx={{ maxWidth: 1200, margin: 'auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={9}>Reporte de calificaciónes</TableCell>
                        </TableRow>
                        <TableRow>
                            {keys.map(key => (
                                <TableCell align="center">{key}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(data => (
                            <TableRow>
                                <TableCell align="center">{new Date(JSON.parse(data.year)).getFullYear()}</TableCell>
                                <TableCell align="center">{data.matter.student.code}</TableCell>
                                <TableCell align="center">{data.matter.student.name}</TableCell>
                                <TableCell align="center">{data.matter.code}</TableCell>
                                <TableCell align="center">{data.matter.name}</TableCell>
                                <TableCell align="center">{data.matter.teacher.code}</TableCell>
                                <TableCell align="center">{data.matter.teacher.name}</TableCell>
                                <TableCell align="center">{data.matter.student.qualification}</TableCell>
                                <TableCell align="center">{data.matter.student.approved === true ? 'SI' : data.matter.student.approved === false ? 'NO' : 'sin calificar'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={props.reportData?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    )
}

export default ReportLayout