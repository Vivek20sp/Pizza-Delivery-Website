import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import ReactLoading from 'react-loading';
import Item from '../components/Item/Item';
import useGetProductById from '../hook/useGetProductById';

const ProductView = (props) => {
    const param = useParams()
    const [items, setItems] = useState('');
    const [loading, setloading] = useState(false);
    const { item } = useGetProductById();
    useEffect(() => {
        setloading(true);
        const data = item(param.id);
        data.then((ele) => {
            setItems(ele.item);
            setloading(false);
        });
    }, []);
    return (
        <div className="d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto">
            {loading && items===null && <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='m-auto' />}
            {items && <Item item={items} loading={loading} />}
        </div>
    );
}

export default ProductView;