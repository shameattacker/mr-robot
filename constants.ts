import { Project, Testimonial, Article, Stat } from './types';

const PLACEHOLDER_URL = "https://placehold.co/800x600/1a1a1a/ffffff?text=?";
const AVATAR_URL = "https://placehold.co/200x200/1a1a1a/ffffff?text=?";

const ASSETS = {
  bedroom: PLACEHOLDER_URL,
  desk: PLACEHOLDER_URL,
  nightstand: PLACEHOLDER_URL,
  kitchen: PLACEHOLDER_URL,
  kitchenModern: PLACEHOLDER_URL,
  kitchenWood: PLACEHOLDER_URL,
  kitchenDark: PLACEHOLDER_URL,
  person1: AVATAR_URL,
  person2: AVATAR_URL,
  person3: AVATAR_URL,
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Modern Bedroom",
    category: "Art Modern",
    imageUrl: ASSETS.bedroom,
    borderRadius: "rounded-tr-[80px]",
  },
  {
    id: 2,
    title: "Minimalist Workstation",
    category: "Minimalist",
    imageUrl: ASSETS.desk,
    borderRadius: "rounded-tl-[80px]",
  },
  {
    id: 3,
    title: "Scandinavian Bedside",
    category: "Modern",
    imageUrl: ASSETS.nightstand,
    borderRadius: "rounded-br-[80px]",
  },
  {
    id: 4,
    title: "Luxury Kitchen",
    category: "Scandinavian",
    imageUrl: ASSETS.kitchen,
    borderRadius: "rounded-bl-[80px]",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Lisa Clairton",
    location: "New York, USA",
    image: ASSETS.person1,
    text: "We selected Interno because of rigorous design background & education."
  },
  {
    id: 2,
    name: "David Knight",
    location: "Sydney, Australia",
    image: ASSETS.person2,
    text: "The team exceeded our expectations and emerged as leaders of our projects."
  },
  {
    id: 3,
    name: "Lisa Clairton",
    location: "Paris, France",
    image: ASSETS.person3,
    text: "They balanced the architectural vision and the project realities beautifully."
  }
];

export const ARTICLES: Article[] = [
  {
    id: 1,
    tag: "Kitchen Design",
    title: "Residential Interior Designer In New York, USA",
    date: "November 23, 2021",
    imageUrl: ASSETS.kitchenModern
  },
  {
    id: 2,
    tag: "Living Room",
    title: "How To Choose The Best Wall Art & Decor House?",
    date: "November 23, 2021",
    imageUrl: ASSETS.kitchenWood
  },
  {
    id: 3,
    tag: "Minimalist Interior",
    title: "Tips To Increase The Interior Value Of Your House",
    date: "November 23, 2021",
    imageUrl: ASSETS.kitchenDark
  }
];

export const STATS: Stat[] = [
  { value: "12", label: "Years Of Experience" },
  { value: "85", label: "Success Project" },
  { value: "15", label: "Active Project" },
  { value: "95", label: "Happy Customers" },
];