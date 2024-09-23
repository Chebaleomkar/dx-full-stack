import { Icons } from "@/components/icons";

// export const BASE_URL = `https://dx-next-server.vercel.app/api`;
export const BASE_URL = `/api`;
export const LOGO = "";
export const DUMMY_STUDENT_ID = `66a923aed671d71cd08f5322`;
export const DUMMY_USER_ID = `66a9208cd671d71cd08f5311`;

export const authenticatedLinks = [
  { name: "Home", link: "/", icon: "house", isActive: true },
  { name: "X", link: "/shield", icon: "shieldCheck", isActive: true },
  { name: "Profile", link: "/profile", icon: "user", isActive: true },
  { name: "BetterMe", link: "/betterme", icon: "zap", isActive: true },
];

export const notAuthenticatedLinks = [
  { name: "Home", link: "/", icon: "house", isActive: true },
  { name: "Login", link: "/login", icon: "login", isActive: true },
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
] ;


export const HomeInfoList =[
  {
    heading:'Welcome to DisciplineX',
    subHeading:'Your partner in promoting discipline among students through digital means',
    imageUrl :'/images/fine.gif' ,
  },
  {
    heading:'What We Do',
    subHeading:'We help institutions maintain discipline among students through innovative digital tools',
    imageUrl :'/images/img2.png' ,
    icon : 'FaBullseye',
  },
  {
    heading:"Who We Are",
    subHeading:"DisciplineX is a dedicated team of educators and  technologists working together to install discipline in students",
    imageUrl:"/images/img3.png",
    icon : 'FaUserTie'
  },
  {
    heading:"Our Goal",
    subHeading:"Our goal is to highlight the value of discipline and habits in students lives and support its development through digital mediums",
    imageUrl:"/images/logo.jpeg",
    icon : 'FaBullseye',
  },
  {
    heading:"Helping Institution",
    subHeading:" We assist schools in implementing discipline policies effectively and efficiently using our platform. Institutions can track and manage student behavior, ensuring a learning  environment",
    imageUrl:"/images/img4.png",
    icon :'FaSchool',
  }
]


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
] as const;

export const fineReasons = [
  "No uniform",
  "Late to class",
  "Class skipping",
  "Disrespecting staff",
  "Property damage",
  "Restricted parking",
  "Phone use in class",
  "Late assignment",
  "Unauthorized access",
  "Smoking on campus",
  "Littering",
  "Dress code violation",
  "Unauthorized gatherings",
  "Loud music in dorms",
  "Vandalism",
  "Missing events",
  "Abusive language",
  "Cheating",
  "Library misuse",
  "Late book return",
  "Fighting",
  "Hostel rule violation",
  "Computer misuse",
  "Unauthorized flyers",
  "Bunking classes",
  "Lab misuse",
  "Unauthorized parties",
  "Leaving campus without permission",
  "Harassment",
  "Excessive noise in dorms",
  "Unauthorized facility use",
  "Pets on campus",
  "Late registration",
  "Social media misuse",
  "Ignoring health protocols",
  "Missing training sessions",
  "Leaving belongings in shared spaces",
  "Guest policy violation",
  "ID misrepresentation",
  "Missing orientation",
  "Plagiarism",
  "Unauthorized fundraising",
  "Disrupting events",
  "Lab safety violations",
  "Fire safety neglect",
  "Equipment tampering",
  "Incomplete exit procedures",
  "Transportation misuse",
  "Not reporting bullying",
  "Eating in restricted areas",
  "Leaving lights on",
  "Equipment misuse",
  "ID not visible",
  "Ignoring recycling rules",
  "Unauthorized room use",
  "Long equipment use",
  "Not reporting lost ID",
  "Not cleaning up",
  "Ignoring quiet hours",
  "Entering off-limits areas",
  "Using others' resources",
  "Missing club deadlines",
  "Group project disruption",
  "Fire drill negligence",
  "Outside food in class",
  "Improper dress at events",
  "Using college logo improperly",
  "Social media policy violation",
  "Ignoring student org guidelines",
  "Missing advising sessions",
  "Ignoring screening requirements",
] as const;

