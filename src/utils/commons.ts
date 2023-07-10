import Swal from 'sweetalert2'

export const generarCodeId = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
}

export const fireConfirmDelete = (title?: string, text?: string) => {
    return Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si eliminalo'
    })
}

export const fireSimpleMessage = (icon: 'success' | 'error', title?: string, text?: string) => {
    Swal.fire({
        title,
        text,
        showConfirmButton: false,
        icon,
        timer: 3000
    })
}