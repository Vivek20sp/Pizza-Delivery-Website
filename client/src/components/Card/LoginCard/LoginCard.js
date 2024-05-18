import React, {  useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginCard.css';
import useLoginIn from '../../../hook/useLoginIn';
import { toast } from 'react-toastify';

const LoginCard = () => {
    const [loginComponents, setloginComponents] = useState({
        name: '', email: '', password: ''
    });
    const { loading, login } = useLoginIn();
    

    const handleOnChange = (event) => {
        setloginComponents({ ...loginComponents, [event.target.name]: event.target.value });
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const res = await login(loginComponents.name, loginComponents.email, loginComponents.password);
        console.log(res);
        if (res.token !== null) {
            toast.success('Login Successfully');
        }
    }
    return (
        <>
            <div className="card container p-5 login-card">
                <div className='mb-5'>
                    <h1 style={{ fontWeight: "900" }}>Login</h1>
                </div>
                <form>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" className="form-control" aria-describedby="emailHelp" name='name' value={loginComponents.name} onChange={handleOnChange} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={loginComponents.email} onChange={handleOnChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={loginComponents.password} onChange={handleOnChange} />
                    </div>
                    <button type="submit" className="btn btn-warning mb-3" disabled={loading} onClick={onSubmit} style={{ width: "100%" }}>{loading ? <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div> : 'Login In'}</button>
                </form>
                <div className="login__other__actions">
                    <div className="login__forgot__password">Forgot password?</div>
                    <div className="login__new__account">Don't have account? <Link to="/account/register">Create account</Link> </div>
                </div>
            </div>
        </>
    );
}

export default LoginCard;