import React, { useEffect, useState } from "react";
import { IDataTableProps } from "../containers/dataTableContainer";
import { Paper, Table, TableHead, TableContainer, TableCell, TableRow, TableBody, TablePagination, Typography } from '@mui/material';

const DataTableLayout = (props: IDataTableProps) => {

    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(5)
    const [rows, setRows] = useState<any[]>([])

    useEffect(() => {
        const newData = props.data?.slice(page * rowsPerPage, rowsPerPage * (page + 1))
        setRows(newData)
    }, [props.data, page, rowsPerPage])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={props.actions ? props.keys.length + 1 : props.keys.length}>
                            <Typography variant="body1" fontWeight={700}>{props.title}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        {props.headerKeys.map((key) => (
                            <TableCell align="center">{key}</TableCell>
                        ))}
                        {props.actions ?
                            <TableCell align="center">Acciones</TableCell>
                            : null
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.length ? rows.map(data => (
                        <TableRow>
                            {props.keys.map(key => (
                                <TableCell align="center">{data[key]}</TableCell>
                            ))}
                            {props.actions ?
                                <TableCell sx={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center' }}>
                                    {props.actions(data)}
                                </TableCell>
                                : null
                            }
                        </TableRow>
                    )) :
                        <TableRow>
                            <TableCell align="center" colSpan={props.actions ? props.keys.length + 1 : props.keys.length}>No hay datos</TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
            {props.data?.length ?
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={props.data?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> : null
            }
        </TableContainer>
    )
}

export default DataTableLayout