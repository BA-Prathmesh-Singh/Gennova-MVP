
import React from 'react';
import { BadgeCard } from '@/components/BadgeCard';
import { badges } from '@/data/modules';

interface UserAchievementsSectionProps {
  earnedBadgeIds: string[];
}

export function UserAchievementsSection({ earnedBadgeIds }: UserAchievementsSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
      <div className="col-span-full">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-6">All Available Badges</h2>
      </div>
      
      {badges.map(badge => (
        <BadgeCard 
          key={badge.id}
          badge={badge}
          earned={earnedBadgeIds.includes(badge.id)}
          className="h-full"
        />
      ))}
    </div>
  );
}
