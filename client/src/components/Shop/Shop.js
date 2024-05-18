import { useEffect, useState } from 'react';
import { TabTitle } from '../../utils/General';
import ShopCategory from './Container/ShopCategory';
import './Shop.css';
import ReactLoading from 'react-loading';
import useShopItems from '../../hook/useShopItems';

const Shop = () => {
    TabTitle("Shop - Pizza Taste")
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
    }, []);

    return (
        <div className="shop__contianer">
            {loading && <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='container h-100 w-10 justify-self-center align-self-center m-auto' />}
            {VegetarianPizzas && <ShopCategory name="Vegetarian Pizzas" key="VegetarianPizzas" items={VegetarianPizzas} />}
            {ClassicPizzas && <ShopCategory name="Classic Pizzas" key="ClassicPizzas" items={ClassicPizzas} />}
            {MeatLoversPizzas && <ShopCategory name="Meat Lovers Pizzas" key="MeatLoversPizzas" items={MeatLoversPizzas} />}
        </div>
    );
}

export default Shop;