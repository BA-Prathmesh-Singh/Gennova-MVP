
import { useAuth } from '@/context/AuthContext';
import { NavBar } from '@/components/NavBar';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ModuleCard } from '@/components/ModuleCard';
import { BadgeCard } from '@/components/BadgeCard';
import { trainingModules, badges } from '@/data/modules';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Calendar, Clock, Award } from 'lucide-react';
import { UserProgressChart } from '@/components/UserProgressChart';

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

        <Tabs defaultValue="modules" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="modules" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Training Modules
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              My Progress
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Achievements
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="modules">
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
          </TabsContent>
          
          <TabsContent value="progress">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart className="h-5 w-5" />
                      Learning Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <UserProgressChart data={moduleCompletionData} />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Learning Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium mb-1">Points Earned</div>
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold">{user.progress.totalPoints}</div>
                          <div className="text-green-600 text-sm font-medium">
                            {(user.progress.totalPoints / 585 * 100).toFixed(0)}%
                          </div>
                        </div>
                        <Progress 
                          value={user.progress.totalPoints / 585 * 100} 
                          className="h-2 mt-1" 
                        />
                        <div className="text-xs text-muted-foreground mt-1">
                          {user.progress.totalPoints} of 585 possible points
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium mb-1">Modules Completed</div>
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold">{user.progress.totalModulesCompleted}</div>
                          <div className="text-green-600 text-sm font-medium">
                            {progressPercentage}%
                          </div>
                        </div>
                        <Progress value={progressPercentage} className="h-2 mt-1" />
                        <div className="text-xs text-muted-foreground mt-1">
                          {user.progress.totalModulesCompleted} of {trainingModules.length} modules
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium mb-1">Badges Earned</div>
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold">{earnedBadgeIds.length}</div>
                          <div className="text-green-600 text-sm font-medium">
                            {Math.round((earnedBadgeIds.length / badges.length) * 100)}%
                          </div>
                        </div>
                        <Progress 
                          value={(earnedBadgeIds.length / badges.length) * 100} 
                          className="h-2 mt-1" 
                        />
                        <div className="text-xs text-muted-foreground mt-1">
                          {earnedBadgeIds.length} of {badges.length} badges
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="mt-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Department Ranking</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="bg-amber-500 text-white font-bold h-8 w-8 rounded-full flex items-center justify-center">
                            2
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.department}</p>
                          </div>
                          <div className="ml-auto font-bold">{user.progress.totalPoints} pts</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="col-span-full">
                <h2 className="text-xl font-semibold mb-6">All Available Badges</h2>
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
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
