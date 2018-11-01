import React from 'react';
import { reduxForm } from 'redux-form';

export const validateLogin = values => {
  const errors = {};
  if (!values.email) {
    errors.email = `Email is a required field.`;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = `Invalid email format.`
  }
  if (!values.password) {
    errors.password = `Password is a required field.`;
  }
  return errors;
}

export const validateSignup = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = `First name is a required field.`;
  }
  if (!values.lastName) {
    errors.lastName = `Last name is a required field.`;
  }
  if (!values.email) {
    errors.email = `Email is a required field.`;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = `Invalid email format.`
  }
  if (!values.password) {
    errors.password = `Password is a required field.`;
  }
  return errors;
}

export const validateQuestion = values => {
  const errors = {};
  if (!values.title) {
    errors.title = `Title is a required field.`;
  }
  return errors;
}

export const validateFeedback = values => {
  const errors = {};
  if (!values.rating) {
    errors.rating = `Rating is a required field.`;
  }
  return errors;
}

export default props => {
  const {
    input, label, type, name, helpText,
    meta: { dirty, touched, error, valid, visited },
    ...extraProps
  } = props;

  const getValidateClassNames = (touched, error) => {
    if (touched && error) return 'is-danger';
    if (touched && !error && dirty) return 'is-success';
    return '';
  };

  const getFieldIcon = () => {
    const FAS = 'fas';
    if (touched && error) return `${FAS} fa-exclamation-triangle`;
    if (touched && !error && dirty) return `${FAS} fa-check`;
    return '';
  }

  if (type === 'select') {
    return (
      <div className="field">
        <label htmlFor={name} className="label">
          {label}
        </label>
        <div className="control">
          <div className="select">
            <select
              name={input.name}
              onChange={input.onChange}
              onBlur={() => input.onBlur(input.value)}
            >
              <option value="placeholder">Select...</option>
              {extraProps.options.map(opt => (
                <option
                  key={opt.id}
                  value={opt.id}
                >
                  {opt.name}
                </option>
              ))}
            </select>
          </div>
          {touched && error && <p className="help is-danger">{error}</p>}
        </div>
        {helpText && <p className="help">{helpText}</p>}
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div className="field">
        <label htmlFor={name} className="label">
          {label}
        </label>
        <div className="control has-icons-right">
          <textarea
            {...input}
            placeholder={extraProps.placeholder}
            className={`textarea ${getValidateClassNames(touched, error)}`}
          />
          <span className="icon is-small is-right">
            <i className={`${getFieldIcon()}`} />
          </span>
          {touched && error && <p className="help is-danger">{error}</p>}
        </div>
        {helpText && <p className="help">{helpText}</p>}
      </div>
    );
  }

  if (type === 'number') {
    return (
      <div className="field">
        <label htmlFor={name} className="label">
          {label}
        </label>
        <div className="control has-icons-right">
          <input
            {...input}
            type="number"
            min={extraProps.min}
            max={extraProps.max}
            step={extraProps.step}
            placeholder={extraProps.placeholder}
            className={`input ${getValidateClassNames(touched, error)}`}
          />
          {valid &&
            visited && (
              <span className="icon is-small is-right">
                <i className="fas fa-check" />
              </span>
            )}
          {touched && error && <p className="help is-danger">{error}</p>}
        </div>
        {helpText && <p className="help">{helpText}</p>}
      </div>
    );
  }

  if (type === 'switch') {
    return (
      <div className="field">
        <label className="label">{label}</label>
        <input
          id={name}
          name={name}
          type="checkbox"
          className="switch is-rounded"
        />
        <label htmlFor={name}>{extraProps.switchLabel}</label>
        {helpText && <p className="help">{helpText}</p>}
      </div>
    );
  }

  return (
    <div className="field">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <div>
        <div className="control has-icons-right">
          <input
            {...input}
            type={type}
            className={`input ${getValidateClassNames(touched, error)}`}
            placeholder={extraProps.placeholder}
          />
          <span className="icon is-small is-right">
            <i
              className={`${getFieldIcon()}`}
            />
          </span>
        </div>
        {touched && error && <p className="help is-danger">{error}</p>}
      </div>
      {helpText && <p className="help">{helpText}</p>}
    </div>
  );
};
