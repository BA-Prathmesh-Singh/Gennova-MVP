
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
  
  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder="Search employees by name or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Modules Completed</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-full max-w-[100px] bg-gray-100 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${employee.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{employee.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>{employee.modulesCompleted}/{totalModules}</TableCell>
                <TableCell>
                  {employee.lastActive !== 'N/A' 
                    ? new Date(employee.lastActive).toLocaleDateString() 
                    : 'Not started'}
                </TableCell>
                <TableCell>
                  <Badge className={`${getBadgeVariant(employee.status)}`}>
                    {employee.status === 'completed' && 'Complete'}
                    {employee.status === 'in-progress' && 'In Progress'}
                    {employee.status === 'not-started' && 'Not Started'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredEmployees.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No employees found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="text-sm text-muted-foreground mt-4">
        Showing {filteredEmployees.length} of {employeesData.length} employees
      </div>
    </div>
  );
}
