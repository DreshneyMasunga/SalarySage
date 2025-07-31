'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit } from 'lucide-react';

export function PlaceholderCard() {
  return (
    <Card className="shadow-lg border-2 border-dashed border-input rounded-xl h-full flex flex-col justify-center items-center text-center animate-in fade-in-50 duration-500">
      <CardHeader>
        <div className="flex justify-center items-center mb-4">
          <div className="p-4 bg-accent/10 rounded-full">
            <BrainCircuit className="h-12 w-12 text-accent" />
          </div>
        </div>
        <CardTitle className="font-headline text-2xl tracking-tight">
          Your Salary Estimate Awaits
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground max-w-sm">
          Fill out the form to the left, and our AI will analyze your profile to
          provide a detailed salary estimation. See what you should be earning
          in today&apos;s market.
        </p>
      </CardContent>
    </Card>
  );
}
