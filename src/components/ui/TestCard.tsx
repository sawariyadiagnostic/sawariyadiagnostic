import { Clock, Home, Beaker } from 'lucide-react';
import { Button } from './button';
import type { MedicalTest } from '@/data/mockTests';

interface TestCardProps {
  test: MedicalTest;
  onBook?: (testId: string) => void;
}

export function TestCard({ test, onBook }: TestCardProps) {
  const handleBook = () => {
    if (onBook) {
      onBook(test.id);
    } else {
      const contactSection = document.getElementById('contact');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="group glass-card rounded-2xl p-6 gentle-animation hover:medical-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-accent-teal/10 flex items-center justify-center">
            <Beaker className="w-5 h-5 text-accent-teal" />
          </div>
          {test.popular && (
            <span className="bg-accent-orange/10 text-accent-orange text-xs font-semibold px-2 py-1 rounded-full">
              Popular
            </span>
          )}
        </div>
        {test.homeCollection && (
          <div className="flex items-center gap-1 text-accent-emerald text-xs font-medium">
            <Home className="w-3.5 h-3.5" />
            <span>Home Collection</span>
          </div>
        )}
      </div>
      
      {/* Title & Description */}
      <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-accent-teal gentle-animation">
        {test.name}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {test.description}
      </p>
      
      {/* Parameters Preview */}
      {test.parameters && test.parameters.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2">Includes:</p>
          <div className="flex flex-wrap gap-1">
            {test.parameters.slice(0, 3).map((param) => (
              <span 
                key={param} 
                className="text-xs bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground"
              >
                {param}
              </span>
            ))}
            {test.parameters.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{test.parameters.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
      
      {/* Price & Turnaround */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground">₹{test.price}</span>
          {test.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">₹{test.originalPrice}</span>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span>{test.turnaroundTime}</span>
        </div>
      </div>
      
      {/* Book Button */}
      <Button 
        onClick={handleBook}
        className="w-full btn-primary h-11"
      >
        Book Now
      </Button>
    </div>
  );
}
