
import { createContext, useState, useContext, ReactNode } from 'react';

// Define user roles
export type UserRole = 'admin' | 'user' | null;

// Define user interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  progress: {
    totalModulesCompleted: number;
    totalPoints: number;
    badges: string[];
    modules: {
      [moduleId: string]: {
        completed: boolean;
        attempts: number;
        pointsEarned: number;
        lastAttempt: string | null;
      }
    }
  }
}

// Module progress update type
export interface ModuleProgressUpdate {
  completed: boolean;
  attempts: number;
  pointsEarned: number;
  lastAttempt: string | null;
}

// Define auth context interface
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  updateProgress: (moduleId: string, update: ModuleProgressUpdate) => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample user data
const sampleUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@gennova.com',
    role: 'admin',
    department: 'HR & Training',
    progress: {
      totalModulesCompleted: 4,
      totalPoints: 500,
      badges: ['admin', 'full-completion'],
      modules: {
        'module1': {
          completed: true,
          attempts: 1,
          pointsEarned: 125,
          lastAttempt: '2023-04-15T10:30:00'
        },
        'module2': {
          completed: true,
          attempts: 1,
          pointsEarned: 125,
          lastAttempt: '2023-04-16T11:45:00'
        },
        'module3': {
          completed: true,
          attempts: 1,
          pointsEarned: 125,
          lastAttempt: '2023-04-17T09:15:00'
        },
        'module4': {
          completed: true,
          attempts: 1,
          pointsEarned: 125,
          lastAttempt: '2023-04-18T14:20:00'
        }
      }
    }
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@gennova.com',
    role: 'user',
    department: 'Production',
    progress: {
      totalModulesCompleted: 1,
      totalPoints: 95,
      badges: ['module1-completion'],
      modules: {
        'module1': {
          completed: true,
          attempts: 2,
          pointsEarned: 95,
          lastAttempt: '2023-05-20T13:45:00'
        },
        'module2': {
          completed: false,
          attempts: 0,
          pointsEarned: 0,
          lastAttempt: null
        },
        'module3': {
          completed: false,
          attempts: 0,
          pointsEarned: 0,
          lastAttempt: null
        },
        'module4': {
          completed: false,
          attempts: 0,
          pointsEarned: 0,
          lastAttempt: null
        }
      }
    }
  }
];

// Create the auth provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Login function
  const login = (email: string, password: string) => {
    // In a real app, you would validate credentials against an API
    const foundUser = sampleUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
    } else {
      throw new Error('Invalid email or password');
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Update user progress
  const updateProgress = (moduleId: string, update: ModuleProgressUpdate) => {
    if (!user) return;

    const updatedUser = { ...user };
    
    // Update module specific progress
    updatedUser.progress.modules[moduleId] = {
      ...updatedUser.progress.modules[moduleId],
      ...update
    };
    
    // Update total modules completed if this is a new completion
    if (update.completed && !user.progress.modules[moduleId]?.completed) {
      updatedUser.progress.totalModulesCompleted += 1;
      
      // Add related badge for this module
      const module = trainingModules.find(m => m.id === moduleId);
      if (module?.badgeId && !updatedUser.progress.badges.includes(module.badgeId)) {
        updatedUser.progress.badges.push(module.badgeId);
      }
      
      // Check if all modules are completed for certification badge
      const allModulesCompleted = trainingModules.every(
        module => updatedUser.progress.modules[module.id]?.completed
      );
      
      if (allModulesCompleted && !updatedUser.progress.badges.includes('certified-aseptic-handler')) {
        updatedUser.progress.badges.push('certified-aseptic-handler');
      }
    }
    
    // Update total points
    if (update.pointsEarned) {
      const previousPoints = user.progress.modules[moduleId]?.pointsEarned || 0;
      const pointsDifference = update.pointsEarned - previousPoints;
      updatedUser.progress.totalPoints += pointsDifference;
    }
    
    setUser(updatedUser);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: user !== null,
    updateProgress,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Import modules for badge assignment
import { trainingModules } from '@/data/modules';
