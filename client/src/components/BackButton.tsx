import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const BackButton = ({ children = 'Back', className = '', ...props }: { children?: React.ReactNode; className?: string }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-start w-[95%]">
      <Button onClick={() => navigate(-1)} variant="secondary" className={`flex items-center cursor-pointer gap-2 ${className}`} {...props}>
        <ArrowLeft className="w-4 h-4" />
        {children}
      </Button>
    </div>
  );
};

export default BackButton;
