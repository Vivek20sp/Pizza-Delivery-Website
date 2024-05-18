import { Navigate, BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from '../routes/Home';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ManageAccount from '../components/Account/ManageAccount/ManageAccount';
import MyAccount from '../components/Account/MyAccount/MyAccount';
import Shop from '../components/Shop/Shop';
import ItemView from '../routes/ItemView';
import CategoryView from '../routes/CategoryView';
import SearchView from '../routes/Search';
import CartItemsProvider from '../Context/CartItemsProvider';
import Login from '../components/Authentication/Login/Login';
import Register from '../components/Authentication/Register/Register';
import Wishlist from '../components/Wishlist';
import WishItemsProvider from '../Context/WishItemsProvider';
import SearchProvider from '../Context/SearchProvider';
import { useContext } from 'react';
import AuthContext from '../Context/AuthonicationContext';
import MapProvider  from '../Context/MapProvider';
import GoogleMap from '../components/Google Maps/GoogleMap';

function App() {
  const context = useContext(AuthContext);
  const { authToken } = context;

  return (
    <>
      <MapProvider>
        <CartItemsProvider>
          <WishItemsProvider>
            <SearchProvider>
              <Router >
                <Header />
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path="/account">
                    <Route path="me" element={<MyAccount />} />
                    <Route path="manage" element={<ManageAccount />} />
                    <Route path="login" element={authToken ? <Navigate to='/' /> : <Login />} />
                    <Route path="register" element={authToken ? <Navigate to='login' /> : <Register />} />
                    <Route path="*" element={authToken ? <Navigate to='/' /> : <Login />} />
                  </Route>
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/category">
                    <Route path=":id" element={<CategoryView />} />
                  </Route>
                  <Route path="/item">
                    <Route path="/item/ClassicPizzas">
                      <Route path=":id" element={<ItemView />} />
                    </Route>
                    <Route path="/item/MeatLoversPizzas">
                      <Route path=":id" element={<ItemView />} />
                    </Route>
                    <Route path="/item/VegetarianPizzas">
                      <Route path=":id" element={<ItemView />} />
                    </Route>
                    <Route path="/item/featured">
                      <Route path=":id" element={<ItemView />} />
                    </Route>
                  </Route>
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/search/*" element={<SearchView />} />
                  <Route path='/map' element={<GoogleMap />} />
                </Routes>
                <Footer />
                <Routes>
                  <Route path="/admin" element={<Wishlist />} />
                </Routes>
              </Router>
            </SearchProvider>
          </WishItemsProvider>
        </CartItemsProvider>
      </MapProvider>
    </>
  );
}

export default App;