import React from 'react'
import '../homeScreen.scss'
import { SectionCardComponent } from '../../../commons/sectionCard'
import { useNavigate } from 'react-router-dom';

interface ISection {
    name: string
    route: string
}

const HomeScreenLayout = () => {

    const navigate = useNavigate()

    const sections: ISection[] = [
        {
            name: 'Profesores',
            route: '/teachers-list'
        }, {
            name: 'Estudiantes',
            route: '/students-list'
        }, {
            name: 'Materias',
            route: '/matters-list'
        }, {
            name: 'Calificador',
            route: '/qualification-tool'
        },
    ]
    return (
        <div className='home-screen-container'>
            <div className='sections-list'>
                {sections.map(section => (
                    <SectionCardComponent name={section.name} onClick={() => navigate(section.route)} />
                ))}
            </div>
        </div>
    )
}

export default HomeScreenLayout