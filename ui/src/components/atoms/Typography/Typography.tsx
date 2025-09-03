import React from "react";
import "./typography.styles.scss";

export interface TypographyProps {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body"
    | "caption"
    | "label";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "disabled"
    | "inverse"
    | "success"
    | "warning"
    | "error"
    | "info";
  align?: "left" | "center" | "right" | "justify";
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  size,
  weight,
  color = "primary",
  align = "left",
  children,
  className = "",
  as,
  ...props
}) => {
  // variant에 따른 기본 설정
  const getDefaultSettings = () => {
    switch (variant) {
      case "h1":
        return { element: "h1", size: size || "4xl", weight: weight || "bold" };
      case "h2":
        return { element: "h2", size: size || "3xl", weight: weight || "bold" };
      case "h3":
        return {
          element: "h3",
          size: size || "2xl",
          weight: weight || "semibold",
        };
      case "h4":
        return {
          element: "h4",
          size: size || "xl",
          weight: weight || "semibold",
        };
      case "h5":
        return {
          element: "h5",
          size: size || "lg",
          weight: weight || "medium",
        };
      case "h6":
        return {
          element: "h6",
          size: size || "base",
          weight: weight || "medium",
        };
      case "body":
        return {
          element: "p",
          size: size || "base",
          weight: weight || "normal",
        };
      case "caption":
        return {
          element: "span",
          size: size || "sm",
          weight: weight || "normal",
        };
      case "label":
        return {
          element: "label",
          size: size || "sm",
          weight: weight || "medium",
        };
      default:
        return {
          element: "p",
          size: size || "base",
          weight: weight || "normal",
        };
    }
  };

  const {
    element,
    size: defaultSize,
    weight: defaultWeight,
  } = getDefaultSettings();
  const Element = as || element;

  // CSS 클래스 생성
  const typographyClasses = [
    "typography",
    `typography--${variant}`,
    `typography--${defaultSize}`,
    `typography--${defaultWeight}`,
    `typography--${color}`,
    `typography--${align}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // 동적 컴포넌트 렌더링
  const Component = Element as React.ElementType;

  return (
    <Component className={typographyClasses} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
