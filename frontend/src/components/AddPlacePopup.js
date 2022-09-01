import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {
  const { onAddPlace, isOpen, onClose } = props;

  const [formValues, setFormValues] = React.useState({
    placeName: '',
    link: ''
  });

  const [formValidity, setFormValidity] = React.useState({
    nameValid: false,
    linkValid: false
  });

  React.useEffect(() => {
    if (!isOpen) {
      setFormValues({
        placeName: '',
        link: ''
      })
    }
  }, [isOpen])

  const handleInputChange = React.useCallback((evt) => {
    const { name, value } = evt.target

    setFormValues((prevState) => ({
      ...prevState, [name]: value
    }));
  }, [formValues]);


  React.useEffect(() => {
    const isNameValid = formValues.placeName.length > 1;
    const isLinkValid = formValues.link.length > 1;

    setFormValidity({
      nameValid: isNameValid,
      linkValid: isLinkValid
    })
  }, [formValues])

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({ name: placeName, link });
  }

  const { placeName, link } = formValues;
  const { nameValid, linkValid } = formValidity;
  const isSubmitAble = nameValid && linkValid;

  return (

    <PopupWithForm
      title={"Новое место"}
      name={"add-card_form"}
      buttonTitle={"Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      valid={isSubmitAble}>

      <input
        value={placeName}
        onChange={handleInputChange}
        type="text"
        className="popup__input"
        name="placeName"
        id="title"
        placeholder="Название" minLength="2" maxLength="30" required />

      <input
        value={link}
        onChange={handleInputChange}
        type="url"
        className="popup__input"
        name="link"
        id="photo-link"
        placeholder="Ссылка на картинку"
        required />

    </PopupWithForm>
  )
}