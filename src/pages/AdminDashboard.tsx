
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
import { BarChart, Calendar, Users, FileText, ArrowDown, ArrowUp } from 'lucide-react';
import { ModuleCompletionChart } from '@/components/ModuleCompletionChart';
import { EmployeeProgressTable } from '@/components/EmployeeProgressTable';
import { useIsMobile } from '@/hooks/use-mobile';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [timeFilter, setTimeFilter] = useState('All Time');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const isMobile = useIsMobile();

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
      
      <main className="container px-4 py-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm md:text-base text-muted-foreground">Training overview and compliance tracking</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto text-sm">
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
            
            <Button className="w-full sm:w-auto text-sm">
              <FileText className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2 px-4 py-3">
              <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">Total Employees</CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-2">
              <div className="text-xl md:text-2xl font-bold">{totalEmployees}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2 px-4 py-3">
              <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-2">
              <div className="text-xl md:text-2xl font-bold text-green-600">{completionRate}%</div>
              <Progress value={completionRate} className="h-2 mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2 px-4 py-3">
              <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-2">
              <div className="text-xl md:text-2xl font-bold text-amber-500">{totalInProgress}</div>
              <div className="text-xs md:text-sm text-muted-foreground">{Math.round((totalInProgress / totalEmployees) * 100)}% of total</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2 px-4 py-3">
              <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">Not Started</CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-2">
              <div className="text-xl md:text-2xl font-bold text-red-500">{totalNotStarted}</div>
              <div className="text-xs md:text-sm text-muted-foreground">{Math.round((totalNotStarted / totalEmployees) * 100)}% of total</div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs 
          defaultValue="overview" 
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="mb-6"
        >
          <TabsList className="mb-5 w-full overflow-x-auto flex justify-start md:justify-center pb-2 no-scrollbar">
            <TabsTrigger value="overview" className="flex items-center gap-2 text-xs md:text-sm">
              <BarChart className="h-3 w-3 md:h-4 md:w-4" />
              {isMobile ? 'Overview' : 'Department Overview'}
            </TabsTrigger>
            <TabsTrigger value="modules" className="flex items-center gap-2 text-xs md:text-sm">
              <Calendar className="h-3 w-3 md:h-4 md:w-4" />
              {isMobile ? 'Modules' : 'Module Analytics'}
            </TabsTrigger>
            <TabsTrigger value="employees" className="flex items-center gap-2 text-xs md:text-sm">
              <Users className="h-3 w-3 md:h-4 md:w-4" />
              {isMobile ? 'Employees' : 'Employee Progress'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader className="px-4 py-4">
                <CardTitle className="text-base md:text-lg">Department Completion Status</CardTitle>
              </CardHeader>
              <CardContent className="px-3 md:px-4">
                <div className="space-y-4 md:space-y-6">
                  {departmentStats.map((dept) => (
                    <div key={dept.department}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs md:text-sm font-medium">{dept.department}</span>
                        <span className="text-xs md:text-sm text-muted-foreground">
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
            <div className="grid grid-cols-1 gap-4 lg:gap-6">
              <Card>
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-4">
                  <CardTitle className="text-base md:text-lg mb-2 sm:mb-0">Module Completion Rates</CardTitle>
                  <Button variant="outline" size="sm" onClick={toggleSortDirection} className="text-xs">
                    Sort {sortDirection === 'asc' ? 'Desc.' : 'Asc.'}
                    {sortDirection === 'asc' ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />}
                  </Button>
                </CardHeader>
                <CardContent className="px-2 md:px-4">
                  <div className="h-[300px] md:h-[350px]">
                    <ModuleCompletionChart data={moduleAnalytics} />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="px-4 py-4">
                  <CardTitle className="text-base md:text-lg">Module Performance</CardTitle>
                </CardHeader>
                <CardContent className="px-2 md:px-4 overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs md:text-sm">Module</TableHead>
                        <TableHead className="text-xs md:text-sm text-right">Avg. Score</TableHead>
                        <TableHead className="text-xs md:text-sm text-right">Avg. Attempts</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {moduleAnalytics.map((module) => (
                        <TableRow key={module.id}>
                          <TableCell className="font-medium text-xs md:text-sm">{module.title.split(' ')[0]}</TableCell>
                          <TableCell className="text-right text-xs md:text-sm">{module.averageScore}%</TableCell>
                          <TableCell className="text-right text-xs md:text-sm">{module.averageAttempts}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="employees">
            <Card>
              <CardHeader className="px-4 py-4">
                <CardTitle className="text-base md:text-lg">Employee Progress</CardTitle>
              </CardHeader>
              <CardContent className="px-2 md:px-4">
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
