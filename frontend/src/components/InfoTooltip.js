import React from 'react'

export default function InfoTooltip (props) {
  const {isOpen, onClose, stopProp, state} = props;

  return  (
    <div className={`popup ${isOpen && 'popup_opened'}`}
      onClick={onClose}
    >
    <div className="popup__info"
      onClick={stopProp}
    >
      <button
        type="button"
        className={`popup__close-button`}
        aria-label="Закрыть без сохранения"
        onClick={onClose}
      >
      </button>
      <div className={`popup__img ${state ? 'popup__img_type_success' : 'popup__img_type_bad'}`}></div>
      <h2 className="popup__heading popup__heading_type_reg">{state ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
    </div>
  </div>

  )
}