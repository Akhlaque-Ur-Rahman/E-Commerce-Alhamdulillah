import React from 'react';
import { Skeleton } from './ui/skeleton';
import { Card } from './ui/card';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
    </Card>
  );
};
