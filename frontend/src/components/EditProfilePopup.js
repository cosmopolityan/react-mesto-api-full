import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup(props) {
  const { onUpdateUser, isOpen, onClose } = props;

  const currentUser = React.useContext(CurrentUserContext);

  const [formValues, setFormValues] = React.useState({
    name: '',
    description: ''
  });

  const [formValidity, setFormValidity] = React.useState({
    nameValid: true,
    descValid: true
  });

  React.useEffect(() => {
    setFormValues({
      name: currentUser.name,
      description: currentUser.about
    })
  }, [currentUser, isOpen])

  React.useEffect(() => {
    const isNameValid = formValues.name.length > 1;
    const isDescriptionValid = formValues.description.length > 1;

    setFormValidity({
      nameValid: isNameValid,
      descValid: isDescriptionValid
    })
  }, [formValues])


  const handleInputChange = React.useCallback((evt) => {
    const { name, value } = evt.target

    setFormValues((prevState) => ({
      ...prevState, [name]: value
    }));
  }, [formValues]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({ name: name, about: description })
  }

  const { name, description } = formValues;
  const { nameValid, descValid } = formValidity;
  const isSubmitAble = nameValid && descValid;

  return (

    <PopupWithForm
      title={"Редактировать профиль"}
      name={"edit-profile_form"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      valid={isSubmitAble}>

      <input
        value={name}
        onChange={handleInputChange}
        type="text"
        autoComplete="name"
        autoCapitalize="words"
        className={`popup__input popup__input_type_name ${nameValid ? '' : 'popup__input_error'}`}
        name="name"
        id="profile-name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />

      <input
        value={description}
        onChange={handleInputChange}
        type="text"
        autoComplete="description"
        autoCapitalize="words"
        className={`popup__input popup__input_type_job ${descValid ? '' : 'popup__input_error'}`}
        name="description"
        id="description"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
      />
    </PopupWithForm>
  )
}