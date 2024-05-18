import { Link } from "react-router-dom";
import "./RegisterCard.css";
import { useContext, useState } from "react";
import useSigin from "../../../hook/useSigin";
import { toast } from "react-toastify";
import AuthContext from "../../../Context/AuthonicationContext";

const RegisterCard = () => {
    const [signInComponents, setsignInComponents] = useState({
        name: "",
        email: "",
        password: "",
        userType: "",
        phone: "",
        houseNo: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });
    const { loading, sigin } = useSigin();
    const context = useContext(AuthContext);
    const {setauthToken} = context;


    const handleOnChange = (event) => {
        setsignInComponents({ ...signInComponents, [event.target.name]: event.target.value });
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const res = await sigin(signInComponents.name, signInComponents.email, signInComponents.password, signInComponents.userType, signInComponents.phone, signInComponents.houseNo, signInComponents.address, signInComponents.city, signInComponents.state, signInComponents.pincode);
        if (res.token !== null) {
            toast.success('Sign In Successful 😎');
            localStorage.setItem('token',res.token);
            setauthToken(res.token);
        }
    }
    return (
        <>
            <div className="card container p-5 register-card">
                <div className="mb-5">
                    <h1 style={{fontWeight:"900"}}>Sign In</h1>
                </div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
                        <input type="text" className="form-control" name="name" value={signInComponents.name}
                            onChange={handleOnChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" value={signInComponents.email} onChange={handleOnChange} aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={signInComponents.password} onChange={handleOnChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">User Type</label>
                        <input type="text" className="form-control" aria-describedby="emailHelp" name="userType" value={signInComponents.userType} onChange={handleOnChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Phone Number</label>
                        <input type="number" className="form-control" aria-describedby="emailHelp" name="phone" value={signInComponents.phone} onChange={handleOnChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">House No</label>
                        <input type="number" className="form-control" aria-describedby="emailHelp" name="houseNo" value={signInComponents.houseNo} onChange={handleOnChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Address</label>
                        <input type="text" className="form-control" aria-describedby="emailHelp" name="address" value={signInComponents.address} onChange={handleOnChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">City</label>
                        <input type="text" className="form-control" aria-describedby="emailHelp" name="city" value={signInComponents.city} onChange={handleOnChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">State</label>
                        <input type="text" className="form-control" aria-describedby="emailHelp" name="state" value={signInComponents.state} onChange={handleOnChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Pincode</label>
                        <input type="number" className="form-control" aria-describedby="emailHelp" name="pincode" value={signInComponents.pincode} onChange={handleOnChange} />
                    </div>
                    <button type="submit" disabled={loading} style={{ width: "100%" }} className="btn btn-warning mb-3" onClick={onSubmit}>{loading ? <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div> : 'Sign In'}</button>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label text-primary">Already have account? <Link to='/account/login'>Login</Link></label>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RegisterCard;
