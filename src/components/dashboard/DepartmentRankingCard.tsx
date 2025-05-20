
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@/context/AuthContext';

interface DepartmentRankingCardProps {
  user: User;
}

export function DepartmentRankingCard({ user }: DepartmentRankingCardProps) {
  return (
    <Card>
      <CardHeader className="p-3 sm:p-4 pb-2">
        <CardTitle className="text-sm sm:text-base">Department Ranking</CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-amber-500 text-white font-bold h-6 w-6 sm:h-8 sm:w-8 rounded-full flex items-center justify-center text-xs sm:text-base">
              2
            </div>
            <div>
              <p className="font-medium text-xs sm:text-sm">{user.name}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">{user.department}</p>
            </div>
            <div className="ml-auto font-bold text-xs sm:text-sm">{user.progress.totalPoints} pts</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
