export type PostMetadata = {
  id: string;
  title: string;
  description?: string;
  date: Date;
  updated?: Date;
  categories?: string[];
  technologies?: string[];
  tags?: string[];
  imageSrc: string;
  imageAlt: string;
};

export type TechnologyMetadata = {
  id: string;
  name: string;
  href: string;
  icon: string;
};
