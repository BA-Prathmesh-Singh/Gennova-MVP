
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { trainingModules } from '@/data/modules';
import { useIsMobile } from '@/hooks/use-mobile';

// Sample employee progress data for demonstration
const employeesData = [
  {
    id: '1',
    name: 'Sarah Johnson',
    department: 'Production',
    progress: 100,
    modulesCompleted: 4,
    lastActive: '2023-05-15',
    status: 'completed'
  },
  {
    id: '2',
    name: 'Michael Chen',
    department: 'Quality Control',
    progress: 75,
    modulesCompleted: 3,
    lastActive: '2023-05-18',
    status: 'in-progress'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    department: 'Research & Development',
    progress: 50,
    modulesCompleted: 2,
    lastActive: '2023-05-10',
    status: 'in-progress'
  },
  {
    id: '4',
    name: 'David Kim',
    department: 'Production',
    progress: 25,
    modulesCompleted: 1,
    lastActive: '2023-05-16',
    status: 'in-progress'
  },
  {
    id: '5',
    name: 'Jessica Lee',
    department: 'Quality Control',
    progress: 0,
    modulesCompleted: 0,
    lastActive: 'N/A',
    status: 'not-started'
  },
  {
    id: '6',
    name: 'John Smith',
    department: 'Research & Development',
    progress: 0,
    modulesCompleted: 0,
    lastActive: 'N/A',
    status: 'not-started'
  },
  {
    id: '7',
    name: 'Maria Garcia',
    department: 'Production',
    progress: 100,
    modulesCompleted: 4,
    lastActive: '2023-05-12',
    status: 'completed'
  },
  {
    id: '8',
    name: 'Robert Wilson',
    department: 'Administration',
    progress: 75,
    modulesCompleted: 3,
    lastActive: '2023-05-17',
    status: 'in-progress'
  },
];

export function EmployeeProgressTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const isMobile = useIsMobile();
  const totalModules = trainingModules.length;
  
  // Filter employees based on search term
  const filteredEmployees = employeesData.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Badge styles for different statuses
  const getBadgeVariant = (status: string) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'not-started':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return '';
    }
  };
  
  // Mobile optimized employee card
  const EmployeeCard = ({ employee }: { employee: typeof employeesData[0] }) => {
    return (
      <div className="border rounded-md p-3 mb-2">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium text-sm">{employee.name}</h3>
            <p className="text-xs text-gray-500">{employee.department}</p>
          </div>
          <Badge className={`${getBadgeVariant(employee.status)} text-xs`}>
            {employee.status === 'completed' && 'Complete'}
            {employee.status === 'in-progress' && 'In Progress'}
            {employee.status === 'not-started' && 'Not Started'}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${employee.progress}%` }}
            ></div>
          </div>
          <span className="text-xs">{employee.progress}%</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="text-gray-500">Modules:</div>
          <div>{employee.modulesCompleted}/{totalModules}</div>
          <div className="text-gray-500">Last Active:</div>
          <div>{employee.lastActive !== 'N/A' ? new Date(employee.lastActive).toLocaleDateString() : 'Not started'}</div>
        </div>
      </div>
    );
  };
  
  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder={isMobile ? "Search..." : "Search employees by name or department..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden sm:block rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs md:text-sm">Employee</TableHead>
              <TableHead className="text-xs md:text-sm">Department</TableHead>
              <TableHead className="text-xs md:text-sm">Progress</TableHead>
              <TableHead className="text-xs md:text-sm">Modules</TableHead>
              <TableHead className="text-xs md:text-sm">Last Active</TableHead>
              <TableHead className="text-xs md:text-sm">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium text-xs md:text-sm">{employee.name}</TableCell>
                <TableCell className="text-xs md:text-sm">{employee.department}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-full max-w-[100px] bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${employee.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs md:text-sm">{employee.progress}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs md:text-sm">{employee.modulesCompleted}/{totalModules}</TableCell>
                <TableCell className="text-xs md:text-sm">
                  {employee.lastActive !== 'N/A' 
                    ? new Date(employee.lastActive).toLocaleDateString() 
                    : 'Not started'}
                </TableCell>
                <TableCell>
                  <Badge className={`${getBadgeVariant(employee.status)} text-xs`}>
                    {employee.status === 'completed' && 'Complete'}
                    {employee.status === 'in-progress' && 'In Progress'}
                    {employee.status === 'not-started' && 'Not Started'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredEmployees.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-sm">
                  No employees found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Mobile Card View */}
      <div className="sm:hidden">
        {filteredEmployees.map(employee => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
        
        {filteredEmployees.length === 0 && (
          <div className="text-center py-4 text-sm">
            No employees found matching your search.
          </div>
        )}
      </div>
      
      <div className="text-xs md:text-sm text-muted-foreground mt-4">
        Showing {filteredEmployees.length} of {employeesData.length} employees
      </div>
    </div>
  );
}
