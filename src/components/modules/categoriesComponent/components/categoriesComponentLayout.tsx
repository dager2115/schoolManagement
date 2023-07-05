import React from 'react'

import '../categoriesComponent.scss'

interface ICategoriesComponentLayoutProps {
}

const CategoriesComponentLayout = (props: ICategoriesComponentLayoutProps) => {
    return (
        <div className='categories-container'>
            {/* <div className='first-banner'>
                <div>Aquí</div>
            </div> */}
            <div className='title-categories'>
                <h1>Explora nuestras diferentes categorias</h1>
            </div>
            <div className='first-section'>
                <div className='category-container jewelry'>
                    <div className='text-container'>
                        <h1>Joyería</h1>
                    </div>
                </div>
                <div className='category-container cloting'>
                    <div className='text-container'>
                        <h1>Ropa</h1>
                    </div>
                </div>
            </div>
            <div className='second-section'>
                <div className='category-container shoes'>
                    <div className='text-container'>
                        <h1>Calzado</h1>
                    </div>
                </div>
                <div className='category-container accessories'>
                    <div className='text-container'>
                        <h1>Accesorios</h1>
                    </div>
                </div>
                <div className='category-container handbags'>
                    <div className='text-container'>
                        <h1>Bolsos</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoriesComponentLayout