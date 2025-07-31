import { SalaryEstimator } from '@/components/salary-estimator';
import { ThemeToggle } from '@/components/theme-toggle';
import { BrainCircuit } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BrainCircuit className="h-8 w-8 text-accent" />
              <h1 className="text-3xl sm:text-4xl font-headline font-bold text-foreground">
                Salary Sage
              </h1>
            </div>
            <ThemeToggle />
          </div>
        <p className="text-muted-foreground mt-2 text-base sm:text-lg">
          How much should you get paid? Let our AI analyze your CV and location to find out.
        </p>
      </header>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SalaryEstimator />
      </main>
      <footer className="text-center py-6 px-4 text-sm text-muted-foreground">
        <p>
          website by{' '}
          <a
            href="https://github.com/DreshneyMasunga"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            PaleTech
          </a>
          . all rights reserved,
        </p>
      </footer>
    </div>
  );
}
