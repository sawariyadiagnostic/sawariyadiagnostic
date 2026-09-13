import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './button';

interface SectionErrorBoundaryProps {
  children: React.ReactNode;
}

interface SectionErrorBoundaryState {
  hasError: boolean;
}

export class SectionErrorBoundary extends React.Component<SectionErrorBoundaryProps, SectionErrorBoundaryState> {
  state: SectionErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): SectionErrorBoundaryState {
    return { hasError: true };
  }

  handleRetry = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <section className="mx-auto my-8 w-[min(100%-2rem,48rem)] rounded-[24px] border border-slate-200 bg-white p-6 text-center shadow-sm" role="alert">
        <AlertTriangle className="mx-auto mb-3 h-7 w-7 text-[#7A4B2A]" aria-hidden="true" />
        <h2 className="text-lg font-bold text-slate-900">This section could not load</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
          The rest of the website is still available. Reload to try this section again, or contact the lab directly.
        </p>
        <Button type="button" variant="outline" className="mt-4" onClick={this.handleRetry}>
          <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
          Reload section
        </Button>
      </section>
    );
  }
}
