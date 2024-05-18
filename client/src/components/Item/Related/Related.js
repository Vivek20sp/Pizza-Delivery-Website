import RelatedCard from '../../Card/RelatedCard/RelatedCard';
import './Related.css';
import useFetauredItems from '../../../hook/useFetauredItems';
import ReactLoading from 'react-loading';

const Related = (props) => {

    const { loading, itemsData } = useFetauredItems();

    return (
        <div className="related__products">
            <div className="related__header__container">
                <div className="related__header">
                    <h2>Recommended Products</h2>
                </div>
                <div className="related__header__line">

                </div>
            </div>
            <div className="related__card__container">
                <div className="related__product__card">
                    {loading && itemsData.length===0 && <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='m-auto' />}
                    {itemsData.length !== 0 && itemsData.map((item) => <RelatedCard item={item} />)}
                </div>
            </div>
        </div>
    );
}

export default Related;