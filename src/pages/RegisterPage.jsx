import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiUser, FiMail, FiLock, FiBriefcase, FiUserPlus } from 'react-icons/fi';
import { MdScience } from 'react-icons/md';
import './RegisterPage.css';

const validationSchema = Yup.object({
  name: Yup.string().min(2, 'Too short').max(100, 'Too long').required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
  role: Yup.string().oneOf(['Student', 'Startup', 'Institution']).required('Select a role'),
  institution: Yup.string().required('Institution/Organization is required')
});

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    setError('');
    try {
      await register(values);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page" id="register-page">
      <div className="auth-container" style={{ maxWidth: 520 }}>
        <div className="auth-card glass-card">
          <div className="auth-header">
            <div className="auth-logo">
              <div className="navbar-logo-icon">
                <MdScience size={24} />
              </div>
            </div>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join EquipNet India to access research equipment</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <Formik
            initialValues={{
              name: '', email: '', password: '', confirmPassword: '', role: 'Student', institution: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="auth-form">
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-name">Full Name</label>
                  <div className="auth-input-wrapper">
                    <FiUser className="auth-input-icon" size={18} />
                    <Field name="name" type="text" id="reg-name" className="form-input auth-input" placeholder="Your full name" />
                  </div>
                  <ErrorMessage name="name" component="div" className="form-error" />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="reg-email">Email</label>
                  <div className="auth-input-wrapper">
                    <FiMail className="auth-input-icon" size={18} />
                    <Field name="email" type="email" id="reg-email" className="form-input auth-input" placeholder="you@institution.ac.in" />
                  </div>
                  <ErrorMessage name="email" component="div" className="form-error" />
                </div>

                <div className="register-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-password">Password</label>
                    <div className="auth-input-wrapper">
                      <FiLock className="auth-input-icon" size={18} />
                      <Field name="password" type="password" id="reg-password" className="form-input auth-input" placeholder="Min 6 characters" />
                    </div>
                    <ErrorMessage name="password" component="div" className="form-error" />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-confirm">Confirm Password</label>
                    <div className="auth-input-wrapper">
                      <FiLock className="auth-input-icon" size={18} />
                      <Field name="confirmPassword" type="password" id="reg-confirm" className="form-input auth-input" placeholder="Re-enter password" />
                    </div>
                    <ErrorMessage name="confirmPassword" component="div" className="form-error" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="reg-role">I am a</label>
                  <Field as="select" name="role" id="reg-role" className="form-select">
                    <option value="Student">Student / Researcher</option>
                    <option value="Startup">Startup</option>
                    <option value="Institution">Institution / Lab</option>
                  </Field>
                  <ErrorMessage name="role" component="div" className="form-error" />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="reg-institution">Institution / Organization</label>
                  <div className="auth-input-wrapper">
                    <FiBriefcase className="auth-input-icon" size={18} />
                    <Field name="institution" type="text" id="reg-institution" className="form-input auth-input" placeholder="e.g. IIT Delhi" />
                  </div>
                  <ErrorMessage name="institution" component="div" className="form-error" />
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-full" disabled={isSubmitting} id="register-submit">
                  {isSubmitting ? 'Creating Account...' : <><FiUserPlus size={18} /> Create Account</>}
                </button>
              </Form>
            )}
          </Formik>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
