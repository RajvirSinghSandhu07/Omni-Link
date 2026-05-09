// ============================================================
// Mock data for the AI Community Operations System
// ============================================================

export interface NGO {
  id: string;
  name: string;
  type: string;
  location: string;
  lat: number;
  lng: number;
  capacity: number;
  contact: string;
  status: "active" | "busy" | "offline";
  specialties: string[];
}

export interface Volunteer {
  id: string;
  name: string;
  phone: string;
  location: string;
  lat: number;
  lng: number;
  skills: string[];
  status: "available" | "assigned" | "in-transit" | "offline";
  rating: number;
  completedTasks: number;
  avatar: string;
}

export interface NeedRequest {
  id: string;
  type: "food_donation" | "volunteer_request" | "shelter_need" | "supply_request" | "medical_aid" | "transport_request";
  description: string;
  quantity: number;
  location: string;
  lat: number;
  lng: number;
  urgency: "critical" | "high" | "medium" | "low";
  status: "incoming" | "processing" | "matched" | "in-progress" | "completed" | "escalated";
  timestamp: string;
  assignedVolunteer?: string;
  matchedNGO?: string;
  aiNotes?: string;
}

export interface ActivityEvent {
  id: string;
  type: "ai_action" | "volunteer_update" | "ngo_match" | "escalation" | "intake" | "outreach" | "completion";
  message: string;
  timestamp: string;
  agent: "coordinator" | "operations" | "system";
  urgency?: "critical" | "high" | "medium" | "low";
}

// ---- NGOs ----
export const mockNGOs: NGO[] = [
  {
    id: "ngo-001",
    name: "FeedIndia Foundation",
    type: "Food Distribution",
    location: "Koramangala, Bangalore",
    lat: 12.9352,
    lng: 77.6245,
    capacity: 500,
    contact: "+91 98765 43210",
    status: "active",
    specialties: ["food_donation", "supply_request"],
  },
  {
    id: "ngo-002",
    name: "Shelter Hope Alliance",
    type: "Shelter Services",
    location: "Indiranagar, Bangalore",
    lat: 12.9784,
    lng: 77.6408,
    capacity: 120,
    contact: "+91 98765 43211",
    status: "active",
    specialties: ["shelter_need", "medical_aid"],
  },
  {
    id: "ngo-003",
    name: "HelpHands Collective",
    type: "General Aid",
    location: "Whitefield, Bangalore",
    lat: 12.9698,
    lng: 77.7500,
    capacity: 300,
    contact: "+91 98765 43212",
    status: "active",
    specialties: ["volunteer_request", "supply_request", "food_donation"],
  },
  {
    id: "ngo-004",
    name: "MedReach Trust",
    type: "Medical Aid",
    location: "HSR Layout, Bangalore",
    lat: 12.9116,
    lng: 77.6389,
    capacity: 80,
    contact: "+91 98765 43213",
    status: "busy",
    specialties: ["medical_aid"],
  },
  {
    id: "ngo-005",
    name: "BookBridge India",
    type: "Education Support",
    location: "Jayanagar, Bangalore",
    lat: 12.9250,
    lng: 77.5938,
    capacity: 200,
    contact: "+91 98765 43214",
    status: "active",
    specialties: ["supply_request"],
  },
  {
    id: "ngo-006",
    name: "GreenWheels Transport",
    type: "Logistics & Transport",
    location: "Electronic City, Bangalore",
    lat: 12.8440,
    lng: 77.6630,
    capacity: 50,
    contact: "+91 98765 43215",
    status: "active",
    specialties: ["transport_request"],
  },
  {
    id: "ngo-007",
    name: "CareRoots Bangalore",
    type: "Medical Aid",
    location: "Malleswaram, Bangalore",
    lat: 13.0031,
    lng: 77.5701,
    capacity: 150,
    contact: "+91 98765 43216",
    status: "active",
    specialties: ["medical_aid", "volunteer_request"],
  },
  {
    id: "ngo-008",
    name: "UrbanRescue Initiative",
    type: "General Aid",
    location: "BTM Layout, Bangalore",
    lat: 12.9166,
    lng: 77.6101,
    capacity: 250,
    contact: "+91 98765 43217",
    status: "offline",
    specialties: ["shelter_need", "food_donation"],
  },
  {
    id: "ngo-009",
    name: "Pratham Lifeline",
    type: "Food Distribution",
    location: "Marathahalli, Bangalore",
    lat: 12.9591,
    lng: 77.6974,
    capacity: 600,
    contact: "+91 98765 43218",
    status: "active",
    specialties: ["food_donation", "transport_request"],
  },
  {
    id: "ngo-010",
    name: "SafeHaven Hub",
    type: "Shelter Services",
    location: "Hebbal, Bangalore",
    lat: 13.0354,
    lng: 77.5988,
    capacity: 100,
    contact: "+91 98765 43219",
    status: "active",
    specialties: ["shelter_need", "supply_request"],
  },
];

// ---- Volunteers ----
export const mockVolunteers: Volunteer[] = [
  {
    id: "vol-001",
    name: "Arjun Mehta",
    phone: "+91 90000 10001",
    location: "Koramangala",
    lat: 12.9352,
    lng: 77.6245,
    skills: ["Driver", "Logistics", "Pickup"],
    status: "available",
    rating: 4.8,
    completedTasks: 47,
    avatar: "AM",
  },
  {
    id: "vol-002",
    name: "Priya Sharma",
    phone: "+91 90000 10002",
    location: "Whitefield",
    lat: 12.9698,
    lng: 77.7500,
    skills: ["First-Aid", "Multilingual", "Sorting"],
    status: "available",
    rating: 4.9,
    completedTasks: 63,
    avatar: "PS",
  },
  {
    id: "vol-003",
    name: "Rahul Nair",
    phone: "+91 90000 10003",
    location: "HSR Layout",
    lat: 12.9116,
    lng: 77.6389,
    skills: ["Driver", "Delivery"],
    status: "assigned",
    rating: 4.5,
    completedTasks: 22,
    avatar: "RN",
  },
  {
    id: "vol-004",
    name: "Deepa Krishnan",
    phone: "+91 90000 10004",
    location: "Indiranagar",
    lat: 12.9784,
    lng: 77.6408,
    skills: ["Multilingual", "Coordination", "First-Aid"],
    status: "available",
    rating: 4.7,
    completedTasks: 38,
    avatar: "DK",
  },
  {
    id: "vol-005",
    name: "Mohammed Aslam",
    phone: "+91 90000 10005",
    location: "Jayanagar",
    lat: 12.9250,
    lng: 77.5938,
    skills: ["Sorting", "Packing", "Delivery"],
    status: "in-transit",
    rating: 4.6,
    completedTasks: 31,
    avatar: "MA",
  },
  {
    id: "vol-006",
    name: "Sneha Patil",
    phone: "+91 90000 10006",
    location: "Electronic City",
    lat: 12.8440,
    lng: 77.6630,
    skills: ["First-Aid", "Medical Trained"],
    status: "available",
    rating: 4.9,
    completedTasks: 55,
    avatar: "SP",
  },
  {
    id: "vol-007",
    name: "Karthik Reddy",
    phone: "+91 90000 10007",
    location: "Marathahalli",
    lat: 12.9591,
    lng: 77.6974,
    skills: ["Driver", "Heavy Vehicle", "Delivery"],
    status: "available",
    rating: 4.4,
    completedTasks: 18,
    avatar: "KR",
  },
  {
    id: "vol-008",
    name: "Ananya Gupta",
    phone: "+91 90000 10008",
    location: "BTM Layout",
    lat: 12.9166,
    lng: 77.6101,
    skills: ["Coordination", "Multilingual", "Outreach"],
    status: "available",
    rating: 4.8,
    completedTasks: 42,
    avatar: "AG",
  },
  {
    id: "vol-009",
    name: "Vikram Singh",
    phone: "+91 90000 10009",
    location: "Malleswaram",
    lat: 13.0031,
    lng: 77.5701,
    skills: ["First-Aid", "Driver", "Security"],
    status: "available",
    rating: 4.7,
    completedTasks: 51,
    avatar: "VS",
  },
  {
    id: "vol-010",
    name: "Neha Verma",
    phone: "+91 90000 10010",
    location: "Hebbal",
    lat: 13.0354,
    lng: 77.5988,
    skills: ["Multilingual", "Child Care", "Sorting"],
    status: "offline",
    rating: 4.9,
    completedTasks: 89,
    avatar: "NV",
  },
];

// ---- Active Requests ----
export const mockRequests: NeedRequest[] = [
  {
    id: "req-001",
    type: "food_donation",
    description: "Leftover catered food for 200 people from a corporate event",
    quantity: 200,
    location: "Whitefield, Bangalore",
    lat: 12.9698,
    lng: 77.7500,
    urgency: "critical",
    status: "in-progress",
    timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
    assignedVolunteer: "vol-002",
    matchedNGO: "ngo-003",
    aiNotes: "Perishable food — 3hr window. Assigned nearest volunteer for immediate pickup.",
  },
  {
    id: "req-002",
    type: "shelter_need",
    description: "Family of 5 displaced after flooding, needs immediate shelter",
    quantity: 5,
    location: "HSR Layout, Bangalore",
    lat: 12.9116,
    lng: 77.6389,
    urgency: "critical",
    status: "matched",
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    matchedNGO: "ngo-002",
    aiNotes: "Emergency shelter allocated at Shelter Hope Alliance. Transport dispatched.",
  },
  {
    id: "req-003",
    type: "supply_request",
    description: "50 blankets needed for night shelter in Jayanagar",
    quantity: 50,
    location: "Jayanagar, Bangalore",
    lat: 12.9250,
    lng: 77.5938,
    urgency: "high",
    status: "processing",
    timestamp: new Date(Date.now() - 10 * 60000).toISOString(),
    aiNotes: "Cross-referencing supply inventories at nearby NGOs…",
  },
  {
    id: "req-004",
    type: "volunteer_request",
    description: "10 volunteers needed for food sorting at Koramangala warehouse",
    quantity: 10,
    location: "Koramangala, Bangalore",
    lat: 12.9352,
    lng: 77.6245,
    urgency: "medium",
    status: "matched",
    timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
    matchedNGO: "ngo-001",
    assignedVolunteer: "vol-001",
    aiNotes: "4 of 10 volunteers confirmed. Sending outreach for remaining 6.",
  },
  {
    id: "req-005",
    type: "medical_aid",
    description: "Elderly person in Indiranagar needs emergency medical supplies",
    quantity: 1,
    location: "Indiranagar, Bangalore",
    lat: 12.9784,
    lng: 77.6408,
    urgency: "critical",
    status: "escalated",
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    matchedNGO: "ngo-004",
    aiNotes: "Primary NGO at capacity — escalated to backup. Ambulance coordination initiated.",
  },
  {
    id: "req-006",
    type: "transport_request",
    description: "Transport needed for 100 food packets from Electronic City to Whitefield",
    quantity: 100,
    location: "Electronic City, Bangalore",
    lat: 12.8440,
    lng: 77.6630,
    urgency: "high",
    status: "in-progress",
    timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
    assignedVolunteer: "vol-005",
    matchedNGO: "ngo-006",
    aiNotes: "GreenWheels vehicle dispatched. ETA 35 minutes.",
  },
];

// ---- Activity Feed ----
export const mockActivityFeed: ActivityEvent[] = [
  {
    id: "evt-001",
    type: "intake",
    message: "New request received: 200 food packets available in Whitefield",
    timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
    agent: "coordinator",
    urgency: "critical",
  },
  {
    id: "evt-002",
    type: "ai_action",
    message: "Coordinator AI classified request as food_donation with CRITICAL urgency — perishable goods detected",
    timestamp: new Date(Date.now() - 24 * 60000).toISOString(),
    agent: "coordinator",
  },
  {
    id: "evt-003",
    type: "ngo_match",
    message: "Operations AI matched HelpHands Collective (2.1 km away) for food pickup",
    timestamp: new Date(Date.now() - 23 * 60000).toISOString(),
    agent: "operations",
  },
  {
    id: "evt-004",
    type: "volunteer_update",
    message: "Priya Sharma assigned as pickup volunteer — ETA 12 minutes",
    timestamp: new Date(Date.now() - 22 * 60000).toISOString(),
    agent: "operations",
  },
  {
    id: "evt-005",
    type: "outreach",
    message: "WhatsApp alert sent to 8 nearby volunteers for food sorting support",
    timestamp: new Date(Date.now() - 20 * 60000).toISOString(),
    agent: "operations",
  },
  {
    id: "evt-006",
    type: "escalation",
    message: "Medical aid request escalated — MedReach Trust at capacity, contacting backup NGOs",
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    agent: "operations",
    urgency: "critical",
  },
  {
    id: "evt-007",
    type: "ai_action",
    message: "Operations AI widened search radius to 15 km for medical aid — 2 backup NGOs identified",
    timestamp: new Date(Date.now() - 4 * 60000).toISOString(),
    agent: "operations",
    urgency: "high",
  },
  {
    id: "evt-008",
    type: "completion",
    message: "Transport delivery completed: 100 food packets delivered to Whitefield shelter",
    timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
    agent: "system",
  },
  {
    id: "evt-009",
    type: "volunteer_update",
    message: "Mohammed Aslam marked delivery as complete — requesting next assignment",
    timestamp: new Date(Date.now() - 1 * 60000).toISOString(),
    agent: "system",
  },
  {
    id: "evt-010",
    type: "ai_action",
    message: "Coordinator AI processing new intake: blanket supply request for Jayanagar night shelter",
    timestamp: new Date(Date.now() - 30000).toISOString(),
    agent: "coordinator",
    urgency: "high",
  },
];

