import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import ReactLoading from 'react-loading';
import Category from '../components/Category/Category';
import useShopItems from '../hook/useShopItems';

const CategoryView = () => {
    const param = useParams()
    const [VegetarianPizzas, setVegetarianPizzas] = useState([])
    const [ClassicPizzas, setClassicPizzas] = useState([])
    const [MeatLoversPizzas, setMeatLoversPizzas] = useState([])
    const {loading,fetchItems} = useShopItems();
    useEffect(() => {
        const data = fetchItems();
        data.then((ele)=>{
            setVegetarianPizzas(ele.filter((e)=>e.category === 'VegetarianPizzas'));
            setClassicPizzas(ele.filter((e)=>e.category === 'ClassicPizzas'));
            setMeatLoversPizzas(ele.filter((e)=>e.category === 'MeatLoversPizzas'));
        })
    }, [param]);
    
    return ( 
        <div className='d-flex flex-wrap min-vh-100 w-100 justify-content-center align-items-center m-auto'>
            {loading && <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='m-auto'/>}
            { VegetarianPizzas && param.id === 'VegetarianPizzas' && <Category name="Vegetarian Pizzas" items={VegetarianPizzas} category="VegetarianPizzas"/>}
            { ClassicPizzas && param.id === 'ClassicPizzas' && <Category name="Classic Pizzas" items={ClassicPizzas} category="ClassicPizzas"/>}
            { MeatLoversPizzas && param.id === 'MeatLoversPizzas' && <Category name="Meat Lovers Pizzas" items={MeatLoversPizzas} category="MeatLoversPizzas"/>}
        </div>
     );
}
 
export default CategoryView;