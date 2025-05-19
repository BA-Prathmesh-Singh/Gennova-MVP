
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pharma-lightBlue flex flex-col">
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl text-primary">
            <span className="text-accent">G</span>APLMS
          </div>
          <Button variant="outline" onClick={() => navigate('/login')}>
            Sign In
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Aseptic Process Learning & <span className="text-primary">Management System</span>
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                An interactive, gamified platform to ensure all Gennova employees are thoroughly trained in aseptic processes.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-pharma-lightGreen rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>2.5D interactive learning experience</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-pharma-lightGreen rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Scenario-based aseptic training modules</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-pharma-lightGreen rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Complete tracking and compliance reporting</span>
                </div>
              </div>

              <div className="mt-8">
                <Button size="lg" onClick={() => navigate('/login')} className="mr-4">
                  Get Started
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <Card className="w-full max-w-md overflow-hidden shadow-xl">
                  <CardContent className="p-0">
                    <div className="bg-pharma-blue/10 p-6 aspect-video flex items-center justify-center">
                      <div className="text-center">
                        <div className="flex justify-center mb-4">
                          <div className="relative">
                            <div className="text-6xl">🧪</div>
                            <div className="absolute -top-1 -right-1 h-6 w-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold mb-2">Aseptic Area Awareness</h3>
                        <p className="text-sm mb-4">Learn the key principles of aseptic areas in biopharmaceutical manufacturing.</p>
                        <div className="inline-block bg-primary/10 text-primary text-xs font-medium py-1 px-3 rounded-full">
                          First Module
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Decorative elements */}
                <div className="absolute -z-10 h-48 w-48 bg-accent/10 rounded-full -bottom-10 -left-10"></div>
                <div className="absolute -z-10 h-24 w-24 bg-primary/10 rounded-full -top-6 -right-6"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Gennova Biopharmaceuticals Ltd. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
