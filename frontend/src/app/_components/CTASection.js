'use client';

import { useState } from 'react';
import Button from './Button';

export default function CTASection({ spacing }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission - placeholder for now
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className={spacing}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2 text-neutral-900 mb-300 md:mb-400">
          Ready to Transform Your Data Strategy?
        </h2>
        <p className="text-4 text-neutral-400 mb-600 md:mb-800 max-w-2xl mx-auto">
          Let's discuss how we can automate your data processes, build scalable
          solutions, and deliver measurable ROI for your business.
        </p>

        {/* Primary and Secondary CTAs */}
        <div className="flex flex-col md:flex-row gap-300 md:gap-400 justify-center mb-800">
          <Button href="/contact" variant="dark">
            Get Started
          </Button>
          <Button href="/projects" variant="primary">
            View Case Studies
          </Button>
        </div>
      </div>
    </section>
  );
}
