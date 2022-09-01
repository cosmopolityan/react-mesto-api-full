import React from 'react'
import Form from './Form'
import { Link } from 'react-router-dom';

function Register(props) {
  const { title, name, buttonText, onRegister } = props;

  const [formValues, setFormValues] = React.useState({
    password: '',
    email: '',
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target

    setFormValues((prevState) => ({
      ...prevState, [name]: value
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { password, email } = formValues;
    onRegister(password, email);
  }

  const { password, email } = formValues;

  return (
    <div className="enter">
      <Form
        title={title}
        name={name}
        onSubmit={handleSubmit}
        buttonText={buttonText}
        valid='true'
        type="login"
      >
        <input
          value={email}
          type="url"
          name="email"
          placeholder="Email"
          id="regemail"
          className="popup__input popup__input_type_login"
          onChange={handleInputChange}
          required
        />
        <input
          value={password}
          type="password"
          name="password"
          placeholder="Пароль"
          id="regpassword"
          className="popup__input popup__input_type_login"
          onChange={handleInputChange}
          required
        />
      </Form>
      <p className="enter__text">Уже зарегистрированы? <Link to="/sign-in" className="enter__link">Войти</Link></p>
    </div>
  )
}

export default Register