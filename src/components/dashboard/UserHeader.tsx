
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { User } from '@/context/AuthContext';
import { trainingModules } from '@/data/modules';

interface UserHeaderProps {
  user: User;
  progressPercentage: number;
}

export function UserHeader({ user, progressPercentage }: UserHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-8 gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">Welcome back, {user.name}</h1>
        <p className="text-muted-foreground text-sm sm:text-base">Continue your aseptic process training</p>
      </div>

      <Card className="w-full md:w-auto">
        <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-4">
          <div className="text-center">
            <div className="text-lg sm:text-xl font-bold">{user.progress.totalPoints}</div>
            <div className="text-xs text-muted-foreground">Total Points</div>
          </div>
          <div className="h-10 w-px bg-border"></div>
          <div>
            <div className="flex items-center gap-1 sm:gap-2 mb-1">
              <div className="text-xs sm:text-sm font-medium">Overall Progress</div>
              <div className="ml-auto text-xs sm:text-sm text-muted-foreground">{progressPercentage}%</div>
            </div>
            <Progress value={progressPercentage} className="h-2 w-[120px] sm:w-[180px]" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
