
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock } from 'lucide-react';
import { Badge } from '@/data/modules';
import { User } from '@/context/AuthContext';
import { trainingModules } from '@/data/modules';

interface UserStatsCardProps {
  user: User;
  earnedBadgeIds: string[];
  badges: Badge[];
}

export function UserStatsCard({ user, earnedBadgeIds, badges }: UserStatsCardProps) {
  return (
    <Card>
      <CardHeader className="p-3 sm:p-4">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
          Learning Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4">
        <div className="space-y-3 sm:space-y-4">
          <div>
            <div className="text-xs sm:text-sm font-medium mb-1">Points Earned</div>
            <div className="flex items-center justify-between">
              <div className="text-lg sm:text-2xl font-bold">{user.progress.totalPoints}</div>
              <div className="text-green-600 text-xs sm:text-sm font-medium">
                {(user.progress.totalPoints / 585 * 100).toFixed(0)}%
              </div>
            </div>
            <Progress 
              value={user.progress.totalPoints / 585 * 100} 
              className="h-2 mt-1" 
            />
            <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">
              {user.progress.totalPoints} of 585 possible points
            </div>
          </div>
          
          <div>
            <div className="text-xs sm:text-sm font-medium mb-1">Modules Completed</div>
            <div className="flex items-center justify-between">
              <div className="text-lg sm:text-2xl font-bold">{user.progress.totalModulesCompleted}</div>
              <div className="text-green-600 text-xs sm:text-sm font-medium">
                {Math.round((user.progress.totalModulesCompleted / trainingModules.length) * 100)}%
              </div>
            </div>
            <Progress 
              value={(user.progress.totalModulesCompleted / trainingModules.length) * 100} 
              className="h-2 mt-1" 
            />
            <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">
              {user.progress.totalModulesCompleted} of {trainingModules.length} modules
            </div>
          </div>
          
          <div>
            <div className="text-xs sm:text-sm font-medium mb-1">Badges Earned</div>
            <div className="flex items-center justify-between">
              <div className="text-lg sm:text-2xl font-bold">{earnedBadgeIds.length}</div>
              <div className="text-green-600 text-xs sm:text-sm font-medium">
                {Math.round((earnedBadgeIds.length / badges.length) * 100)}%
              </div>
            </div>
            <Progress 
              value={(earnedBadgeIds.length / badges.length) * 100} 
              className="h-2 mt-1" 
            />
            <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">
              {earnedBadgeIds.length} of {badges.length} badges
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
