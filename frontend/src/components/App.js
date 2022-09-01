import React, { useEffect } from 'react';
import { api } from '../utils/api';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup.js';
import DeletePlacePopup from './DeletePlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../utils/auth';

function App() {
  // const history = useHistory();
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [deleteCard, setDeleteCard] = React.useState(null)
  const [cards, setCards] = React.useState([]);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false)
  const [infoTooltipState, setInfoTooltipState] = React.useState(false)
  const [logedIn, setLogedIn] = React.useState(false)
  const [userEmail, setUserEmail] = React.useState('')

  const [editButtonText, setEditButtonText] = React.useState('Сохранить');
  const [delButtonText, setDelButtonText] = React.useState('Да');
  const [avatarButtonText, setAvatarButtonText] = React.useState('Сохранить')
  const [placeButtonText, setPlaceButtonText] = React.useState('Создать')

  const [currentUser, setCurrentUser] = React.useState(React.useContext(CurrentUserContext))


  // Открытие и закрытие попапов
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null)
    setDeleteCard(null)
    setIsInfoTooltipOpen(false)

    setSelectedCard({});
  }

  React.useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups()
      }
    }

    api.getProfileInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });

    document.addEventListener('keydown', handleEscClose)

    return () => {
      document.removeEventListener('keydown', handleEscClose)
    }
  }, []);

  React.useEffect(() => {
    console.log('hello')
    tokenCheck();
  }, [logedIn])

  // Авторизация и регистрация

  const setInfoTooltipMessage = (value) => {
    setInfoTooltipState(value)
  }

  const isLogIn = (value) => {
    setLogedIn(value)
  }

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');

      auth.checkToken(jwt)
        .then((res) => {
          if (res.data.email !== userEmail) {
            setUserEmail(res.data.email);
          }
          setLogedIn(true)
          // history.push('/');
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleRegistration = (password, email) => {
    auth.register(password, email)
      .then((res) => {
        console.log(res)
        setInfoTooltipMessage(true)
        setIsInfoTooltipOpen(true)
        // history.push('/sign-in')
        navigate('/sign-in');
      })
      .catch((err) => {
        console.log(err)
        setInfoTooltipMessage(false)
        setIsInfoTooltipOpen(true)
      })
  };

  const handleLogIn = (password, email) => {
    console.log('handleLogInhandleLogInhandleLogIn')
    auth.authorize(password, email)
      .then((data) => {
        console.log('!!!!', data.token)
        localStorage.setItem('jwt', data.token);
        setLogedIn(true);
        // history.push('/');
        navigate('/');

      })
      .catch((err) => {
        setInfoTooltipMessage(false)
        setIsInfoTooltipOpen(true)
        console.log(err)
      });
  }

  useEffect(() => {
    api.getProfileInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Submit попапов профиля

  function handleUpdateUser(data) {
    setEditButtonText('Сохранение...')
    api.setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setEditButtonText('Сохранить')
      })
  }

  function handleUpdateAvatar(data) {
    setAvatarButtonText('Сохранение...')
    api.setUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setAvatarButtonText('Сохранить')
      })
  }

  // Карточки

  React.useEffect(() => {

    api.getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleDeleteClick = (card) => {
    setDeleteCard(card)
  }

  function handleCardLike(card) {

    const isLiked = card.likes.some(element => element._id === currentUser._id);

    const changeLike = (newCard) => {
      const newCards = cards.map((item) => item._id === card._id ? newCard : item);
      setCards(newCards);
    }

    if (!isLiked) {
      api.setLike(card._id)
        .then((newCard) => {
          changeLike(newCard)
        })
        .catch((err) => {
          console.log(err);
        })
    }
    else {
      api.deleteLike(card._id)
        .then((newCard) => {
          changeLike(newCard)
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  function handleCardDelete(deletedCard) {
    setDelButtonText('Удаление...')
    api.deleteItem(deletedCard._id)
      .then(() => {
        const newCards = cards.filter((item) => item !== deletedCard);
        setCards(newCards);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setDelButtonText('Да')
      })
  }

  // Submit добавления карточки

  function handleAddPlaceSubmit(newCard) {
    setPlaceButtonText('Сохранение...')
    api.postItem(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPlaceButtonText('Создать')
      })
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={logedIn}
          logIn={isLogIn}
          userEmail={userEmail}
        />
        {/* Не рендерит Main */}
        <Routes>
          <Route path="/sign-in" element={
            <Login
              title='Вход'
              buttonText='Войти'
              name='login'
              onLogIn={handleLogIn}
            />} />
          <Route path="/sign-up" element={
            <Register
              title='Регистрация'
              buttonText='Зарегистрироваться'
              name='register'
              onRegister={handleRegistration}
            />} />

          <Route exact path='/' element={
            <ProtectedRoute
              loggedIn={logedIn}
              path="/"
              component={
                <Main
                  loggedIn={logedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              }
            />
          } />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonText={editButtonText}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonText={avatarButtonText}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonText={placeButtonText}
        />

        <DeletePlacePopup
          onClose={closeAllPopups}
          card={deleteCard}
          onCardDelete={handleDeleteClick}
          buttonText={delButtonText}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          // onCardClick={handleCardClick}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          state={infoTooltipState}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
