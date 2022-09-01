import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function EditProfilePopup(props) {
  const { onUpdateAvatar, isOpen, onClose } = props;
  const avatar = React.useRef()


  function handleSubmit(evt) {
    evt.preventDefault();

    if (avatar.current.value.length > 2) {
      onUpdateAvatar({ avatar: avatar.current.value });
      avatar.current.value = ''
    }
  }

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"edit-avatar"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>

      <input
        ref={avatar}
        type="url"
        className="popup__input"
        name="avatar"
        id="avatar"
        placeholder="Ссылка на картинку"
        required />
    </PopupWithForm>
  )
}