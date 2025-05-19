
import { Badge } from '@/data/modules';

interface BadgeCardProps {
  badge: Badge;
  earned: boolean;
  className?: string;
}

export function BadgeCard({ badge, earned, className = '' }: BadgeCardProps) {
  const badgeTypeColors = {
    module: 'bg-blue-100 border-blue-300 text-blue-800',
    special: 'bg-purple-100 border-purple-300 text-purple-800',
    certification: 'bg-amber-100 border-amber-300 text-amber-800'
  };

  const badgeImages: Record<string, string> = {
    'badge-area-awareness': '🧪',
    'badge-gowning': '🥼',
    'badge-handling': '🧬',
    'badge-contamination': '🔬',
    'badge-certification': '🎓',
    'badge-fast-learner': '🚀',
    'badge-resilient': '💪'
  };

  return (
    <div className={`
      relative rounded-lg p-4 shadow-md flex flex-col items-center text-center
      ${earned ? badgeTypeColors[badge.type] : 'bg-gray-100 border-gray-200 text-gray-400'}
      border ${className}`}
    >
      <div className={`
        h-16 w-16 text-3xl flex items-center justify-center rounded-full mb-3 
        ${earned ? 'bg-white' : 'bg-gray-200'}`}
      >
        {badgeImages[badge.image] || '🏅'}
      </div>

      <h3 className="font-bold text-sm mb-1">{badge.title}</h3>
      <p className="text-xs">{badge.description}</p>

      {earned && badge.type === 'certification' && (
        <div className="absolute -top-2 -right-2 bg-badge-gold text-white text-xs py-1 px-2 rounded-full">
          Certified!
        </div>
      )}
      
      {!earned && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] rounded-lg flex items-center justify-center">
          <div className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
            Locked
          </div>
        </div>
      )}
    </div>
  );
}
