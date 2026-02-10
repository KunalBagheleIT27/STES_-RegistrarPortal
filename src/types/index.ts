import { ReactNode } from "react";

export interface User {
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: {
    text: string;
    variant?: 'positive' | 'negative' | 'warning' | 'neutral';
  };
  iconColor?: 'blue' | 'green' | 'red' | 'orange' | 'purple';
}

export interface QuickActionItem {
  id: string;
  label: string;
  icon: ReactNode;
  href: string;
  bgColor: string;
  textColor: string;
  iconColor: string;
}
