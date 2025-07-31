'use client';

import type { EstimateSalaryOutput } from '@/ai/flows/estimate-salary';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { DollarSign, TrendingUp, Handshake, Briefcase, Star, GraduationCap } from 'lucide-react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Button } from './ui/button';

interface SalaryResultProps {
  result: EstimateSalaryOutput;
}

export function SalaryResult({ result }: SalaryResultProps) {
  const confidencePercent = Math.round(result.salary.confidence * 100);

  const { '25th_percentile': minSalary, '50th_percentile_median': avgSalary, '75th_percentile': maxSalary } = result.salary.breakdown;

  const chartData = [
    { name: '25th %ile', salary: minSalary },
    { name: 'Median', salary: avgSalary },
    { name: '75th %ile', salary: maxSalary },
  ];
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: result.salary.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }
  
  const handlePrint = () => {
    window.print();
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <Card className="shadow-lg border-2 border-primary/20 rounded-xl overflow-hidden">
        <CardHeader className="bg-primary/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-full">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardDescription>Estimated Salary Range ({result.salary.currency})</CardDescription>
                <CardTitle className="font-headline text-4xl tracking-tighter">
                  {result.salary.range}
                </CardTitle>
              </div>
            </div>
             <Button onClick={handlePrint} variant="outline" size="sm" className="hidden sm:flex">Print Report</Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
           <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${formatCurrency(value as number).slice(0, -3)}k`}/>
              <Tooltip
                cursor={{ fill: 'hsla(var(--primary), 0.1)' }}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)'
                }}
                 formatter={(value) => [formatCurrency(value as number), 'Salary']}
              />
              <Bar dataKey="salary" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
       <Card className="shadow-md rounded-xl">
        <CardHeader>
           <div className="flex items-center gap-3">
              <Briefcase className="h-6 w-6 text-accent" />
              <CardTitle className="text-xl font-semibold">Market Analysis</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
           <p className="text-muted-foreground mt-2 leading-relaxed">
             {result.analysis.marketSummary}
           </p>
        </CardContent>
      </Card>
      
      <Card className="shadow-md rounded-xl">
        <CardHeader>
           <div className="flex items-center gap-3">
              <Star className="h-6 w-6 text-accent" />
              <CardTitle className="text-xl font-semibold">Candidate Strengths</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
            <div className="flex flex-wrap gap-2 mt-2">
                {result.analysis.candidateStrengths.map((strength, i) => (
                    <Badge key={i} variant="secondary">{strength}</Badge>
                ))}
            </div>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full space-y-4">
        <Card className="shadow-md rounded-xl">
            <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger className="p-6 text-xl font-semibold">
                    <div className="flex items-center gap-3">
                        <GraduationCap className="h-6 w-6 text-accent" />
                        <span>Skill Recommendations</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                    <div className="space-y-4">
                    {result.recommendations.skillImprovement.map((rec, i) => (
                        <div key={i} className="p-4 bg-muted/50 rounded-lg">
                            <p className="font-semibold text-foreground">{rec.skill}</p>
                            <p className="text-sm text-muted-foreground mt-1">{rec.reason}</p>
                        </div>
                    ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Card>
         <Card className="shadow-md rounded-xl">
            <AccordionItem value="item-2" className="border-b-0">
                <AccordionTrigger className="p-6 text-xl font-semibold">
                    <div className="flex items-center gap-3">
                        <Handshake className="h-6 w-6 text-accent" />
                        <span>Negotiation Tips</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                   <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                        {result.recommendations.negotiationTips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                        ))}
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Card>
      </Accordion>

        <Card className="shadow-md rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Confidence Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{confidencePercent}%</div>
            <p className="text-xs text-muted-foreground">
              Based on the provided data and market analysis.
            </p>
            <Progress value={confidencePercent} className="mt-4" />
          </CardContent>
        </Card>
    </div>
  );
}
