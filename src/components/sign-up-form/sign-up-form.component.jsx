import { useState } from "react";

import FormInput from "../form-input/form-input.component.jsx";
import Button from "../button/button.component.jsx";

import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth 
} from "../../utils/firebase/firebase.utils.js";

import "./sign-up-form.styles.scss"

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpForm = () => {
    
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!displayName ||
            !email ||
            !password ||
            !confirmPassword) {
                return;
        }

        if (password !== confirmPassword) {
            alert("password does not match");
            return;
        };
        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );
            
            await createUserDocumentFromAuth(user, { displayName })
            resetFormFields();
        } catch(error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Cannot create user, email already in use");
            } else {
                console.log(error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>sign up with your email</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" required onChange={handleChange} type="text" name="displayName" value={displayName}/>

                <FormInput label="Email" required onChange={handleChange} type="email" name="email" value={email}/>

                <FormInput label="Password" required onChange={handleChange} type="password" name="password" value={password}/>

                <FormInput label="Confirm Password" required onChange={handleChange} type="password" name="confirmPassword" value={confirmPassword}/>
                <Button type="submit">Sign in</Button>
            </form>
        </div>
    );
}

export default SignUpForm;