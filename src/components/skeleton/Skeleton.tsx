import React from "react";

interface SkeletonProps {
  children?: React.ReactNode;
  className?: string;
  height?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ children, className,height }) => {
  const defaultChild = <div className={`w-full rounded-full ${height ? height : "h-6"}`} />;

  return (
    <div className={`animate-pulse ${className}`}>
      {React.Children.map(children || [defaultChild], (child) => {
        
        return (
          <div
            className={`bg-gradient-to-r from-[#E5E7EB] to-[#D1D5DB] rounded-lg  animate-pulse`}
          >
            
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default Skeleton;
