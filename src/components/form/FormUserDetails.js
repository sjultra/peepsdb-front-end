import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { Wrapper, PrimaryHeading, FormControl, BtnNext } from './FormResources';

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
`;

const Required = styled.div`
  span {
    color: #ff0000;
  }
`;

const FormUserDetails = ({
  nextStep,
  onChange,
  formData,
  loading,
  profile,
}) => {
  const dispatch = useDispatch();

  const {
    firstname,
    lastname,
    alias,
    skypeId,
    googleGmailId,
    appleEmailId,
    phone,
  } = formData;

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const proceed = (e) => {
    e.preventDefault();
    if (
      firstname.trim() === '' ||
      lastname.trim() === '' ||
      googleGmailId.trim() === '' ||
      phone === ''
    ) {
      dispatch(setAlert('Please fill required fields', 'error'));
    } else if (!validateEmail(googleGmailId)) {
      dispatch(setAlert('Invalid email', 'error'));
    } else if (!googleGmailId.endsWith('@gmail.com')) {
      dispatch(setAlert('Gmail address please', 'error'));
    } else {
      nextStep();
    }
  };

  const headingText =
    loading || !profile ? (
      <span className='text-primary'>Registration</span>
    ) : (
      <Fragment>
        <span className='text-primary'>Edit </span> Profile
      </Fragment>
    );

  return (
    <Wrapper>
      <PrimaryHeading className='text-center '>{headingText}</PrimaryHeading>
      <Required>
        required<span> * </span>
      </Required>
      <FormControl>
        <label htmlFor='firstname'>
          Firstname <span>*</span>
        </label>
        <input
          type='text'
          name='firstname'
          value={firstname}
          onChange={(e) => onChange(e)}
        />
      </FormControl>
      <FormControl>
        <label htmlFor='lastname'>
          Lastname <span>*</span>
        </label>
        <input
          type='text'
          name='lastname'
          value={lastname}
          onChange={(e) => onChange(e)}
        />
      </FormControl>
      <FormControl>
        <label htmlFor='alias'>Alias</label>
        <input
          type='text'
          name='alias'
          value={alias}
          onChange={(e) => onChange(e)}
        />
      </FormControl>
      <FormControl>
        <label htmlFor='skypeId'>SkypeId</label>
        <input
          type='text'
          name='skypeId'
          value={skypeId}
          onChange={(e) => onChange(e)}
        />
      </FormControl>
      <FormControl>
        <label htmlFor='googleGmailId'>
          Google Gmail Id <span>*</span>
        </label>
        <input
          type='email'
          name='googleGmailId'
          value={googleGmailId}
          onChange={(e) => onChange(e)}
        />
      </FormControl>
      <FormControl>
        <label htmlFor='appleEmailId'>Apple Email Id</label>
        <input
          type='email'
          name='appleEmailId'
          value={appleEmailId}
          onChange={(e) => onChange(e)}
        />
      </FormControl>
      <FormControl>
        <label htmlFor='phone'>
          Phone <span>*</span>
        </label>
        <input
          type='number'
          name='phone'
          value={phone}
          onChange={(e) => onChange(e)}
        />
      </FormControl>
      <BtnWrapper>
        <BtnNext onClick={(e) => proceed(e)}>Next</BtnNext>
      </BtnWrapper>
    </Wrapper>
  );
};

export default FormUserDetails;
