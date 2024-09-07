// export const BASE_URL = `https://dx-next-server.vercel.app/api`;
export const BASE_URL = `/api`;
export const LOGO = '';
export const DUMMY_STUDENT_ID = `DUMMY_STUDENT_ID`;

export const authenticatedLinks = [
  { name: "Home", link: "/",icon:"Home", isActive: true },
  { name: "X", link: "/sheild", icon:"shield", isActive: true },
  // { name: "Dashboard", link: "/dashboard",icon:"layout-dashboard" ,isActive: true },
  { name: "Profile", link: "/profile", icon:"circle-user", isActive: true },
  { name: "BetterMe", link: "/betterme", icon:"circle-user", isActive: true },

];

export const notAuthenticatedLinks = [
  { name: "Home", link: "/", icon:"Home", isActive: true },
  { name: "Login", link: "/login",icon:"log-in", isActive: true },
];

export const FineItems = [
  {
    id: "1",
    label: "No Uniform",
    value: "50",
  },
  {
    id: "2",
    label: "Misbehave in campus",
    value: "60",
  },
  {
    id: "3",
    label: "Found Narcotic substances",
    value: "100",
  },
  {
    id: "4",
    label: "No shoe/tie/i-card",
    value: "25",
  },
  {
    id: "5",
    label: "Long hairs",
    value: "40",
  },
  {
    id: "6",
    label: "no shoe",
    value: "80",
  },
] as const;


export const colorsList = [
  "border-cyan-500",
  "border-cyan-400",
  "border-emerald-500",
  "border-emerald-400",
  "border-sky-500",
  "border-sky-400",
  "border-rose-500",
  "border-rose-400",
  "border-orange-500",
  "border-orange-400",
  "border-yellow-500",
  "border-yellow-400",
  "border-fuchsia-500",
  "border-fuchsia-400",
  "border-lime-500",
  "border-lime-400",
  "border-violet-500",
  "border-violet-400",
  "border-blue-500",
  "border-blue-400",
  "border-teal-400",
  "border-teal-500",
  "border-green-400",
  "border-green-500",
  "border-indigo-400",
  "border-indigo-500",
  "border-purple-400",
  "border-purple-500",
  "border-pink-400",
  "border-pink-500",
  "border-gray-400",
  "border-gray-500",
];


export const BadgeList = [
  // IT
  { id: 1, name: "Artificial Intelligence" },
  { id: 2, name: "Edge Computing" },
  { id: 3, name: "Blockchain" },
  { id: 4, name: "JavaScript" },
  { id: 5, name: "Cybersecurity" },
  { id: 6, name: "Cloud Computing" },
  { id: 7, name: "Data Science" },
  { id: 8, name: "DevOps" },

  // Self-Help and Life Improvement
  { id: 57, name: "Time Management" },
  { id: 58, name: "Goal Setting" },
  { id: 59, name: "Mindfulness" },
  { id: 60, name: "Stress Management" },
  { id: 61, name: "Emotional Intelligence" },
  { id: 62, name: "Personal Finance" },
  { id: 63, name: "Self-Discipline" },
  { id: 64, name: "Motivation" },

  // Books and Literature
  { id: 71, name: "Books on Discipline Setting" },
{ id: 65, name: "Time Management Books" },
{ id: 66, name: "Personal Development Books" },
{ id: 67, name: "Motivational Books" },
{ id: 68, name: "Financial Advice Books" },
{ id: 69, name: "Mindfulness Books" },
{ id: 70, name: "Books on Emotional Intelligence" },
{ id: 72, name: "Books on Stress Management" },

  // International Updates
  { id: 49, name: "Global News" },
  { id: 50, name: "International Relations" },
  { id: 51, name: "Geopolitics" },
  { id: 52, name: "Economic Updates" },
  { id: 53, name: "Global Health" },
  { id: 54, name: "International Trade" },
  { id: 55, name: "Climate Change" },
  { id: 56, name: "Human Rights" },
  
  // Educational
  { id: 41, name: "E-learning" },
  { id: 42, name: "EdTech" },
  { id: 43, name: "STEM Education" },
  { id: 44, name: "Online Courses" },
  { id: 45, name: "Educational Psychology" },
  { id: 46, name: "Curriculum Development" },
  { id: 47, name: "Higher Education" },
  { id: 48, name: "Teaching Methods" },

  // Spirituality
  { id: 73, name: "Meditation" },
  { id: 74, name: "Yoga" },
  { id: 75, name: "Mindfulness Practices" },
  { id: 76, name: "Spiritual Growth" },
  { id: 77, name: "Holistic Health" },
  { id: 78, name: "Wellness" },
  { id: 79, name: "Gratitude" },
  { id: 80, name: "Positive Thinking" },

  // Life Skills
  { id: 81, name: "Communication Skills" },
  { id: 82, name: "Critical Thinking" },
  { id: 83, name: "Problem-Solving" },
  { id: 84, name: "Leadership" },
  { id: 85, name: "Teamwork" },
  { id: 86, name: "Public Speaking" },
  { id: 87, name: "Adaptability" },
  { id: 88, name: "Networking" },

  // Academic and Study Skills
  { id: 89, name: "Study Techniques" },
  { id: 90, name: "Note-Taking" },
  { id: 91, name: "Test Preparation" },
  { id: 92, name: "Research Skills" },
  { id: 93, name: "Writing Skills" },
  { id: 94, name: "Reading Comprehension" },
  { id: 95, name: "Memory Improvement" },
  { id: 96, name: "Focus and Concentration" },

  // Blogging
  { id: 9, name: "SEO" },
  { id: 10, name: "Content Marketing" },
  { id: 11, name: "Affiliate Marketing" },
  { id: 12, name: "Social Media Marketing" },
  { id: 13, name: "Copywriting" },
  { id: 14, name: "Guest Blogging" },
  { id: 15, name: "Email Marketing" },
  { id: 16, name: "Blogs" },

  // Healthcare
  { id: 17, name: "Telemedicine" },
  { id: 18, name: "Mental Health" },
  { id: 19, name: "Personalized Medicine" },
  { id: 20, name: "Health Tech" },
  { id: 21, name: "Wearable Health Devices" },
  { id: 22, name: "Medical Research" },
  { id: 24, name: "Fitness and Wellness" },

  // Chemical
  { id: 25, name: "Biotechnology" },
  { id: 26, name: "Pharmaceuticals" },



] as const; ;
