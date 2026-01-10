import React, { useState } from 'react';
import MagneticButton from './MagneticButton';

type FormField = 'name' | 'phone' | 'email' | 'subject';

interface FormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    subject: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [touched, setTouched] = useState<Partial<Record<FormField, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validate = (name: FormField, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Wymagane';
        if (value.trim().length < 3) return 'Min. 3 znaki';
        return '';
      case 'phone':
        if (!value.trim()) return 'Wymagane';
        if (!/^[+]?[\d\s-]{9,}$/.test(value)) return 'Błędny format';
        return '';
      case 'email':
        if (!value.trim()) return 'Wymagane';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Błędny email';
        return '';
      case 'subject':
        if (!value.trim()) return 'Wymagane';
        if (value.trim().length < 3) return 'Min. 3 znaki';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name as FormField]) {
      const error = validate(name as FormField, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validate(name as FormField, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Partial<FormData> = {};
    let isValid = true;
    
    (Object.keys(formData) as FormField[]).forEach(key => {
        const error = validate(key, formData[key]);
        if (error) {
            newErrors[key] = error;
            isValid = false;
        }
    });

    setErrors(newErrors);
    setTouched({ name: true, phone: true, email: true, subject: true });

    if (isValid) {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ name: '', phone: '', email: '', subject: '' });
        setTouched({});
        setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const getInputClass = (name: FormField) => {
    const base = "w-full p-[20px] bg-transparent border-b font-inherit outline-none transition-all duration-500 ease-custom";
    const isError = touched[name] && errors[name];
    const isValid = touched[name] && !errors[name] && formData[name];
    
    if (isError) return `${base} border-red-500 bg-red-500/[0.02] text-red-900 placeholder-red-300/50 focus:bg-red-500/[0.05]`;
    if (isValid) return `${base} border-green-500/40 bg-green-500/[0.01] text-text-dark focus:border-green-600 focus:bg-accent/[0.04]`;
    
    return `${base} border-black/10 focus:border-accent focus:bg-accent/[0.07] text-text-dark`;
  };

  return (
    <section id="contact" className="py-[100px] bg-white border-b border-black/10">
      <div className="w-[min(1120px,90%)] mx-auto">
        <div className="bg-bg-light p-[40px] md:p-[60px] rounded-[40px] text-center max-w-[900px] mx-auto relative overflow-hidden shadow-sm border border-black/[0.03]">
          
          <div className="mb-12">
            <div className="font-mono text-accent text-[10px] md:text-xs tracking-[0.5em] uppercase mb-4">Kontakt</div>
            <h2 className="font-display text-[clamp(28px,4vw,42px)] uppercase transition-opacity duration-300" style={{ opacity: submitStatus === 'success' ? 0 : 1 }}>
              Brief Strategiczny
            </h2>
          </div>

          {submitStatus === 'success' ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-light animate-[fadeIn_0.5s_ease-out] z-20">
              <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6 text-green-600">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="font-display text-2xl uppercase mb-3">Wiadomość wysłana</h3>
              <p className="text-text-dark/40 font-mono text-[11px] uppercase tracking-widest">Skontaktujemy się w ciągu 24h.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full relative z-10" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 mb-10">
                <div className="relative text-left">
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Imię i Nazwisko" 
                    className={getInputClass('name')}
                  />
                  {touched.name && errors.name && (
                    <span className="absolute left-0 -bottom-6 text-[9px] text-red-500 font-mono tracking-wider uppercase animate-[fadeIn_0.3s_ease-out] font-bold">{errors.name}</span>
                  )}
                </div>

                <div className="relative text-left">
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Numer Telefonu" 
                    className={getInputClass('phone')}
                  />
                   {touched.phone && errors.phone && (
                    <span className="absolute left-0 -bottom-6 text-[9px] text-red-500 font-mono tracking-wider uppercase animate-[fadeIn_0.3s_ease-out] font-bold">{errors.phone}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 mb-10">
                <div className="relative text-left">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Adres E-mail" 
                    className={getInputClass('email')}
                  />
                   {touched.email && errors.email && (
                    <span className="absolute left-0 -bottom-6 text-[9px] text-red-500 font-mono tracking-wider uppercase animate-[fadeIn_0.3s_ease-out] font-bold">{errors.email}</span>
                  )}
                </div>

                <div className="relative text-left">
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Temat Konsultacji" 
                    className={getInputClass('subject')}
                  />
                   {touched.subject && errors.subject && (
                    <span className="absolute left-0 -bottom-6 text-[9px] text-red-500 font-mono tracking-wider uppercase animate-[fadeIn_0.3s_ease-out] font-bold">{errors.subject}</span>
                  )}
                </div>
              </div>

              <div className="mt-16 flex flex-col items-center gap-6">
                  <MagneticButton className={`bg-text-dark text-white hover:bg-accent hover:text-white border-none px-16 shadow-xl shadow-black/5 ${isSubmitting ? 'opacity-80 cursor-wait' : ''}`}>
                    {isSubmitting ? 'Przetwarzanie...' : 'Wyślij zapytanie'}
                  </MagneticButton>
                  <p className="font-mono text-[9px] text-text-dark/30 uppercase tracking-[0.2em]">
                    Bezpieczeństwo danych gwarantowane polityką prywatności MTG
                  </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;