// ---- Simulated outreach messages ----
export const mockOutreachMessages = [
  {
    id: "msg-001",
    platform: "WhatsApp",
    recipient: "Priya Sharma",
    message:
      "🚨 URGENT PICKUP REQUEST\n\nHi Priya! We have 200 food packets that need immediate pickup from Whitefield Tech Park.\n\n📍 Location: Whitefield Tech Park, Gate 3\n⏰ Window: 3 hours (perishable)\n🏢 Deliver to: HelpHands Collective\n\nCan you confirm? Reply YES to accept.",
    status: "delivered",
    timestamp: new Date(Date.now() - 22 * 60000).toISOString(),
  },
  {
    id: "msg-002",
    platform: "WhatsApp",
    recipient: "FeedIndia Foundation",
    message:
      "📋 NGO COORDINATION UPDATE\n\nHi FeedIndia team,\n\nWe have a new volunteer sorting request:\n• Location: Koramangala Warehouse\n• Need: 10 volunteers for food sorting\n• Time: Today, 2:00 PM - 6:00 PM\n\n4 volunteers confirmed. Can you assist with the remaining 6?",
    status: "read",
    timestamp: new Date(Date.now() - 118 * 60000).toISOString(),
  },
  {
    id: "msg-003",
    platform: "Emergency",
    recipient: "All Available Volunteers",
    message:
      "🔴 EMERGENCY BROADCAST\n\nMedical supplies needed urgently in Indiranagar for an elderly patient.\n\nPrimary NGO at capacity — we need ANY available volunteer with a vehicle within 10 km of Indiranagar.\n\nReply with your location to be assigned.",
    status: "sent",
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
  },
];

// ---- Stats for dashboard ----
export const dashboardStats = {
  activeRequests: 6,
  volunteersOnline: 6,
  ngosActive: 5,
  completedToday: 23,
  avgResponseTime: "8 min",
  escalations: 2,
  totalPeopleHelped: 847,
  aiActionsToday: 156,
};

// ---- Type labels and colors ----
export const typeConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  food_donation: { label: "Food Donation", color: "text-neon-green", bgColor: "bg-neon-green/10" },
  volunteer_request: { label: "Volunteer Request", color: "text-neon-blue", bgColor: "bg-neon-blue/10" },
  shelter_need: { label: "Shelter Need", color: "text-neon-orange", bgColor: "bg-neon-orange/10" },
  supply_request: { label: "Supply Request", color: "text-neon-purple", bgColor: "bg-neon-purple/10" },
  medical_aid: { label: "Medical Aid", color: "text-neon-red", bgColor: "bg-neon-red/10" },
  transport_request: { label: "Transport", color: "text-yellow-400", bgColor: "bg-yellow-400/10" },
};

export const urgencyConfig: Record<string, { label: string; color: string; dotColor: string }> = {
  critical: { label: "CRITICAL", color: "text-neon-red", dotColor: "bg-neon-red" },
  high: { label: "HIGH", color: "text-neon-orange", dotColor: "bg-neon-orange" },
  medium: { label: "MEDIUM", color: "text-neon-blue", dotColor: "bg-neon-blue" },
  low: { label: "LOW", color: "text-gray-400", dotColor: "bg-gray-400" },
};

export const statusConfig: Record<string, { label: string; color: string }> = {
  incoming: { label: "Incoming", color: "text-gray-400" },
  processing: { label: "Processing", color: "text-neon-blue" },
  matched: { label: "Matched", color: "text-neon-purple" },
  "in-progress": { label: "In Progress", color: "text-neon-orange" },
  completed: { label: "Completed", color: "text-neon-green" },
  escalated: { label: "Escalated", color: "text-neon-red" },
};
