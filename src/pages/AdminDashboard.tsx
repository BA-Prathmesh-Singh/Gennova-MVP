
import { useState } from 'react';
import { NavBar } from '@/components/NavBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from "@/components/ui/progress";
import { departmentStats } from '@/data/modules';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [timeFilter, setTimeFilter] = useState('All Time');

  // Calculate overall completion rate
  const totalEmployees = departmentStats.reduce((sum, dept) => sum + dept.totalEmployees, 0);
  const totalCompleted = departmentStats.reduce((sum, dept) => sum + dept.completed, 0);
  const totalInProgress = departmentStats.reduce((sum, dept) => sum + dept.inProgress, 0);
  const totalNotStarted = departmentStats.reduce((sum, dept) => sum + dept.notStarted, 0);
  
  const completionRate = Math.round((totalCompleted / totalEmployees) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container px-4 py-8 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Training overview and compliance tracking</p>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {timeFilter}
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTimeFilter('Last 7 Days')}>
                  Last 7 Days
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeFilter('Last 30 Days')}>
                  Last 30 Days
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeFilter('Last 90 Days')}>
                  Last 90 Days
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeFilter('All Time')}>
                  All Time
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              Export Report
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEmployees}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completionRate}%</div>
              <Progress value={completionRate} className="h-2 mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">{totalInProgress}</div>
              <div className="text-sm text-muted-foreground">{Math.round((totalInProgress / totalEmployees) * 100)}% of total</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Not Started</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{totalNotStarted}</div>
              <div className="text-sm text-muted-foreground">{Math.round((totalNotStarted / totalEmployees) * 100)}% of total</div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs 
          defaultValue="overview" 
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="mb-8"
        >
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Department Overview</TabsTrigger>
            <TabsTrigger value="modules">Module Analytics</TabsTrigger>
            <TabsTrigger value="employees">Employee Progress</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Department Completion Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {departmentStats.map((dept) => (
                    <div key={dept.department}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{dept.department}</span>
                        <span className="text-sm text-muted-foreground">
                          {Math.round((dept.completed / dept.totalEmployees) * 100)}% Complete
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="flex h-full">
                          <div
                            className="bg-green-500 h-2"
                            style={{ width: `${(dept.completed / dept.totalEmployees) * 100}%` }}
                          ></div>
                          <div
                            className="bg-amber-400 h-2"
                            style={{ width: `${(dept.inProgress / dept.totalEmployees) * 100}%` }}
                          ></div>
                          <div
                            className="bg-red-400 h-2"
                            style={{ width: `${(dept.notStarted / dept.totalEmployees) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{dept.completed} Completed</span>
                        <span>{dept.inProgress} In Progress</span>
                        <span>{dept.notStarted} Not Started</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="modules">
            <Card>
              <CardHeader>
                <CardTitle>Module Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10 text-muted-foreground">
                  Module analytics will be available in the next update.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="employees">
            <Card>
              <CardHeader>
                <CardTitle>Employee Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10 text-muted-foreground">
                  Detailed employee progress reports will be available in the next update.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
