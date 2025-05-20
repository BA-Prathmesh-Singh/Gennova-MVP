
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserProgressChart } from '@/components/UserProgressChart';
import { BarChart } from 'lucide-react';
import { UserStatsCard } from './UserStatsCard';
import { DepartmentRankingCard } from './DepartmentRankingCard';
import { trainingModules, badges } from '@/data/modules';
import { User } from '@/context/AuthContext';

interface ProgressDataPoint {
  name: string;
  date: Date;
  points: number;
}

interface UserProgressSectionProps {
  moduleCompletionData: ProgressDataPoint[];
  user: User;
  earnedBadgeIds: string[];
}

export function UserProgressSection({ moduleCompletionData, user, earnedBadgeIds }: UserProgressSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="p-3 sm:p-4">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <BarChart className="h-4 w-4 sm:h-5 sm:w-5" />
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-4">
            <div className="h-[250px] sm:h-[350px]">
              <UserProgressChart data={moduleCompletionData} />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <UserStatsCard user={user} earnedBadgeIds={earnedBadgeIds} badges={badges} />
        
        <div className="mt-4 sm:mt-6">
          <DepartmentRankingCard user={user} />
        </div>
      </div>
    </div>
  );
}
