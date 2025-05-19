
import { useAuth } from '@/context/AuthContext';
import { NavBar } from '@/components/NavBar';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ModuleCard } from '@/components/ModuleCard';
import { BadgeCard } from '@/components/BadgeCard';
import { trainingModules, badges } from '@/data/modules';

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

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container px-4 py-8 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user.name}</h1>
            <p className="text-muted-foreground">Continue your aseptic process training</p>
          </div>

          <Card className="w-full md:w-auto">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="text-center">
                <div className="text-xl font-bold">{user.progress.totalPoints}</div>
                <div className="text-xs text-muted-foreground">Total Points</div>
              </div>
              <div className="h-10 w-px bg-border"></div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-sm font-medium">Overall Progress</div>
                  <div className="ml-auto text-sm text-muted-foreground">{progressPercentage}%</div>
                </div>
                <Progress value={progressPercentage} className="h-2 w-[180px]" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold mb-4">Training Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trainingModules.map((module) => (
                <ModuleCard 
                  key={module.id} 
                  module={module} 
                  status={getModuleStatus(module.id)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Your Achievements</h2>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Badges Earned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
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
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="text-green-800 font-medium mb-1">Certification Complete!</div>
                <button className="text-sm text-green-700 underline">Download Certificate</button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
