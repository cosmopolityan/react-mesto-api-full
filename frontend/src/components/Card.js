import React from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext'

function Card(props) {

  const { card, onCardClick, onCardLike, onCardDelete } = props;

  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `element__trash-button ${isOwn ? 'element__trash-button' : 'element__trash-button_hidden'}`
  );
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element__like-button ${isLiked ? 'element__like-button_active' : 'element__like-button'}`
  );

  return (
    <li
      className="element"
    >
      <img className="element__image" src={card.link} alt={card.name}
        onClick={() => onCardClick(card)}
      />
      <button
        type="button"
        className={cardDeleteButtonClassName}
        aria-label="Удалить"
        onClick={() => onCardDelete(card)}
      >
      </button>
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button type="button" className={cardLikeButtonClassName} aria-label="Добавить в избранное" onClick={() => onCardLike(card)}></button>
          <span className="element__likecounter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card