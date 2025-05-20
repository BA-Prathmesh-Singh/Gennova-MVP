
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ModuleCard } from '@/components/ModuleCard';
import { BadgeCard } from '@/components/BadgeCard';
import { trainingModules, badges } from '@/data/modules';
import { User } from '@/context/AuthContext';

interface TrainingModulesSectionProps {
  user: User;
  getModuleStatus: (moduleId: string) => 'completed' | 'available' | 'locked';
  earnedBadgeIds: string[];
  progressPercentage: number;
}

export function TrainingModulesSection({ 
  user, 
  getModuleStatus, 
  earnedBadgeIds,
  progressPercentage
}: TrainingModulesSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      <div className="lg:col-span-2 space-y-4 sm:space-y-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Training Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {trainingModules.map((module) => (
            <ModuleCard 
              key={module.id} 
              module={module} 
              status={getModuleStatus(module.id)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Your Achievements</h2>
        
        <Card>
          <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4">
            <CardTitle className="text-sm sm:text-base">Badges Earned</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {badges
                .filter(badge => badge.type === 'module' || badge.id === 'certified-aseptic-handler')
                .map(badge => (
                  <BadgeCard 
                    key={badge.id}
                    badge={badge}
                    earned={earnedBadgeIds.includes(badge.id)}
                  />
                ))}
            </div>
          </CardContent>
        </Card>
        
        {progressPercentage === 100 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-green-800 font-medium text-sm sm:text-base mb-1">Certification Complete!</div>
            <button className="text-xs sm:text-sm text-green-700 underline">Download Certificate</button>
          </div>
        )}
      </div>
    </div>
  );
}
