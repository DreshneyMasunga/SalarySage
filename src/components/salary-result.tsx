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
import { DollarSign, FileText, TrendingUp } from 'lucide-react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface SalaryResultProps {
  result: EstimateSalaryOutput;
}

export function SalaryResult({ result }: SalaryResultProps) {
  const confidencePercent = Math.round(result.confidence * 100);

  const [minStr, maxStr] = result.salaryRange.replace(/[^0-9-]/g, "").split("-");
  const minSalary = minStr ? parseInt(minStr, 10) : 0;
  const maxSalary = maxStr ? parseInt(maxStr, 10) : minSalary;
  const avgSalary = (minSalary + maxSalary) / 2;

  const chartData = [
    { name: 'Min', salary: minSalary },
    { name: 'Average', salary: avgSalary },
    { name: 'Max', salary: maxSalary },
  ];

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <Card className="shadow-lg border-2 border-primary/20 rounded-xl overflow-hidden">
        <CardHeader className="bg-primary/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-full">
              <DollarSign className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <CardDescription>Estimated Salary Range</CardDescription>
              <CardTitle className="font-headline text-4xl tracking-tighter">
                {result.salaryRange}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
           <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${(value as number) / 1000}k`}/>
              <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)'
                }}
              />
              <Bar dataKey="salary" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="shadow-md rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Confidence</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{confidencePercent}%</div>
            <p className="text-xs text-muted-foreground">
              Based on the provided data
            </p>
            <Progress value={confidencePercent} className="mt-4" />
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-xl">
           <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Key Factors</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
               {result.reasons}
             </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
