import {
  FaCloud,
  FaDollarSign,
  FaDownload,
  FaEraser,
  FaHeartPulse,
  FaRobot,
  FaRoute,
  FaTerminal,
} from "react-icons/fa6";


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


const features = [
  {
    title: "No Sign-Up Needed",
    description: "Jump straight in—no account required.",
    icon: FaTerminal,
  },
  {
    title: "Forever Free",
    description: "Completely free to use. No fees. No paywalls. Ever.",
    icon: FaDollarSign,
  },
  {
    title: "Personalized Daily Steps",
    description:
      "Your topic is broken down into clear, focused steps for each day.",
    icon: FaRoute,
  },
  {
    title: "Progress Tracking",
    description:
      "Mark topics as 'learned' and watch your progress grow over time.",
    icon: FaHeartPulse,
  },
  {
    title: "Export to CSV",
    description:
      "Download your entire roadmap and progress as a CSV file anytime.",
    icon: FaDownload,
  },
  {
    title: "AI-Powered Breakdown",
    description: "Smart topic segmentation—crafted with the help of AI.",
    icon: FaRobot,
  },
  {
    title: "Clean, Minimal UI",
    description: "No clutter. No distractions. Just focused learning.",
    icon: FaEraser,
  },
  {
    title: "Offline Access",
    description: "Use your roadmap anytime—even without the internet.",
    icon: FaCloud,
  },
];

export default features;