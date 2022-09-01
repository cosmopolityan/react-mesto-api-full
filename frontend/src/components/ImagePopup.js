import React from 'react';
import { useRef } from 'react'

function ImagePopup(props) {
  const { card, isOpen, onClose } = props;
  const containerSize = useRef(null)

  const setContainerSize = (evt) => {
    containerSize.current.style.width = `${evt.target.offsetWidth}px`
    containerSize.current.style.height = `${evt.target.offsetHeight}px`
  }

  return (
    <section className={'popup popup-photo' + (props.card.name ? ' popup_opened' : '')}
      onClick={onClose}
    >
      <div className="popup-photo__container">
        <figure className="popup-photo__box"
        ref={containerSize}
        >
          <button
            onClick={onClose}
            type="button"
            className="popup__close-button"
          />
          <img
            className="popup-photo__image"
            alt={card?.name}
            src={card?.link}
            onClick={(e) => e.stopPropagation()}
          />
          <figcaption className="popup__caption">{card ? card.name : ''}</figcaption>
        </figure>
      </div>
    </section >
  );
}

export default ImagePopup;