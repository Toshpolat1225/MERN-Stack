import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

function Filters() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories

    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search


    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

    return (
        <div className="filter_menu">
            <div className="row">
                <span>Saralash: </span>
                <select name="category" value={category} onChange={handleCategory} >
                    <option value=''>Barcha mahsulotlar</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <input type="text" value={search} placeholder="Qidiruv uchun"
            onChange={e => setSearch(e.target.value.toLowerCase())} />
            <div className="row sort">
                <span>Tanlash:</span>
                <select value={sort} onChange={e => setSort(e.target.value)} >
                    <option value=''>Yangilari</option>
                    <option value='sort=oldest'>Eskilari</option>
                    <option value='sort=-sold'>Yaxshi taklif</option>
                    <option value='sort=-price'> >> arzonga</option>
                    <option value='sort=price'> >> qimmatga</option>
                </select>
            </div>
        </div>
    )
}

export default Filters
