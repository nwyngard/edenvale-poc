import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { IoSend } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from './Button';
import './Contact.css';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const thankYouRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const markerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      if (thankYouRef.current) {
        thankYouRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // 👇 Use IntersectionObserver to detect when the bottom of the screen is reached
  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsAtBottom(entry.isIntersecting),
      {
        root: null,
        threshold: 1.0,
      }
    );

    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="contact-section">
      <div className="contact-container">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <Motion.div
              key="initial-text"
              className="contact-text"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="contact-heading">Schedule a tour at Edenvale.</h2>
              <div className={`contact-body-wrapper ${isAtBottom ? 'fade-mask' : ''}`}>
                <p className="contact-body">
                  Units are going quickly!
                  <br />
                  Enter your details to schedule a viewing time.
                </p>
              </div>
            </Motion.div>
          ) : (
            <Motion.div
              ref={thankYouRef}
              key="thankyou-text"
              className="contact-text"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 40 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <h2 className="contact-heading">Thank You</h2>
              <div className={`contact-body-wrapper ${isAtBottom ? 'fade-mask' : ''}`}>
                <p className="contact-body">
                  We've received your request.
                  <br />
                  A team member will be in contact to confirm your viewing time.
                </p>
              </div>
            </Motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!submitted && (
            <Motion.form
              key="form"
              className="contact-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <input type="text" name="name" placeholder="Name" required />
              <input type="email" name="email" placeholder="Email" required />
              <input type="tel" name="phone" placeholder="Phone (optional)" />
              <div className="datepicker-wrapper">
                <FaRegCalendarAlt className="calendar-icon" />
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText="Preferred Tour Date"
                  className="contact-datepicker"
                  calendarClassName="custom-datepicker"
                  dateFormat="dd MMMM yyyy"
                  popperPlacement="bottom-start"
                  showPopperArrow={true}
                  required
                />
              </div>
              <Button type="submit" variant="primary" size="md">
                SUBMIT <IoSend style={{ marginLeft: '8px' }} />
              </Button>
            </Motion.form>
          )}
        </AnimatePresence>

        {/* Invisible marker triggers fade when visible */}
        <div ref={markerRef} style={{ height: '1px', marginTop: '80px' }} />
      </div>
    </section>
  );
};

export default Contact;