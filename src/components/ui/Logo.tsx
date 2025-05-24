import { Building2 } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo = ({ className = 'h-8 w-auto' }: LogoProps) => {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <Building2 className="w-full h-full" />
    </div>
  );
};

export default Logo;