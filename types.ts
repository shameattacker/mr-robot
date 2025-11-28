export interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  borderRadius: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  text: string;
}

export interface Article {
  id: number;
  tag: string;
  title: string;
  date: string;
  imageUrl: string;
}

export interface Stat {
  value: string;
  label: string;
}

export enum ChatRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  role: ChatRole;
  text: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

export type NotificationType = 'success' | 'error' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
}