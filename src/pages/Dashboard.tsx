
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { NavBar } from '@/components/NavBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Calendar, Award } from 'lucide-react';
import { trainingModules } from '@/data/modules';
import { UserHeader } from '@/components/dashboard/UserHeader';
import { TrainingModulesSection } from '@/components/dashboard/TrainingModulesSection';
import { UserProgressSection } from '@/components/dashboard/UserProgressSection';
import { UserAchievementsSection } from '@/components/dashboard/UserAchievementsSection';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Get module status
  const getModuleStatus = (moduleId: string) => {
    if (user.progress.modules[moduleId]?.completed) {
      return 'completed';
    }

    const module = trainingModules.find(m => m.id === moduleId);
    
    if (!module) return 'locked';
    
    // Check if prerequisites are completed
    const prerequisitesMet = module.prerequisites.every(
      prereqId => user.progress.modules[prereqId]?.completed
    );
    
    return prerequisitesMet ? 'available' : 'locked';
  };

  // Progress percentage calculation
  const progressPercentage = Math.round((user.progress.totalModulesCompleted / trainingModules.length) * 100);
  
  // Get all badges that the user has earned
  const earnedBadgeIds = user.progress.badges || [];

  // Get module completion dates for progress chart
  const moduleCompletionData = Object.entries(user.progress.modules)
    .filter(([_, moduleData]) => moduleData.completed)
    .map(([moduleId, moduleData]) => {
      const module = trainingModules.find(m => m.id === moduleId);
      return {
        name: module?.title || moduleId,
        date: moduleData.lastAttempt ? new Date(moduleData.lastAttempt) : new Date(),
        points: moduleData.pointsEarned
      };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container px-2 sm:px-4 py-4 sm:py-8 mx-auto">
        <UserHeader user={user} progressPercentage={progressPercentage} />

        <Tabs defaultValue="modules" className="w-full">
          <div className="overflow-x-auto no-scrollbar">
            <TabsList className="mb-4 sm:mb-6 w-auto min-w-max">
              <TabsTrigger value="modules" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                Training Modules
              </TabsTrigger>
              <TabsTrigger value="progress" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <BarChart className="h-3 w-3 sm:h-4 sm:w-4" />
                My Progress
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <Award className="h-3 w-3 sm:h-4 sm:w-4" />
                Achievements
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="modules">
            <TrainingModulesSection 
              user={user} 
              getModuleStatus={getModuleStatus} 
              earnedBadgeIds={earnedBadgeIds}
              progressPercentage={progressPercentage}
            />
          </TabsContent>
          
          <TabsContent value="progress">
            <UserProgressSection 
              moduleCompletionData={moduleCompletionData} 
              user={user}
              earnedBadgeIds={earnedBadgeIds}
            />
          </TabsContent>
          
          <TabsContent value="achievements">
            <UserAchievementsSection earnedBadgeIds={earnedBadgeIds} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
