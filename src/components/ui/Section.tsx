import { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  bgColor?: string;
}

const Section = ({ 
  id, 
  className = '', 
  children,
  bgColor = 'bg-white',
}: SectionProps) => {
  return (
    <section id={id} className={`section ${bgColor} ${className}`}>
      <div className="container-custom">
        {children}
      </div>
    </section>
  );
};

export default Section;