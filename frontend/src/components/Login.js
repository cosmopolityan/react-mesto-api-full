import React from 'react'
import Form from './Form'

function Login(props) {
  const { title, name, buttonText, onLogIn } = props;

  const [formValues, setFormValues] = React.useState({
    email: '',
    password: ''
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target

    setFormValues((prevState) => ({
      ...prevState, [name]: value
    }));
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    const { email, password } = formValues;

    if (!password || !email) {
      return;
    }
    onLogIn(password, email);
  }

  const { email, password } = formValues;

  return (
    <div className="enter">
      <Form
        title={title}
        name={name}
        onSubmit={onSubmit}
        buttonText={buttonText}
        valid='true'
        type="login"
      >
        <input
          value={email}
          type="url"
          name="email"
          placeholder="Email"
          id="email"
          className="popup__input popup__input_type_login"
          onChange={handleInputChange}
          required
        />
        <input
          value={password}
          type="password"
          name="password"
          placeholder="Пароль"
          id="password"
          className="popup__input popup__input_type_login"
          onChange={handleInputChange}
          required
        />
      </Form>
    </div>
  )
}

export default Login