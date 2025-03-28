import Reydel from '@/assets/profiles/Reydel.jpg';
import Tala from '@/assets/xlab/tala.jpg';
import Batombakal from '@/assets/profiles/batumb.jpg';
import Emi from '@/assets/profiles/emi.jpg';
import Datu from '@/assets/profiles/datu.jpg';

import teamPh from '@/assets/profiles/teamph.jpg';
import Women from '@/assets/profiles/women.jpg';

export const profiles = [
  {
    id: 1,
    name: 'Reydel Ocon',
    role: 'Software Developer',
    description: 'A digital nomad who loves to code, travel, and eat. Sponsored a lot of startups. From idea to MVP to IPO.',
    avatar: Reydel,
    color: 'bg-yellow-200',
  },

  {
    id: 6,
    name: 'Joaquin Batumbakal',
    role: 'Entrepreneur',
    description: 'Turning bold ideas into reality through startups and innovation.',
    avatar: Batombakal,
    color: 'bg-orange-200',

    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/joaquin-batumbakal/',
      twitter: 'https://twitter.com/joaquin_bat',
    },
  },
  {
    id: 7,
    name: 'Tala Quimpo',
    role: 'Activist',
    description: 'Fighting for social justice and equal rights for all.',
    avatar: Tala,

    color: 'bg-pink-200',
  },

  {
    id: 9,
    name: 'Datu Reyes',
    role: 'Content Creator',
    description: 'Sharing stories and ideas that inspire and educate the world.',
    avatar: Datu,

    color: 'bg-brown-300',
  },
  {
    id: 10,
    name: 'Emilio Francisco',
    role: 'Health Advocate',
    description: 'Promoting wellness and mental health awareness for a better life.',
    avatar: Emi,

    color: 'bg-gray-200',
  },
];

export const featuredProfiles = [
  {
    id: 6,
    title: 'Collaborator of the month',
    subtitle: 'TeamPH',
    description: 'Join Team Fun!',
    color: 'bg-orange-300',
    avatar: teamPh,
  },

  {
    id: 8,
    title: 'Event of the month',
    subtitle: 'WIW by womenOrg',
    description: 'Get notification about this recurring event',
    color: 'bg-gray-100 border border-black',
    avatar: Women,
  },
];
