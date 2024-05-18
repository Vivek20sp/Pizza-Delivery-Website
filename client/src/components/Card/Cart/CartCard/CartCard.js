import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import './CartCard.css';
import { CartItemsContext } from '../../../../Context/CartItemsContext';
import { Button, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import MapContext from '../../../../Context/MapContext';
import useGetUserInfo from '../../../../hook/useGetUserInfo';
import { Link } from 'react-router-dom';

const CartCard = (props) => {
    const cartItems = useContext(CartItemsContext);
    const [size, setSize] = useState('Small');
    const [quantity, setQuantity] = useState(1);
    const mapContext = useContext(MapContext);
    const { setPincode, setUserPincode} = mapContext;
    const { loading, userInfo } = useGetUserInfo();
    const [userData, setUserData] = useState('');

    useEffect(() => {
        if (!loading) {
            userInfo().then((data) => {
                setUserData(data);
            });
        }
    }, [loading, userInfo]);

    const handleQuantityIncrement = () => {
        cartItems.quantity(props.item._id, 'INC');
    };

    const handleQuantityDecrement = () => {
        
        if (props.item.itemQuantity > 1) {
            cartItems.quantity(props.item._id, 'DEC');
        }
    };

    const handleRemoveItem = () => {
        cartItems.removeItem(props.item);
    };

    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };

    const handleOnMap = () => {
        if (setPincode && setUserPincode) {
            setPincode(props.item.Pincode);
            setUserPincode(userData.pincode);
        } else {
            console.error('setPincode or setUserPincode is not defined');
        }
    };

    return (
        <div className='cart__item__card'>
            <div className="cart__item__detail">
                <div className="cart__item__image">
                    <img src={props.item.ProductPhotos[0]} alt="item" className="item__image" />
                </div>
                <div className="cart__item__name">{props.item.ProductName}</div>
            </div>
            <div className="cart__item__quantity">
                <IconButton onClick={handleQuantityIncrement}>
                    <AddCircleIcon />
                </IconButton>
                <div type="text" name="quantity" className="quantity__input">{props.item.itemQuantity}</div>
                <IconButton onClick={handleQuantityDecrement}>
                    <RemoveCircleIcon fontSize='medium' />
                </IconButton>
            </div>
            <div className="product size">
                <Box sx={{ minWidth: 80 }}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Size</InputLabel>
                        <Select
                            value={size}
                            label="size"
                            onChange={handleSizeChange}
                        >
                            <MenuItem value='Small'>Small</MenuItem>
                            <MenuItem value='Medium'>Medium</MenuItem>
                            <MenuItem value='Large'>Large</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <div>
                <Link to='/map' onClick={handleOnMap} className='btn btn-primary'><i className="bi bi-map" style={{ fontSize: "25px" }}></i></Link>
            </div>
            <div className="cart__item__price">${props.item.ProductPrice}</div>
            <div className="remove__item__icon">
                <IconButton onClick={handleRemoveItem}>
                    <HighlightOffIcon />
                </IconButton>
            </div>
        </div>
    );
}

export default CartCard;
