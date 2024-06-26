import PropTypes from 'prop-types'
import React, { useEffect, useState } from "react"
import { Row, Col, Alert, Container } from "reactstrap"
import axios from 'axios'

// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// actions
import { loginUser, apiError, socialLogin } from "../../store/actions"

// import images
import logo from "../../assets/images/logo-sm-dark.png"
const axiosAPI = axios.create()
const Login = (props) => {
  useEffect(() => {
    document.body.className = "authentication-bg";
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = "";
    };
  });

  
  const  [details,storeDetails] = useState({
          Password:"",
          TrainerId:""
  });
  //
  const handleChange = (event) => {
    const { name, value } = event.target;
    storeDetails({ ...details, [name]: value });
};
  // handleValidSubmit
  const handleValidSubmit = (event, values) => {
    //props.loginUser(values, props.history)
    // event.preventDefault();
    console.log(values.TrainerId)
    try{
      //   if(values.TrainerId && values.TrainerId === 6969)
      //  {

      //  }
      axiosAPI.post('http://localhost:5000/api/requestLogin',details)
        .then((res)=>{

          if(res.status === 200){
            console.log(res.data)
            //setname(res.data.data)
            localStorage.setItem('authUser',JSON.stringify(res.data.data))
            window.location.href = '/dashboard'

            // alert("hekk")
            // localStorage.setItem('')
            // if(name.TrainerId.length === 4){
            //   localStorage.setItem('TrainerName', name.TrainerName);
            //   localStorage.setItem('TrainerId', name.TrainerId);
            //   localStorage.setItem('Password',name.Password);
            //   props.history.push('/dashboard'); 
              
            // }
          }
          else alert("data not received")
        })
        .catch((err)=>{
            console.error("Error fetching data:", err);
        })
    }
    catch(error){
        console.error("Error while login :", error);
    }
    // localStorage.setItem()
  }

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <div className="card overflow-hidden">
                <div className="bg-login text-center">
                  <div className="bg-login-overlay"></div>
                  <div className="position-relative">
                    <h5 className="text-white font-size-20">Welcome Back !</h5>
                    <p className="text-white-50 mb-0">Sign in to continue to Qovex.</p>
                    <Link to="/" className="logo logo-admin mt-4">
                      <img src={logo} alt="" height="30" />
                    </Link>
                  </div>
                </div>
                <div className="card-body pt-5">
                  <div className="p-2">
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v)
                      }}
                    >
                      {props.error && typeof props.error === "string" ? (
                        <Alert color="danger">{props.error}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <AvField
                          name="TrainerId"
                          label="TrainerId"
                          value={details.TrainerId}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter TrainerId"
                          type="text"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <AvField
                          name="Password"
                          label="Password"
                          onChange={handleChange}
                          value={details.Password}
                          type="password"
                          required
                          placeholder="Enter Password"
                        />
                      </div>
                      
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3">
                        <button
                          className="btn btn-primary w-100 waves-effect waves-light"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted"><i
                          className="mdi mdi-lock me-1"></i> Forgot your password?</Link>
                      </div>
                    </AvForm>

                  </div>
                </div>
              </div>
              <div className="mt-5 text-center">
                <p>Don't have an account ? <Link to="/register"
                  className="fw-medium text-primary"> Signup now </Link> </p>
                <p>© {new Date().getFullYear()} Qovex. Crafted with <i
                  className="mdi mdi-heart text-danger"></i> by Themesbrand
                        </p>
              </div>
            </Col>
          </Row>

        </Container>
     </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError, socialLogin })(Login)
)

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func
}