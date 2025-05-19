
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { trainingModules } from '@/data/modules';
import { useToast } from '@/components/ui/use-toast';

const ModuleView = () => {
  const { moduleId } = useParams<{moduleId: string}>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isGuidedMode, setIsGuidedMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(5);
  
  // Find the current module
  const module = trainingModules.find(m => m.id === moduleId);
  
  useEffect(() => {
    if (!module) {
      navigate('/dashboard');
    }
  }, [module, navigate]);
  
  if (!module) return null;
  
  const handleCompleteStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Module complete
      toast({
        title: "Module Completed!",
        description: `You've successfully completed ${module.title}`,
      });
      navigate('/dashboard');
    }
  };
  
  const handleToggleGuided = () => {
    setIsGuidedMode(!isGuidedMode);
    setCurrentStep(1); // Reset to first step when toggling guidance
  };
  
  // Dummy content for the first module
  const moduleContent = () => {
    if (moduleId === 'module1') {
      return (
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">{module.title}</h1>
          
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{currentStep} of {totalSteps}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-2 animate-progress-fill" 
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* 2.5D Game Area */}
          <Card className="mb-6 aspect-video overflow-hidden">
            <CardContent className="p-0 h-full">
              <div className="relative w-full h-full bg-pharma-blue/5">
                {currentStep === 1 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <div className="text-5xl mb-4">🧪</div>
                    <h3 className="text-xl font-bold mb-2">Aseptic Area Awareness</h3>
                    <p className="max-w-md text-gray-600 mb-4">
                      Welcome to your aseptic training! Learn to identify different cleanroom zones and understand contamination risks.
                    </p>
                    {isGuidedMode && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm text-blue-800">
                        Guided Mode: Your virtual instructor will explain each concept in detail.
                      </div>
                    )}
                    <Button onClick={handleCompleteStep}>Begin Learning</Button>
                  </div>
                )}
                
                {currentStep === 2 && (
                  <div className="absolute inset-0 flex flex-col items-start justify-start p-6">
                    <h3 className="text-lg font-bold mb-4">Clean Room Classification</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="font-bold mb-1">Grade A (ISO 5)</div>
                        <p className="text-sm text-gray-600 mb-2">Critical zones for high-risk operations</p>
                        {isGuidedMode && (
                          <p className="text-xs text-blue-600 italic">Highest air quality with laminar flow</p>
                        )}
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="font-bold mb-1">Grade B (ISO 6)</div>
                        <p className="text-sm text-gray-600 mb-2">Background for Grade A zones</p>
                        {isGuidedMode && (
                          <p className="text-xs text-blue-600 italic">Surrounds Grade A areas for aseptic preparation</p>
                        )}
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="font-bold mb-1">Grade C (ISO 7)</div>
                        <p className="text-sm text-gray-600 mb-2">Less critical stages of manufacturing</p>
                        {isGuidedMode && (
                          <p className="text-xs text-blue-600 italic">Used for less critical processing steps</p>
                        )}
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="font-bold mb-1">Grade D (ISO 8)</div>
                        <p className="text-sm text-gray-600 mb-2">Clean areas for less critical activities</p>
                        {isGuidedMode && (
                          <p className="text-xs text-blue-600 italic">Starting materials handling and preparation</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 w-full text-right">
                      <Button onClick={handleCompleteStep}>Continue</Button>
                    </div>
                  </div>
                )}
                
                {currentStep === 3 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <h3 className="text-lg font-bold mb-4">Contamination Sources</h3>
                    
                    <div className="relative w-full max-w-xl h-72 bg-pharma-lightBlue rounded-lg shadow-inner overflow-hidden mb-4">
                      {/* Interactive 2.5D area with contamination sources */}
                      <div className="absolute top-1/4 left-1/4 bg-red-200 rounded-full h-12 w-12 flex items-center justify-center cursor-pointer hover:bg-red-300 transition-colors" title="Personnel">
                        👤
                      </div>
                      
                      <div className="absolute top-1/3 right-1/4 bg-red-200 rounded-full h-12 w-12 flex items-center justify-center cursor-pointer hover:bg-red-300 transition-colors" title="Equipment">
                        ⚙️
                      </div>
                      
                      <div className="absolute bottom-1/3 left-1/3 bg-red-200 rounded-full h-12 w-12 flex items-center justify-center cursor-pointer hover:bg-red-300 transition-colors" title="Raw Materials">
                        📦
                      </div>
                      
                      <div className="absolute bottom-1/4 right-1/3 bg-red-200 rounded-full h-12 w-12 flex items-center justify-center cursor-pointer hover:bg-red-300 transition-colors" title="Environment">
                        🌡️
                      </div>
                      
                      {isGuidedMode && (
                        <div className="absolute bottom-2 left-0 right-0 mx-auto w-3/4 bg-blue-50 border border-blue-200 rounded p-2 text-xs text-blue-800 text-center">
                          Hover over each source to learn about contamination risks
                        </div>
                      )}
                    </div>
                    
                    <div className="w-full text-right">
                      <Button onClick={handleCompleteStep}>Continue</Button>
                    </div>
                  </div>
                )}
                
                {currentStep === 4 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <h3 className="text-lg font-bold mb-4">Risk Assessment Quiz</h3>
                    
                    <div className="w-full max-w-xl bg-white rounded-lg shadow p-4 mb-4">
                      <p className="mb-3">Which of the following is NOT a common source of contamination in aseptic processing?</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                          <input type="radio" id="opt1" name="quiz" className="w-4 h-4" />
                          <label htmlFor="opt1">Personnel movement</label>
                        </div>
                        
                        <div className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                          <input type="radio" id="opt2" name="quiz" className="w-4 h-4" />
                          <label htmlFor="opt2">Improper gowning</label>
                        </div>
                        
                        <div className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                          <input type="radio" id="opt3" name="quiz" className="w-4 h-4" />
                          <label htmlFor="opt3">Digital documentation</label>
                          {isGuidedMode && (
                            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Correct Answer</span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                          <input type="radio" id="opt4" name="quiz" className="w-4 h-4" />
                          <label htmlFor="opt4">Air handling system failures</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full text-right">
                      <Button onClick={handleCompleteStep}>Submit Answer</Button>
                    </div>
                  </div>
                )}
                
                {currentStep === 5 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <div className="text-5xl mb-4 animate-badge-pop">🏆</div>
                    <h3 className="text-xl font-bold mb-2">Module Complete!</h3>
                    <p className="max-w-md text-gray-600 mb-6">
                      Congratulations! You've successfully completed the Aseptic Area Awareness module.
                    </p>
                    <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
                      <div className="font-medium mb-1">Points Earned: {module.points}</div>
                      <div className="text-sm">New Badge: {module.title} Expert</div>
                    </div>
                    <Button onClick={handleCompleteStep}>Return to Dashboard</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={handleToggleGuided}>
              {isGuidedMode ? 'Disable' : 'Enable'} Guided Mode
            </Button>
            
            <div className="text-sm text-muted-foreground">
              {isGuidedMode ? 'Guided Mode Active' : 'Self-Learning Mode'}
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <div className="text-5xl mb-6">🔧</div>
        <h2 className="text-2xl font-bold mb-2">{module.title}</h2>
        <p className="text-gray-600 mb-6">This module is under development and will be available soon.</p>
        <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="container px-4 py-8 mx-auto">
        {moduleContent()}
      </main>
    </div>
  );
};

export default ModuleView;
