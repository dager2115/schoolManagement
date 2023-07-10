import React from 'react'
import '../homeScreen.scss'
import { SectionCardComponent } from '../../../commons/sectionCard'
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FactCheckIcon from '@mui/icons-material/FactCheck';

interface ISection {
    name: string
    route: string
    icon: any
}

const HomeScreenLayout = () => {

    const navigate = useNavigate()

    const sections: ISection[] = [
        {
            name: 'Profesores',
            route: '/teachers-list',
            icon: <SchoolIcon fontSize='large' sx={{marginRight: 1}}/>
        }, {
            name: 'Estudiantes',
            route: '/students-list',
            icon: <PersonIcon fontSize='large' sx={{marginRight: 1}}/>
        }, {
            name: 'Materias',
            route: '/matters-list',
            icon: <MenuBookIcon fontSize='large' sx={{marginRight: 1}}/>
        }, {
            name: 'Periodos Académicos',
            route: '/periods',
            icon: <CalendarMonthIcon fontSize='large' sx={{marginRight: 1}}/>
        }, {
            name: 'Calificador',
            route: '/qualification-tool',
            icon: <FactCheckIcon fontSize='large' sx={{marginRight: 1}}/>
        },
    ]
    return (
        <div className='home-screen-container'>
            <div className='sections-list'>
                {sections.map(section => (
                    <SectionCardComponent icon={section.icon} name={section.name} onClick={() => navigate(section.route)} />
                ))}
            </div>
        </div>
    )
}

export default HomeScreenLayout