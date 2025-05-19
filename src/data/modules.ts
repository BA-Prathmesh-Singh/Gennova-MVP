
export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  requiredTime: string;
  points: number;
  badgeId: string;
  prerequisites: string[];
  status?: 'locked' | 'available' | 'completed';
}

export const trainingModules: TrainingModule[] = [
  {
    id: 'module1',
    title: 'Aseptic Area Awareness',
    description: 'Learn about the key principles of aseptic areas and contamination risks in biopharmaceutical manufacturing.',
    requiredTime: '30 mins',
    points: 125,
    badgeId: 'area-awareness',
    prerequisites: [],
  },
  {
    id: 'module2',
    title: 'Gowning & Entry Protocols',
    description: 'Master the proper techniques for aseptic gowning and clean room entry protocols.',
    requiredTime: '45 mins',
    points: 150,
    badgeId: 'gowning-master',
    prerequisites: ['module1'],
  },
  {
    id: 'module3',
    title: 'Material Handling & Equipment Use',
    description: 'Learn proper handling of materials and equipment in aseptic manufacturing environments.',
    requiredTime: '40 mins',
    points: 135,
    badgeId: 'handling-expert',
    prerequisites: ['module1', 'module2'],
  },
  {
    id: 'module4',
    title: 'Incident Identification & Contamination Control',
    description: 'Develop skills to identify potential contamination incidents and apply proper control measures.',
    requiredTime: '50 mins',
    points: 175,
    badgeId: 'contamination-controller',
    prerequisites: ['module1', 'module2', 'module3'],
  }
];

export interface Badge {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'module' | 'special' | 'certification';
}

export const badges: Badge[] = [
  {
    id: 'area-awareness',
    title: 'Area Awareness Expert',
    description: 'Successfully completed the Aseptic Area Awareness module',
    image: 'badge-area-awareness',
    type: 'module'
  },
  {
    id: 'gowning-master',
    title: 'Gowning Master',
    description: 'Successfully completed the Gowning & Entry Protocols module',
    image: 'badge-gowning',
    type: 'module'
  },
  {
    id: 'handling-expert',
    title: 'Handling Expert',
    description: 'Successfully completed the Material Handling & Equipment Use module',
    image: 'badge-handling',
    type: 'module'
  },
  {
    id: 'contamination-controller',
    title: 'Contamination Controller',
    description: 'Successfully completed the Incident Identification & Contamination Control module',
    image: 'badge-contamination',
    type: 'module'
  },
  {
    id: 'certified-aseptic-handler',
    title: 'Certified Aseptic Handler',
    description: 'Successfully completed all required training modules',
    image: 'badge-certification',
    type: 'certification'
  },
  {
    id: 'fast-learner',
    title: 'Fast Learner',
    description: 'Completed all modules on the first attempt',
    image: 'badge-fast-learner',
    type: 'special'
  },
  {
    id: 'resilient-performer',
    title: 'Resilient Performer',
    description: 'Persevered through challenges to complete all training',
    image: 'badge-resilient',
    type: 'special'
  }
];

export interface EmployeeStats {
  department: string;
  totalEmployees: number;
  completed: number;
  inProgress: number;
  notStarted: number;
}

export const departmentStats: EmployeeStats[] = [
  {
    department: 'Production',
    totalEmployees: 45,
    completed: 20,
    inProgress: 15,
    notStarted: 10
  },
  {
    department: 'Quality Control',
    totalEmployees: 32,
    completed: 25,
    inProgress: 5,
    notStarted: 2
  },
  {
    department: 'Research & Development',
    totalEmployees: 28,
    completed: 15,
    inProgress: 8,
    notStarted: 5
  },
  {
    department: 'Supply Chain',
    totalEmployees: 18,
    completed: 8,
    inProgress: 6,
    notStarted: 4
  },
  {
    department: 'Administration',
    totalEmployees: 12,
    completed: 5,
    inProgress: 2,
    notStarted: 5
  }
];
