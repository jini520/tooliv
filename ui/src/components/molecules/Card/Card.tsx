import React from "react";
import "./card.styles.scss";

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  className = "",
  header,
  footer,
}) => {
  const cardClasses = `tooliv-card ${className}`.trim();

  return (
    <div className={cardClasses}>
      {(header || title) && (
        <div className="tooliv-card__header">
          {header || (title && <h3 className="tooliv-card__title">{title}</h3>)}
        </div>
      )}
      <div className="tooliv-card__content">{children}</div>
      {footer && <div className="tooliv-card__footer">{footer}</div>}
    </div>
  );
};
