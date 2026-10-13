export interface Project {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  techStack: string[];
  githubUrl: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'anix',
    title: 'Anix',
    subtitle: 'Anime Streaming App',
    image: '/anix-preview.svg',
    description:
      'Aplikasi streaming anime dengan pemutar video HLS adaptif, dukungan multi-server otomatis, dan navigasi episode yang cepat tanpa distraksi.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'HLS.js'],
    githubUrl: 'https://github.com/hmz64/anix'
  },
  {
    id: 'calmquran',
    title: 'CalmQuran',
    subtitle: 'Quran Reciter',
    image: '/calmquran-preview.svg',
    description:
      'Aplikasi Al-Qur\'an digital dengan lantunan murottal berkualitas tinggi, sinkronisasi teks ayat, dan latar suara ambien yang tenang.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Web Audio API'],
    githubUrl: 'https://github.com/hmz64/calmquran'
  }
];

export const PROFILE_INFO = {
  name: 'hmz64',
  avatar: '/asuka.jpg',
  socials: {
    github: 'https://github.com/hmz64',
    email: 'contact@hmz64.dev',
    telegram: 'https://t.me/hmz64',
    discord: 'hmz64#0001'
  }
};
