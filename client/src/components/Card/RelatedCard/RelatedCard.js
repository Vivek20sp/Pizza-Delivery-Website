import './RelatedCard.css'
import { Link } from "react-router-dom"

const RelatedCard = (props) => {
    return ( 
        <div className="related__product__card__container">
            <div className="related__product__card__inner">
                <div className="related__product__image"> 
                    <img src= {props.item.ProductPhotos[0]} alt="item" className="product__img"/> 
                </div>
                <div className="related__product__card__detail">
                    <div className="related__product__name">
                        <Link to={`/item/${props.item.category}/${props.item._id}`}>
                           {props.item.ProductName}
                        </Link>
                    </div>
                    <div className="related__product__description">
                        <span>{props.item.ShortProductDescription}</span>
                    </div>
                    <div className="related__product__price">
                        <span>${props.item.ProductPrice}</span>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default RelatedCard;