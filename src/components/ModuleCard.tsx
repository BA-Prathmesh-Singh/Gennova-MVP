
import { TrainingModule } from '@/data/modules';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ModuleCardProps {
  module: TrainingModule;
  status: 'locked' | 'available' | 'completed';
}

export function ModuleCard({ module, status }: ModuleCardProps) {
  const navigate = useNavigate();
  
  const statusClasses = {
    locked: 'bg-gray-100 border-gray-300',
    available: 'bg-white border-primary/30 module-card',
    completed: 'bg-pharma-lightGreen border-accent/50'
  };

  const moduleIcons = {
    'module1': '🧪',
    'module2': '🥼',
    'module3': '🧬',
    'module4': '🔬'
  };

  const handleStart = () => {
    navigate(`/module/${module.id}`);
  };

  const handleRevisit = () => {
    navigate(`/module/${module.id}`);
  };

  return (
    <div className={`
      border rounded-xl p-5 shadow-sm ${statusClasses[status]}
      transition-all duration-300
    `}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`
          h-12 w-12 flex items-center justify-center rounded-full text-xl
          ${status === 'completed' ? 'bg-accent text-white' : 
             status === 'available' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}
        `}>
          {moduleIcons[module.id as keyof typeof moduleIcons]}
        </div>
        <div>
          <h3 className="font-bold text-lg">{module.title}</h3>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">
              {module.requiredTime}
            </span>
            <span className="inline-block w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="text-amber-600 font-medium">
              {module.points} points
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4">{module.description}</p>

      <div className="flex justify-between items-center">
        {status === 'locked' && (
          <div className="flex items-center text-sm text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Complete previous modules
          </div>
        )}

        {status === 'available' && (
          <Button onClick={handleStart} className="bg-primary hover:bg-primary/90">
            Start Module
          </Button>
        )}

        {status === 'completed' && (
          <Button onClick={handleRevisit} variant="outline" className="border-accent text-accent hover:bg-accent/5">
            Revisit Module
          </Button>
        )}

        {status !== 'locked' && (
          <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
            {status === 'completed' ? 'Completed' : 'Available'}
          </div>
        )}
      </div>
    </div>
  );
}
