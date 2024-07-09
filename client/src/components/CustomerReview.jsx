import { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  const [disabled, setDisabled] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    display: false,
    message: '',
    type: '',
  });
  
  const toggleAlert = (message, type) => {
    setAlertInfo({ display: true, message, type });
    setTimeout(() => {
      setAlertInfo({ display: false, message: '', type: '' });
    }, 5000);
  };
  
  const onSubmit = async (data) => {
    const { name, email, subject, message } = data;
    try {
      setDisabled(true);
      const templateParams = {
        name,
        email,
        subject,
        message
      };
      await emailjs.send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_USER_ID
      );
      toggleAlert('Form submission was successful!', 'success');
    } catch (e) {
      console.error(e);
      toggleAlert('Uh oh. Something went wrong.', 'danger');
    } finally {
      setDisabled(false);
      reset();
    }
  };

  return (
    <div className='ContactForm' style={{width:"80vw"}}>
      <div className='container mt-5'>
        <h1 style={{textAlign:"center"}}>Customer Review</h1>
        <div className='row' style={{marginTop:"20px"}}>
          <div className='col' >
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGMORomQmZw9_zLwDpIdi-p46jQBOJyGkrpg&s'
              alt='Contact Us'
              className='img-fluid'
              style={{ height: '100%', objectFit: 'contain',margin:"0px" }}
            />
          </div>
          <div className='col'>
            <div className='card shadow-lg'>
              <div className='card-header bg-primary text-white text-center'>
                <h2>Your Review</h2>
              </div>
              <div className='card-body'>
                <form id='contact-form' onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className='form-group mb-3'>
                    <label htmlFor='name'>Name</label>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      {...register('name', {
                        required: { value: true, message: 'Please enter your name' },
                        maxLength: {
                          value: 30,
                          message: 'Please use 30 characters or less'
                        }
                      })}
                      className='form-control'
                      placeholder='Name'
                      disabled={disabled}
                    />
                    {errors.name && <small className='text-danger'>{errors.name.message}</small>}
                  </div>
                  <div className='form-group mb-3'>
                    <label htmlFor='email'>Email address</label>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      {...register('email', {
                        required: true,
                        pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                      })}
                      className='form-control'
                      placeholder='Email address'
                      disabled={disabled}
                    />
                    {errors.email && <small className='text-danger'>Please enter a valid email address</small>}
                  </div>
                  <div className='form-group mb-3'>
                    <label htmlFor='subject'>Subject</label>
                    <input
                      type='text'
                      name='subject'
                      id='subject'
                      {...register('subject', {
                        required: { value: true, message: 'Please enter a subject' },
                        maxLength: {
                          value: 75,
                          message: 'Subject cannot exceed 75 characters'
                        }
                      })}
                      className='form-control'
                      placeholder='Subject'
                      disabled={disabled}
                    />
                    {errors.subject && <small className='text-danger'>{errors.subject.message}</small>}
                  </div>
                  <div className='form-group mb-3'>
                    <label htmlFor='message'>Message</label>
                    <textarea
                      rows={3}
                      name='message'
                      id='message'
                      {...register('message', {
                        required: true
                      })}
                      className='form-control'
                      placeholder='Message'
                      disabled={disabled}
                    ></textarea>
                    {errors.message && <small className='text-danger'>Please enter a message</small>}
                  </div>
                  <div className='d-grid'>
                    <button className='btn btn-primary' type='submit' disabled={disabled}>
                      {disabled ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {alertInfo.display && (
          <div className={`alert alert-${alertInfo.type} alert-dismissible mt-3`} role='alert'>
            {alertInfo.message}
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='alert'
              aria-label='Close'
              onClick={() => setAlertInfo({ display: false, message: '', type: '' })}
            ></button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
