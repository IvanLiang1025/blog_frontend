

import React from "react";
import styles from "./login.less";
import logo from "../../images/logo.png";
// import LoginForm from "../../components/forms/loginForm";
import { Form, Button, Input, Icon, message } from "antd";
import axios from "axios";
import { apiPost } from '../../services/adminApi';
// import { apiPost } from '@/services/api';
import { authorize } from '../../services/authorize';
import { Redirect } from 'react-router-dom';
// import { apiPost } from 'services/api';
import { signIn } from '@/pages/api';
// import { parseResList, parseResSubmit, parseResDetail } from '../../services/requestApi';
import { connect } from "react-redux";
import {actions} from "@/redux/reducers/login";;


const mapDispatchToProps = (dispatch) => {
  return {
    login: (payload, callback) => {
      dispatch(actions.login(payload, callback))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.logIn.isLoading,
    // loginStatus: state.logIn.loginStatus
  }
}

@Form.create()
@connect(mapStateToProps, mapDispatchToProps)
class Login extends React.Component {

  state = {
    redirect: false
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values);
      if (err) {
        return;
      } else {
        this.props.login(values)
      }
    })
  }

  gotoSignIn = async (values) => {
    // const response = await signIn(values);
    // const result = parseResSubmit(response);
    // if (result) {
    //   authorize(result);
    //   this.setState({
    //     redirect: true
    //   })
    // }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { redirect } = this.state;
    console.log(this.props);

    // 声明式验证
    const userInputOptions = {
      rules: [
        { required: true, message: "Input user name please " },
        // { min: 6, message: "At least 6 characters" },
        { max: 20, message: "At most 20 characters" },
      ]
    }

    //custom validator
    const validator = (rule, value, callback) => {
      if (!value) {
        callback("Please input user name");
      } else if (value.length < 6) {
        callback("At least 6 characters");
      } else if (value.length > 20) {
        callback("At most 20 characters");
      } else {
        callback()

      }

      // callback("sdfdsf") //meaning errors, and error message is sdfdsf;
    }
    const pwdInputOptions = {
      rules: [
        { validator }
      ]
    }

    if (redirect) {
      return <Redirect to="/home"></Redirect>
    }

    return (
      <div className={styles.login}>
        {/* <div className={styles.header}>
          <div className={styles.wrapper}>
            <img className={styles.img} src={logo} alt="logo"></img>
            <div className={styles.title}> Shiny Admin System</div>
          </div>

        </div> */}
        <div className={styles.container}>
          <div className={styles.content}>
            <h2 className={styles.title}>Log in</h2>
            <div className={styles.wrapper}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                  {
                    getFieldDecorator("username", userInputOptions)(
                      <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="email"
                      />
                    )
                  }

                </Form.Item>
                <Form.Item>
                  {
                    getFieldDecorator("password", pwdInputOptions)(
                      <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                      />
                    )
                  }
                </Form.Item>
                <Form.Item>

                  <Button type="primary" htmlType="submit" className={styles.button}>
                    Log in
                  </Button>

                </Form.Item>
              </Form>
            </div>
          </div>


        </div>
      </div>
    )
  }
}



// const WrapLogin = Form.create()(Login);
export default Login;