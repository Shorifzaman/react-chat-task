import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Hooks/Spinner';
import useAuth from '../../components/Hooks/useAuth';

function Registration() {
    const [loginData, setLoginData] = useState({});
    const { registerUser,signInWithGoogle, isLoading, authError , registerToDB} = useAuth();
    const location = useLocation()
    const navigate = useNavigate();

    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData }
        newLoginData[field] = value;
        setLoginData(newLoginData)

    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (loginData.password !== loginData.rePassword) {

            return alert('Your PassWord ded not match')

        }

        registerUser(loginData.email, loginData.password, loginData.name, location, navigate)
        // register user to the database
        // registerToDB({ name, email, emailVerified, password });


        e.target.reset();
    }


    return(
        <section className="_social_registration_wrapper _layout_main_wrapper">
            <div className="_shape_one">
                <img src="assets/images/shape1.svg" alt="Registration" className="_shape_img" />
                <img src="assets/images/dark_shape.svg" alt="Registration"  className="_dark_shape" />
            </div>
            <div className="_shape_two">
                <img src="assets/images/shape2.svg" alt="Registration"  className="_shape_img" />
                <img src="assets/images/dark_shape1.svg" alt="Registration"  className="_dark_shape _dark_shape_opacity" />
            </div>
            <div className="_shape_three">
                <img src="assets/images/shape3.svg" alt="Registration"  className="_shape_img" />
                <img src="assets/images/dark_shape2.svg" alt="Registration"  className="_dark_shape _dark_shape_opacity" />
            </div>
            <div className="_social_registration_wrap">
                <div className="container">
                <div className="row align-items-center">
                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                    <div className="_social_registration_right">
                        <div className="_social_registration_right_image">
                        <img src="assets/images/registration.png" alt="Registration" />
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                { isLoading ? <Spinner /> :
                    <div className="_social_registration_content">
                        <p className="_social_registration_content_para _mar_b8">Get Started Now</p>
                        <h4 className="_social_registration_content_title _titl4 _mar_b50">Registration</h4>
                        <button type="button" onClick={() => signInWithGoogle(location, navigate)} className="_social_registration_content_btn _mar_b40">
                        <img src="assets/images/google.svg" className="_google_img" alt="Registration"  /> <span>Register with google</span>
                        </button>
                        <div className="_social_registration_content_bottom_txt _mar_b40"> <span>Or</span>
                        </div>
                        <form onSubmit={handleLoginSubmit} className="_social_registration_form">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="_social_registration_form_input _mar_b14">
                                <label className="_social_registration_label _mar_b8">Email</label>
                                <input 
                                required
                                label="You Email"
                                type="email"
                                placeholder='Email'
                                name="email"
                                onBlur={handleOnBlur}
                                className="form-control _social_registration_input" />
                            </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="_social_registration_form_input _mar_b14">
                                <label className="_social_registration_label _mar_b8">Password</label>
                                <input 
                                required
                                type="password"
                                name="password"
                                placeholder='password'
                                autoComplete="current-password"
                                onBlur={handleOnBlur}
                                className="form-control _social_registration_input" />
                            </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="_social_registration_form_input _mar_b14">
                                <label className="_social_registration_label _mar_b8">Repeat Password</label>
                                <input 
                                required
                                type="password"
                                name="rePassword"
                                autoComplete="current-password"
                                placeholder='RePassword'
                                onBlur={handleOnBlur}
                                className="form-control _social_registration_input" />
                            </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
                            <div className="form-check _social_registration_form_check">
                                <input className="form-check-input _social_registration_form_check_input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                                <label className="form-check-label _social_registration_form_check_label" htmlFor="flexRadioDefault2">I agree to terms &amp; conditions</label>
                            </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                            <div className="_social_registration_form_btn _mar_t40 _mar_b60">
                                <button type="submit" className="_social_registration_form_btn_link _btn1">Register now</button>
                            </div>
                            </div>
                        </div>
                        </form>
            {
               authError &&  <p severity="error">
                   <hr />  
               <p>Error</p>
               {authError} <strong>check it out!</strong>
               <hr />
               </p>
            }
                        <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="_social_registration_bottom_txt">
                            <p className="_social_registration_bottom_txt_para">Already  have an account? <a href="/login">Login now</a>
                            </p>
                            </div>
                        </div>
                        </div>
                    </div>
}
                    </div>
                </div>
                </div>
            </div>
        </section>

    )
}
export default Registration;