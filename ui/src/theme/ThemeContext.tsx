import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Theme, ThemeMode, themes } from "./theme";

// 테마 컨텍스트 타입
interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

// 테마 컨텍스트 생성
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 테마 제공자 props
interface ThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeMode;
}

// 테마 제공자 컴포넌트
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultMode = "light",
}) => {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);
  const [theme, setThemeState] = useState<Theme>(themes[defaultMode]);

  // 테마 변경 함수
  const setTheme = (newMode: ThemeMode) => {
    setMode(newMode);
    setThemeState(themes[newMode]);

    // 로컬 스토리지에 저장
    if (typeof window !== "undefined") {
      localStorage.setItem("tooliv-theme", newMode);

      // HTML에 테마 클래스 추가/제거
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(newMode);
    }
  };

  // 테마 토글 함수
  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setTheme(newMode);
  };

  // 초기화 시 로컬 스토리지에서 테마 불러오기
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("tooliv-theme") as ThemeMode;
      if (savedTheme && themes[savedTheme]) {
        setTheme(savedTheme);
      } else {
        // 시스템 테마 감지
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        const systemTheme: ThemeMode = prefersDark ? "dark" : "light";
        setTheme(systemTheme);
      }
    }
  }, []);

  // 시스템 테마 변경 감지
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        const newMode: ThemeMode = e.matches ? "dark" : "light";
        // 로컬 스토리지에 저장된 테마가 없을 때만 시스템 테마 적용
        if (!localStorage.getItem("tooliv-theme")) {
          setTheme(newMode);
        }
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  const value: ThemeContextType = {
    theme,
    mode,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// 테마 훅
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// 테마 모드만 사용하는 훅
export const useThemeMode = (): ThemeMode => {
  const { mode } = useTheme();
  return mode;
};

// 테마 색상만 사용하는 훅
export const useThemeColors = () => {
  const { theme } = useTheme();
  return theme.colors;
};
