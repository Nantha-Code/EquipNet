import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import './StaticPages.css';

const faqs = [
  { q: 'What is EquipNet India?', a: 'EquipNet India is a national platform that enables researchers, students, and startups to discover and access research equipment across India\'s premier institutions and laboratories.' },
  { q: 'Who can use this platform?', a: 'Students, researchers, startups, and institutions across India can register and use the platform. Each user type has different access levels and permissions.' },
  { q: 'Is the platform free to use?', a: 'Registration and equipment discovery are free. Equipment usage charges, if any, are determined by the hosting institution and will be communicated during the request approval process.' },
  { q: 'How do I request equipment access?', a: 'Browse the equipment catalog, select the instrument you need, and click "Request Access." Fill in your research purpose and preferred dates, then submit. The hosting institution will review and respond to your request.' },
  { q: 'How long does approval take?', a: 'Most requests are processed within 48-72 hours. Complex or high-demand equipment may take up to 5 working days.' },
  { q: 'Can I cancel a request?', a: 'You can cancel a pending request from your dashboard. Once approved, please contact the hosting institution directly for cancellations.' },
  { q: 'What is the QR code on my dashboard?', a: 'Your QR code contains your EquipNet user information and can be scanned at the equipment facility for quick check-in and identity verification.' },
  { q: 'How can institutions list their equipment?', a: 'Institutions can register for an Institution account and use the "Add Equipment" feature to list their instruments on the platform.' }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="static-page" id="faq-page">
      <div className="static-hero">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about EquipNet India</p>
        </div>
      </div>
      <div className="container static-content">
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item ${openIndex === i ? 'open' : ''}`}>
              <button className="faq-question" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <span>{faq.q}</span>
                <FiChevronDown className="faq-chevron" size={20} />
              </button>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
