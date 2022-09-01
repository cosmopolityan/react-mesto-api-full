function Form(props) {
  const { title, name, buttonText, children, onSubmit, valid, type } = props;

  return (
    <>
      <h2 className={`popup__heading ${type ? `popup__heading_type_${type}` : ''}`}>{title}</h2>
      <form
        className={`popup__form popup__form_type_${name} ${type ? `popup__form_type_${type}` : ''}`}
        name={name}
        onSubmit={onSubmit}
        noValidate>
        {children}
        <button
          type="submit"
          disabled={!valid}
          className={`popup__submit-button popup__submit-button_type_${name} ${valid ? '' : 'popup__submit-button_disabled'} ${type ? 'popup__submit-button_type_login' : ''}`}
        >
          {buttonText}
        </button>
      </form>
    </>
  )
}

export default Form