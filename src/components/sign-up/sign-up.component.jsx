import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, createUserProfileDocument } from "../../firebase/firebase.util";
import { createUserWithEmailAndPassword } from 'firebase/auth';

import 'sign-up.styles.scss';

class SignUp extends React.Component {

    constructor() {
        super()

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {

        event.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert('password don\'t match');
            return;
        } else {

            const { user } = await createUserWithEmailAndPassword(email, password);
            console.log(user)

            await createUserProfileDocument(user, {displayName});

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        }
    }

    handleChange = event => {

        event.preventDefault();
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    render() {

        const { displayName, email, password, confirmPassword } = this.state;

        return (
            <div className="sign-up">

                <h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>

                <form action="" className="sign-up-form">

                    <FormInput type='text'
                               name='displayName'
                               value = {displayName}
                               onChange = {this.handleChange}
                               label='Display name'
                               required />

                    <FormInput type='email'
                               name='email'
                               value = {email}
                               onChange = {this.handleChange}
                               label='Email'
                               required />

                    <FormInput type='password'
                               name='password'
                               value = {password}
                               onChange = {this.handleChange}
                               label='Password'
                               required />

                    <FormInput type='password'
                               name='confirmPassword'
                               value = {confirmPassword}
                               onChange = {this.handleChange}
                               label='Confirm password'
                               required />

                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    }

}

export default SignUp;