import { useState } from "react";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component.jsx";
import FormInput from "../form-input/form-input.component.jsx";

import "./sign-in-form.component.scss";

import { 
    signInUserWithEmailAndPassword,
    signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils.js";

const defaultFormFields = {
    email: "",
    password: ""
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const resetFormFields = async () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (email === "" ||
            password === "") return;
        
        try {
            const { user } = await signInUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (err) {
            switch (err.code) {
                case "auth/wrong-password":
                    alert("incorrect password for email");
                    break;
                case "auth/user-not-found":
                    alert("no user associated with this email");
                    break;
                default:
                    console.log(err);
                    break;
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value}); 
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>sign in with your email</span>

            <form onSubmit={handleSubmit}>

                <FormInput label="Email" required onChange={handleChange} type="email" name="email" value={email}/>

                <FormInput label="Password" required onChange={handleChange} type="password" name="password" value={password}/>

                <div className="buttons-container">
                    <Button type="submit">Sign in</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>GOOGLE SIGN IN</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;