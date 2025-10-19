'use client';

import { useState } from 'react';

const SERVICE_OPTIONS = [
  { value: 'data_analytics', label: 'Data Analytics' },
  { value: 'software_development', label: 'Software Development' },
  { value: 'data_engineering', label: 'Data Engineering' },
  { value: 'technical_consulting', label: 'Technical Consulting' },
];

const BUDGET_OPTIONS = [
  { value: 'under_10k', label: 'Under $10K' },
  { value: '10k_25k', label: '$10K-$25K' },
  { value: '25k_50k', label: '$25K-$50K' },
  { value: '50k_100k', label: '$50K-$100K' },
  { value: 'over_100k', label: '$100K+' },
  { value: 'not_determined', label: 'Not yet determined' },
];

const TIMELINE_OPTIONS = [
  { value: 'immediate', label: 'Immediate (within 1 month)' },
  { value: '1_3_months', label: '1-3 months' },
  { value: '3_6_months', label: '3-6 months' },
  { value: '6_plus_months', label: '6+ months' },
  { value: 'exploratory', label: 'Exploratory' },
];

const PRIORITY_OPTIONS = [
  { value: 'high', label: 'High priority' },
  { value: 'medium', label: 'Medium priority' },
  { value: 'low', label: 'Low priority' },
];

const CONTACT_METHOD_OPTIONS = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'either', label: 'Either' },
];

const COMPANY_SIZE_OPTIONS = [
  { value: 'solo', label: 'Solo/Individual' },
  { value: '2_10', label: '2-10 employees' },
  { value: '11_50', label: '11-50 employees' },
  { value: '51_200', label: '51-200 employees' },
  { value: '201_1000', label: '201-1,000 employees' },
  { value: '1000_plus', label: '1,000+ employees' },
];

const ROLE_OPTIONS = [
  { value: 'founder_ceo', label: 'Founder/CEO' },
  { value: 'cto_vp_eng', label: 'CTO/VP Engineering' },
  { value: 'director', label: 'Director' },
  { value: 'manager', label: 'Manager' },
  { value: 'analyst', label: 'Analyst' },
  { value: 'consultant', label: 'Consultant' },
  { value: 'other', label: 'Other' },
];

