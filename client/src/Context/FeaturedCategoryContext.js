import { createContext } from "react";

import Pizza1 from '../asset/Products/Pizza Featured/delicious-pizza-indoors.jpg'
import Pizza2 from '../asset/Products/Pizza Featured/pottery-pan-with-sauteed-dish-covered-with-melted-cheese.jpg'
import Pizza3 from '../asset/Products/Pizza Featured/pizza-placed-wooden-plate.jpg'

export const FeatureCategoryContext = createContext([
    {
        name: "Pizza Category 1",
        image: Pizza1,
        url: '/category/VegetarianPizzas',
        id: 1
    },
    {
        name: "Pizza Category 2",
        image: Pizza2,
        url: '/category/ClassicPizzas',
        id: 2
    },
    {
        name: "Pizza Category 3",
        image: Pizza3,
        url: '/category/MeatLoversPizzas',
        id: 3
    }
])