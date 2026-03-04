import { useState } from "react";
import { FaTelegramPlane, FaCheckCircle } from "react-icons/fa";
import SuccessModal from "./SuccessModal.JSX";
import './ContactForm.css';

const ContactForm = () => {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [message, setMessage] = useState("");
    const [messageError, setMessageError] = useState("");
    const [isSubmaited, setIsSubmaited] = useState(false);

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);

        const nameParts = value.trim().split(/\s+/);

        if (value.trim() === "") {
            setNameError("Name is required");
        }
        else if (nameParts.length < 2) {
            setNameError("Please enter your full name (First and Last name)");
        }

        else {
            setNameError("valid");
        }
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setPhone(value);
        if (value.trim().length > 10) {
            setPhoneError("valid");
        } else {
            setPhoneError("Enter a valid phone number");
        }
    }

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value.trim() === "") {
            setEmailError("Email is required");
        } else if (!emailPattern.test(value)) {
            setEmailError("Enter a valid email address");
        } else {
            setEmailError("valid");
        }
    };

    const handleMessageChange = (e) => {
        const value = e.target.value;
        setMessage(value);
        if (value.trim() === "") {
            setMessageError("Message is required");
        } else {
            setMessageError("valid");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let isValid = true;

        if (name.trim() === "") {
            setNameError("Name is required");
            isValid = false;
        } else if (name.trim().split(/\s+/).length < 2) {
            setNameError("Please enter your full name");
            isValid = false;
        }

        if (phone.trim() === "") {
            setPhoneError("Phone number is required");
            isValid = false;
        }

        if (email.trim() === "") {
            setEmailError("Email is required");
            isValid = false;
        }

        if (message.trim() === "") {
            setMessageError("Message is required");
            isValid = false;
        }

        if (!isValid ||
            nameError !== "valid" ||
            phoneError !== "valid" ||
            emailError !== "valid" ||
            messageError !== "valid"
        ) {
            return;
        }

        // إذا كان كل شيء سليم
        setIsSubmaited(true);
        // إعادة تعيين الحقول
        setName(""); setPhone(""); setEmail(""); setMessage("");
        setNameError(""); setPhoneError(""); setEmailError(""); setMessageError("");
    };

    return (
        <div className="page">
            <div className="form-container">
                <div className="form-header">
                    <div className="icon"><FaTelegramPlane /></div>
                    <h2>Contact Us</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="f-field">
                        <div className="field">
                            <label>Full Name</label>
                            <input type="text" value={name} onChange={handleNameChange} />
                        </div>
                        <small className="error">
                            {nameError === "valid" ? <FaCheckCircle style={{ color: 'green' }} /> : nameError}
                        </small>
                    </div>

                    <div className="f-field">
                        <div className="field">
                            <label>Phone No.</label>
                            <input type="text" value={phone} onChange={handlePhoneChange} />
                        </div>
                        <small className="error">
                            {phoneError === "valid" ? <FaCheckCircle style={{ color: 'green' }} /> : phoneError}
                        </small>
                    </div>

                    <div className="f-field">
                        <div className="field">
                            <label>Email Id</label>
                            <input type="email" value={email} onChange={handleEmailChange} />
                        </div>
                        <small className="error">
                            {emailError === "valid" ? <FaCheckCircle style={{ color: 'green' }} /> : emailError}
                        </small>
                    </div>

                    <div className="f-field">
                        <div className="field">
                            <label>Your Message</label>
                            <textarea value={message} onChange={handleMessageChange} />
                        </div>
                        <small className="error">
                            {messageError === "valid" ? <FaCheckCircle style={{ color: 'green' }} /> : messageError}
                        </small>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>

            <SuccessModal
                isOpen={isSubmaited}
                onCancel={() => setIsSubmaited(false)}
            />
        </div>
    );
};

export default ContactForm;