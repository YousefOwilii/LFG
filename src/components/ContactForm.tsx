"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  
  const [errors, setErrors] = useState({
    email: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);

  const messageTemplates = {
    whatsapp: "I would love to receive a demo of how a customer WhatsApp agent would work for my company.",
    website: "I'm interested in learning more about your website development services for my business.",
    custom: "I'd like to discuss a custom AI solution tailored to my specific business needs."
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: "",
      message: "",
    };
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }
    
    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const selectTemplate = (template: keyof typeof messageTemplates) => {
    setFormData(prev => ({
      ...prev,
      message: messageTemplates[template]
    }));
    setActiveTemplate(template);
    
    // Clear message error if it exists
    if (errors.message) {
      setErrors(prev => ({
        ...prev,
        message: "",
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");
    
    try {
      // Use Formspree for form submission (works with static sites)
      const response = await fetch('https://formspree.io/f/mvgkrzyk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          message: formData.message,
          template: activeTemplate
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      
      // Reset form after successful submission
      setFormData({
        email: "",
        message: "",
      });
      setActiveTemplate(null);
      
      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
      console.error('Contact form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-[#0D0D0D] bg-opacity-80 rounded-xl p-8 shadow-lg border border-[#00FF41]">
      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-[#00FF41] bg-opacity-20 text-white rounded-lg">
          Thank you for your message! We'll get back to you as soon as possible.
        </div>
      )}
      
      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-[#00FF41] bg-opacity-20 text-white rounded-lg">
          {errorMessage || "There was an error sending your message. Please try again later."}
        </div>
      )}
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-white mb-2">Email</label>
          <input 
            type="email" 
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border ${errors.email ? 'border-[#00FF41]' : 'border-[#00FF41]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FF41] bg-[#0D0D0D] text-white`}
            placeholder="Your email"
          />
          {errors.email && <p className="mt-1 text-[#00FF41] text-sm">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-white mb-2">What service are you interested in?</label>
          <div className="grid grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => selectTemplate('whatsapp')}
              className={`px-4 py-2 rounded-lg border ${activeTemplate === 'whatsapp' ? 'bg-[#00FF41] text-[#0D0D0D] border-[#00FF41]' : 'border-[#00FF41] text-white hover:bg-[#00FF41] hover:bg-opacity-20'} transition`}
            >
              WhatsApp Agent
            </button>
            <button
              type="button"
              onClick={() => selectTemplate('website')}
              className={`px-4 py-2 rounded-lg border ${activeTemplate === 'website' ? 'bg-[#00FF41] text-[#0D0D0D] border-[#00FF41]' : 'border-[#00FF41] text-white hover:bg-[#00FF41] hover:bg-opacity-20'} transition`}
            >
              Website
            </button>
            <button
              type="button"
              onClick={() => selectTemplate('custom')}
              className={`px-4 py-2 rounded-lg border ${activeTemplate === 'custom' ? 'bg-[#00FF41] text-[#0D0D0D] border-[#00FF41]' : 'border-[#00FF41] text-white hover:bg-[#00FF41] hover:bg-opacity-20'} transition`}
            >
              Custom AI
            </button>
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-white mb-2">Message</label>
          <textarea 
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`w-full px-4 py-3 border ${errors.message ? 'border-[#00FF41]' : 'border-[#00FF41]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FF41] bg-[#0D0D0D] text-white`}
            placeholder="Your message"
          ></textarea>
          {errors.message && <p className="mt-1 text-[#00FF41] text-sm">{errors.message}</p>}
        </div>
        <button 
          type="submit" 
          className="w-full px-6 py-3 bg-[#00FF41] hover:bg-opacity-90 text-[#0D0D0D] font-medium rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
} 