
import { useState } from 'react';
import { NavBar } from '@/components/NavBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from "@/components/ui/progress";
import { departmentStats, trainingModules } from '@/data/modules';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { BarChart, Calendar, Users, Award, FileText, ArrowDown, ArrowUp } from 'lucide-react';
import { ModuleCompletionChart } from '@/components/ModuleCompletionChart';
import { EmployeeProgressTable } from '@/components/EmployeeProgressTable';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [timeFilter, setTimeFilter] = useState('All Time');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Calculate overall completion rate
  const totalEmployees = departmentStats.reduce((sum, dept) => sum + dept.totalEmployees, 0);
  const totalCompleted = departmentStats.reduce((sum, dept) => sum + dept.completed, 0);
  const totalInProgress = departmentStats.reduce((sum, dept) => sum + dept.inProgress, 0);
  const totalNotStarted = departmentStats.reduce((sum, dept) => sum + dept.notStarted, 0);
  
  const completionRate = Math.round((totalCompleted / totalEmployees) * 100);

  // Sample module analytics data
  const moduleAnalytics = trainingModules.map(module => ({
    id: module.id,
    title: module.title,
    completionRate: Math.round(Math.random() * 70 + 10), // Random values between 10-80% for demo
    averageAttempts: +(1 + Math.random()).toFixed(1),
    averageScore: Math.round(Math.random() * 30 + 60), // Random values between 60-90%
  })).sort((a, b) => sortDirection === 'asc' 
    ? a.completionRate - b.completionRate 
    : b.completionRate - a.completionRate);

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

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
              <FileText className="h-4 w-4 mr-2" />
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
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Department Overview
            </TabsTrigger>
            <TabsTrigger value="modules" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Module Analytics
            </TabsTrigger>
            <TabsTrigger value="employees" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Employee Progress
            </TabsTrigger>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Module Completion Rates</CardTitle>
                    <Button variant="outline" size="sm" onClick={toggleSortDirection}>
                      Sort {sortDirection === 'asc' ? 'Descending' : 'Ascending'}
                      {sortDirection === 'asc' ? <ArrowUp className="h-4 w-4 ml-2" /> : <ArrowDown className="h-4 w-4 ml-2" />}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ModuleCompletionChart data={moduleAnalytics} />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-1">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">Module Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Module</TableHead>
                          <TableHead className="text-right">Avg. Score</TableHead>
                          <TableHead className="text-right">Avg. Attempts</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {moduleAnalytics.map((module) => (
                          <TableRow key={module.id}>
                            <TableCell className="font-medium">{module.title.split(' ')[0]}</TableCell>
                            <TableCell className="text-right">{module.averageScore}%</TableCell>
                            <TableCell className="text-right">{module.averageAttempts}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="employees">
            <Card>
              <CardHeader>
                <CardTitle>Employee Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <EmployeeProgressTable />
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
