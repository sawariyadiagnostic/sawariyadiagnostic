import { MessageCircle } from 'lucide-react';
import { whatsappHref } from '@/config/site';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export function WhatsAppButton({ 
  phoneNumber = '',
  message = 'Hi, I want to book a test at Sawariya Diagnostic.'
}: WhatsAppButtonProps) {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = whatsappHref(message) || (phoneNumber ? `https://wa.me/${phoneNumber}?text=${encodedMessage}` : undefined);
    if (whatsappUrl) window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="whatsapp-float !hidden sm:!flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" fill="white" />
    </button>
  );
}
