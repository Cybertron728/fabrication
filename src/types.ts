import { ReactNode } from 'react';

export interface Metric {
  id: number;
  label: string;
  value: number;
  suffix: string;
}

export interface Service {
  title: string;
  desc: string;
  icon: ReactNode;
}

export interface HomeService {
  title: string;
  desc: string;
}

export interface ProjectMedia {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string; // Optional thumbnail for videos
  caption?: string;
}

export interface Project {
  id: number;
  type: 'builder' | 'home';
  category: string;
  title: string;
  location: string;
  thumbnail: string; // Main image for the portfolio grid
  media: ProjectMedia[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  avatar?: string;
}