
import { useAuth } from '@/context/AuthContext';
import { NavBar } from '@/components/NavBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BadgeCard } from '@/components/BadgeCard';
import { badges } from '@/data/modules';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container px-4 py-8 mx-auto">
        <h1 className="text-2xl font-bold mb-8">Your Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Name</div>
                  <div className="font-medium">{user.name}</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="font-medium">{user.email}</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Department</div>
                  <div className="font-medium">{user.department}</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Role</div>
                  <Badge variant="outline" className="capitalize">
                    {user.role}
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Training Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Modules Completed</div>
                  <div className="font-medium">{user.progress.totalModulesCompleted} / 4</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Total Points</div>
                  <div className="font-medium">{user.progress.totalPoints}</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Badges Earned</div>
                  <div className="font-medium">{user.progress.badges.length}</div>
                </div>
                
                {user.progress.totalModulesCompleted === 4 && (
                  <div className="pt-2">
                    <Badge className="bg-green-500 text-white">Certified</Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {badges.map(badge => (
                    <BadgeCard 
                      key={badge.id}
                      badge={badge}
                      earned={user.progress.badges.includes(badge.id)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
