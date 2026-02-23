import React from "react";

interface AnimatedTitleProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;

  icon?: React.ReactNode;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  children,
  as: Tag = "h1",
  className,
  icon,
}) => {
  return (
    <Tag
      className={`group relative inline-flex items-center gap-3 ${className}`}
    >
      {}
      {icon}

      {}
      {}
      <span className="relative inline-block">
        {children}
        <span
          className="
            absolute bottom-0 left-0 w-full h-[2px] bg-card
            transform scale-x-0 group-hover:scale-x-100
            transition-transform duration-300 ease-in-out
            origin-left
          "
        />
      </span>
    </Tag>
  );
};

export default AnimatedTitle;
