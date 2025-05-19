
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { NavBar } from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { trainingModules } from '@/data/modules';

const ModuleView = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { user, updateProgress } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isGuided, setIsGuided] = useState(false);
  const [moduleCompleted, setModuleCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const module = trainingModules.find(m => m.id === moduleId);
  
  // Content steps for the module (simulated content)
  const [steps, setSteps] = useState([
    { type: 'intro', title: 'Introduction', content: '' },
    { type: 'content', title: 'Key Concepts', content: '' },
    { type: 'interaction', title: 'Practice Scenario', content: '' },
    { type: 'quiz', title: 'Knowledge Check', content: '' },
    { type: 'summary', title: 'Summary', content: '' }
  ]);
  
  useEffect(() => {
    if (!moduleId || !module) {
      navigate('/dashboard');
      return;
    }
    
    // Check if prerequisites are met
    const prerequisitesMet = module.prerequisites.every(
      prereqId => user?.progress.modules[prereqId]?.completed
    );
    
    if (!prerequisitesMet && moduleId !== 'module1') {
      toast({
        variant: "destructive",
        title: "Prerequisites not met",
        description: "You need to complete previous modules first."
      });
      navigate('/dashboard');
      return;
    }
    
    // Generate simulated content based on the module
    generateModuleContent(module);
    
    // Check if module was previously completed
    if (user?.progress.modules[moduleId]?.completed) {
      setModuleCompleted(true);
    }
    
    // Set initial progress
    updateModuleProgress(0);
  }, [moduleId, user]);
  
  const generateModuleContent = (module) => {
    // This is where you would fetch real content from the backend
    // For now we'll generate simulated content based on module type
    const newSteps = [...steps];
    
    // Update intro
    newSteps[0].content = `Welcome to ${module.title}. This module will teach you the essential skills and knowledge related to ${module.description.toLowerCase()}`;
    
    // Update content based on module type
    if (module.id === 'module1') {
      newSteps[1].content = 'Aseptic areas are specialized environments designed to minimize contamination risks. Key principles include maintaining air quality, proper gowning procedures, and understanding contamination sources.';
      newSteps[2].content = 'Identify potential contamination sources in this cleanroom scenario. Click on areas that might pose contamination risks.';
      newSteps[3].content = 'Quiz: What is the primary purpose of HEPA filters in cleanroom environments?';
    } else if (module.id === 'module2') {
      newSteps[1].content = 'Proper gowning is essential to prevent contamination. The sequence and technique of gowning are critical to maintaining aseptic conditions.';
      newSteps[2].content = 'Practice the correct gowning sequence by arranging the steps in the proper order.';
      newSteps[3].content = 'Quiz: Which part of the gowning procedure should come first?';
    } else if (module.id === 'module3') {
      newSteps[1].content = 'Materials and equipment in aseptic environments must be handled according to strict protocols to prevent contamination.';
      newSteps[2].content = 'Practice proper material transfer procedures by selecting the correct technique for each scenario.';
      newSteps[3].content = 'Quiz: What is the correct way to transfer materials through an air lock?';
    } else if (module.id === 'module4') {
      newSteps[1].content = 'Identifying potential contamination incidents early and applying proper control measures is critical to maintaining product safety.';
      newSteps[2].content = 'Review these scenarios and identify which represent contamination risks and what actions should be taken.';
      newSteps[3].content = 'Quiz: What should be your first action when you observe a potential contamination event?';
    }
    
    // Update summary
    newSteps[4].content = `Congratulations on completing the ${module.title} module! You've learned about ${module.description.toLowerCase()}`;
    
    setSteps(newSteps);
  };
  
  const updateModuleProgress = (stepIndex) => {
    const newProgress = Math.round(((stepIndex) / (steps.length - 1)) * 100);
    setProgress(newProgress);
  };
  
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      updateModuleProgress(nextStep);
    } else {
      // Module completed
      completeModule();
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      updateModuleProgress(prevStep);
    }
  };
  
  const completeModule = () => {
    if (!module) return;
    
    // Mark module as completed in user progress
    if (updateProgress) {
      updateProgress(module.id, {
        completed: true,
        attempts: (user?.progress.modules[module.id]?.attempts || 0) + 1,
        pointsEarned: module.points,
        lastAttempt: new Date().toISOString()
      });
    }
    
    // Show completion message
    toast({
      title: "Module Completed!",
      description: `You've earned ${module.points} points and a new badge!`,
    });
    
    // Navigate back to dashboard
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };
  
  const renderStepContent = () => {
    const step = steps[currentStep];
    
    switch (step.type) {
      case 'intro':
      case 'content':
      case 'summary':
        return (
          <div className="space-y-4">
            {isGuided && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md flex items-start gap-2">
                <div className="text-blue-500 mt-0.5"><AlertCircle size={16} /></div>
                <div>
                  <div className="font-medium text-sm text-blue-700">Guided Mode</div>
                  <div className="text-sm text-blue-600">
                    Additional guidance will be provided to help you master this content.
                  </div>
                </div>
              </div>
            )}
            <p className="text-gray-700">{step.content}</p>
          </div>
        );
        
      case 'interaction':
        return (
          <div className="space-y-6">
            <p className="text-gray-700">{step.content}</p>
            <div className="bg-gray-50 p-4 rounded-md border">
              {/* This would be replaced by actual interactive content */}
              <div className="text-center p-8 text-gray-500">
                Interactive scenario simulation would be displayed here
                {isGuided && <div className="mt-2 text-blue-600 text-sm">Guided assistance is enabled</div>}
              </div>
            </div>
          </div>
        );
        
      case 'quiz':
        return (
          <div className="space-y-6">
            <p className="text-gray-700">{step.content}</p>
            <div className="space-y-3">
              {/* Sample quiz options - would be dynamic in a real implementation */}
              {['A. To remove particles from incoming air', 
                'B. To maintain positive pressure', 
                'C. To control humidity', 
                'D. To reduce energy costs'].map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                  <input type="radio" name="quiz" id={`option-${index}`} />
                  <label htmlFor={`option-${index}`} className="cursor-pointer w-full">{option}</label>
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return <p>Content unavailable</p>;
    }
  };
  
  if (!module) {
    return <div>Module not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container px-4 py-8 mx-auto">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
            <div>
              <h1 className="text-2xl font-bold">{module.title}</h1>
              <p className="text-muted-foreground">{module.description}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">
                {steps[currentStep].title} ({currentStep + 1}/{steps.length})
              </div>
              <div className="w-32">
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{steps[currentStep].title}</CardTitle>
            {module.requiredTime && (
              <CardDescription>
                Estimated time: {module.requiredTime}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevStep}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            <Button onClick={handleNextStep}>
              {currentStep < steps.length - 1 ? (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                'Complete Module'
              )}
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default ModuleView;