const INDUSTRY_OPTIONS = [
  { value: 'technology', label: 'Technology/Software' },
  { value: 'finance', label: 'Finance/Banking' },
  { value: 'healthcare', label: 'Healthcare/Medical' },
  { value: 'ecommerce', label: 'E-commerce/Retail' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'marketing', label: 'Marketing/Advertising' },
  { value: 'education', label: 'Education' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'logistics', label: 'Logistics/Supply Chain' },
  { value: 'energy', label: 'Energy/Utilities' },
  { value: 'nonprofit', label: 'Non-profit' },
  { value: 'government', label: 'Government' },
  { value: 'other', label: 'Other' },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    preferred_contact_method: '',
    company_size: '',
    role: '',
    industry: '',
    services_interested: [],
    project_goals: '',
    current_situation: '',
    budget_range: '',
    timeline: '',
    priority_level: '',
    referral_source: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      services_interested: checked
        ? [...prev.services_interested, value]
        : prev.services_interested.filter(s => s !== value)
    }));
    if (errors.services_interested) {
      setErrors(prev => ({
        ...prev,
        services_interested: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.services_interested.length === 0) {
      newErrors.services_interested = 'Please select at least one service';
    }

    if (!formData.budget_range) {
      newErrors.budget_range = 'Please select a budget range';
    }

    if (!formData.timeline) {
      newErrors.timeline = 'Please select a timeline';
    }

    if (!formData.project_goals.trim()) {
      newErrors.project_goals = 'Project goals are required';
    }

    if (!formData.referral_source.trim()) {
      newErrors.referral_source = 'Please let us know how you found me';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/submit/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          preferred_contact_method: '',
          company_size: '',
          role: '',
          industry: '',
          services_interested: [],
          project_goals: '',
          current_situation: '',
          budget_range: '',
          timeline: '',
          priority_level: '',
          referral_source: '',
        });
        setErrors({});
      } else {
        setSubmitStatus('error');
        if (data.errors) {
          setErrors(data.errors);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-300 py-200 border-2 border-neutral-200 rounded-8 text-5 text-neutral-900 focus:outline-none focus:border-brand-blue-500 transition-colors";
  const selectClasses = "w-full pl-300 pr-800 py-200 border-2 border-neutral-200 rounded-8 text-neutral-900 focus:outline-none focus:border-brand-blue-500 transition-colors text-[16px] leading-[150%] font-normal";
  const labelClasses = "block text-5 text-neutral-900 mb-100";
  const errorClasses = "text-5 text-brand-red-500 mt-100";

  return (
    <form onSubmit={handleSubmit} className="max-w-[800px] mx-auto">
      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="mb-600 p-400 bg-brand-cyan-500 bg-opacity-10 border-2 border-brand-cyan-500 rounded-8">
          <h3 className="text-3 text-neutral-900 mb-200">Thank you for reaching out!</h3>
          <p className="text-4 text-neutral-400">
            I've received your inquiry and will get back to you within 24 hours.
          </p>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && !Object.keys(errors).length && (
        <div className="mb-600 p-400 bg-brand-red-500 bg-opacity-10 border-2 border-brand-red-500 rounded-8">
          <h3 className="text-3 text-neutral-900 mb-200">Something went wrong</h3>
          <p className="text-4 text-neutral-400">
            Please try again or email me directly
          </p>
        </div>
      )}

      {/* Contact Information */}
      <div className="mb-600">
        <h3 className="text-3 text-neutral-900 mb-400">Contact Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-400 mb-400">
          <div>
            <label htmlFor="name" className={labelClasses}>
              Full Name <span className="text-brand-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClasses}
              placeholder="John Doe"
              disabled={isSubmitting}
            />
            {errors.name && <p className={errorClasses}>{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className={labelClasses}>
              Email Address <span className="text-brand-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
              placeholder="john@company.com"
              disabled={isSubmitting}
            />
            {errors.email && <p className={errorClasses}>{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-400 mb-400">
          <div>
            <label htmlFor="phone" className={labelClasses}>
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClasses}
              placeholder="+1 (555) 123-4567"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="preferred_contact_method" className={labelClasses}>
              Preferred Contact Method
            </label>
            <select
              id="preferred_contact_method"
              name="preferred_contact_method"
              value={formData.preferred_contact_method}
              onChange={handleChange}
              className={selectClasses}
              disabled={isSubmitting}
            >
              <option value="">Select preference</option>
              {CONTACT_METHOD_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Company/Role Information */}
      <div className="mb-600">
        <h3 className="text-3 text-neutral-900 mb-400">Company & Role</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-400 mb-400">
          <div>
            <label htmlFor="company" className={labelClasses}>
              Company/Organization
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Acme Corp"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="company_size" className={labelClasses}>
              Company Size
            </label>
            <select
              id="company_size"
              name="company_size"
              value={formData.company_size}
              onChange={handleChange}
              className={selectClasses}
              disabled={isSubmitting}
            >
              <option value="">Select size</option>
              {COMPANY_SIZE_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-400 mb-400">
          <div>
            <label htmlFor="role" className={labelClasses}>
              Your Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={selectClasses}
              disabled={isSubmitting}
            >
              <option value="">Select role</option>
              {ROLE_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="industry" className={labelClasses}>
              Industry/Sector
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className={selectClasses}
              disabled={isSubmitting}
            >
              <option value="">Select industry</option>
              {INDUSTRY_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="mb-600">
        <h3 className="text-3 text-neutral-900 mb-400">Project Details</h3>

        {/* Services Interested - Checkboxes */}
        <div className="mb-400">
          <label className={labelClasses}>
            Services Interested <span className="text-brand-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-200">
            {SERVICE_OPTIONS.map(service => (
              <label key={service.value} className="flex items-center gap-200 cursor-pointer">
                <input
                  type="checkbox"
                  value={service.value}
                  checked={formData.services_interested.includes(service.value)}
                  onChange={handleCheckboxChange}
                  className="w-[20px] h-[20px] text-brand-blue-500 border-2 border-neutral-200 rounded focus:ring-brand-blue-500"
                  disabled={isSubmitting}
                />
                <span className="text-4 text-neutral-900">{service.label}</span>
              </label>
            ))}
          </div>
          {errors.services_interested && <p className={errorClasses}>{errors.services_interested}</p>}
        </div>

        {/* Project Goals */}
        <div className="mb-400">
          <label htmlFor="project_goals" className={labelClasses}>
            Project Goals <span className="text-brand-red-500">*</span>
          </label>
          <textarea
            id="project_goals"
            name="project_goals"
            value={formData.project_goals}
            onChange={handleChange}
            rows="6"
            className={inputClasses}
            placeholder="Describe the business problem you're trying to solve and what success looks like"
            disabled={isSubmitting}
            maxLength="500"
          />
          {errors.project_goals && <p className={errorClasses}>{errors.project_goals}</p>}
        </div>

        {/* Current Situation */}
        <div className="mb-400">
          <label htmlFor="current_situation" className={labelClasses}>
            Current Situation
          </label>
          <textarea
            id="current_situation"
            name="current_situation"
            value={formData.current_situation}
            onChange={handleChange}
            rows="5"
            className={inputClasses}
            placeholder=" What tools or systems are you currently using?"
            disabled={isSubmitting}
            maxLength="500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-400 mb-400">
          <div>
            <label htmlFor="budget_range" className={labelClasses}>
              Budget Range <span className="text-brand-red-500">*</span>
            </label>
            <select
              id="budget_range"
              name="budget_range"
              value={formData.budget_range}
              onChange={handleChange}
              className={selectClasses}
              disabled={isSubmitting}
            >
              <option value="">Select budget</option>
              {BUDGET_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.budget_range && <p className={errorClasses}>{errors.budget_range}</p>}
          </div>

          <div>
            <label htmlFor="timeline" className={labelClasses}>
              Timeline <span className="text-brand-red-500">*</span>
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className={selectClasses}
              disabled={isSubmitting}
            >
              <option value="">Select timeline</option>
              {TIMELINE_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.timeline && <p className={errorClasses}>{errors.timeline}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-400 mb-400">
          <div>
            <label htmlFor="priority_level" className={labelClasses}>
              Priority Level
            </label>
            <select
              id="priority_level"
              name="priority_level"
              value={formData.priority_level}
              onChange={handleChange}
              className={selectClasses}
              disabled={isSubmitting}
            >
              <option value="">Select priority</option>
              {PRIORITY_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="referral_source" className={labelClasses}>
              How did you hear about me? <span className="text-brand-red-500">*</span>
            </label>
            <input
              type="text"
              id="referral_source"
              name="referral_source"
              value={formData.referral_source}
              onChange={handleChange}
              className={inputClasses}
              placeholder="e.g., LinkedIn, Google, Referral"
              disabled={isSubmitting}
            />
            {errors.referral_source && <p className={errorClasses}>{errors.referral_source}</p>}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full md:w-auto px-600 py-200 bg-brand-blue-500 text-neutral-0 text-5 rounded-full hover:bg-brand-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          isSubmitting ? 'cursor-wait' : ''
        }`}
      >
        {isSubmitting ? 'Sending...' : 'Send Inquiry'}
      </button>
    </form>
  );
}
