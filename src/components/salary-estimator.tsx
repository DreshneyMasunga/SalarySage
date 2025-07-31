'use client';

import * as React from 'react';
import { useFormStatus } from 'react-dom';
import { estimateSalaryAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileUp, Loader2, MapPin } from 'lucide-react';
import { SalaryResult } from './salary-result';
import { PlaceholderCard } from './placeholder-card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const initialState = { error: undefined, data: undefined, fieldErrors: {} };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full !h-12 text-base" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing... This may take a moment.
        </>
      ) : (
        'Estimate Salary'
      )}
    </Button>
  );
}

export function SalaryEstimator() {
  const [state, formAction] = React.useActionState(estimateSalaryAction, initialState);
  const [cvFileName, setCvFileName] = React.useState('');
  const { toast } = useToast();
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCvFileName(e.target.files[0].name);
    } else {
      setCvFileName('');
    }
  };

  React.useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
    if(state.data) {
        toast({
            title: 'Success!',
            description: 'Your salary estimation is ready.',
        });
        formRef.current?.reset();
        setCvFileName('');
    }
  }, [state, toast]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      <Card className="shadow-lg border-2 border-accent/20 rounded-xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl tracking-tight">
            Provide Your Details
          </CardTitle>
          <CardDescription>
            Your CV and location help our AI create a personalized and accurate
            salary estimate for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cv">Your CV (.pdf, .txt)</Label>
              <div className="relative">
                <Input
                  id="cv"
                  name="cv"
                  type="file"
                  accept=".txt,.pdf"
                  className="hidden"
                  onChange={handleFileChange}
                  aria-describedby="cv-error"
                />
                <label
                  htmlFor="cv"
                  className={cn(
                    'flex h-12 w-full items-center justify-center rounded-md border-2 border-dashed border-input bg-transparent px-3 py-2 text-sm ring-offset-background cursor-pointer hover:bg-accent/10 transition-colors',
                     state.fieldErrors?.cv && 'border-destructive'
                  )}
                >
                  <FileUp className="w-5 h-5 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">
                    {cvFileName || 'Click to upload a file'}
                  </span>
                </label>
              </div>
              {state.fieldErrors?.cv && (
                <p id="cv-error" className="text-sm font-medium text-destructive">
                  {state.fieldErrors.cv[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Job Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g., San Francisco, CA"
                  className="pl-10 h-12"
                  aria-describedby="location-error"
                />
              </div>
              {state.fieldErrors?.location && (
                <p id="location-error" className="text-sm font-medium text-destructive">
                  {state.fieldErrors.location[0]}
                </p>
              )}
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      <div className="relative mt-8 lg:mt-0">
        {useFormStatus().pending && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm rounded-lg space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">AI is thinking...</p>
          </div>
        )}
        <div className={cn(useFormStatus().pending && "opacity-50")}>
            {state.data ? <SalaryResult result={state.data} /> : <PlaceholderCard />}
        </div>
      </div>
    </div>
  );
}
