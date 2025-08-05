// Test data for MyGuard app
export interface User {
  id: string;
  name: string;
  plotNumber: string;
  phone: string;
  userType: 'super_admin' | 'guard' | 'resident';
  isVerified: boolean;
  position?: string; // For guards only
  permissions: string[]; // Array of permission strings
}

export interface House {
  id: string;
  houseNumber: string;
  ownerName: string;
  phone: string;
  address: string;
  residents: string[]; // Array of resident names
  vehicles: Vehicle[];
  maintenanceRequests: MaintenanceRequest[];
  reports: Report[];
}

export interface MaintenanceRequest {
  id: string;
  houseId: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  houseId: string;
  reporterName: string;
  title: string;
  description: string;
  type: 'maintenance' | 'security' | 'behavior' | 'general';
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: string;
}

export interface Visitor {
  id: string;
  name: string;
  image: string;
  visitTime: string;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
  houseId: string; // Which house they're visiting
  approvedBy?: string; // Guard who approved
}

export interface Flatmate {
  id: string;
  name: string;
  relation: 'owner' | 'owner-family' | 'tenant';
  residing: boolean; // whether they currently live there
  plotNumber: string;
}

export interface Vehicle {
  id: string;
  ownerName: string;
  vehicleNumber: string;
  vehicleType: '4-wheeler' | '2-wheeler';
  plotNumber: string;
  houseId: string;
}

// Sample houses data
export const testHouses: House[] = [
  {
    id: '1',
    houseNumber: 'A-101',
    ownerName: 'Anuj Munda',
    phone: '7451235671',
    address: 'Block A, Floor 1, Flat 101',
    residents: ['Anuj Munda', 'Priya Munda'],
    vehicles: [],
    maintenanceRequests: [],
    reports: []
  },
  {
    id: '2',
    houseNumber: 'B-205',
    ownerName: 'Rahul Sharma',
    phone: '9876543210',
    address: 'Block B, Floor 2, Flat 205',
    residents: ['Rahul Sharma'],
    vehicles: [],
    maintenanceRequests: [],
    reports: []
  },
  {
    id: '3',
    houseNumber: 'C-301',
    ownerName: 'Sita Patel',
    phone: '8765432109',
    address: 'Block C, Floor 3, Flat 301',
    residents: ['Sita Patel', 'Raj Patel'],
    vehicles: [],
    maintenanceRequests: [],
    reports: []
  }
];

// Sample users with role-based permissions
export const testUsers: User[] = [
  {
    id: '1',
    name: 'Anuj Munda',
    plotNumber: 'A-101',
    phone: '7451235671',
    userType: 'resident',
    isVerified: true,
    permissions: [
      'view_own_profile',
      'edit_own_profile',
      'view_own_visitors',
      'manage_own_visitors',
      'view_own_vehicles',
      'manage_own_vehicles',
      'create_reports',
      'view_maintenance_reports',
      'give_feedback'
    ]
  },
  {
    id: '2',
    name: 'Rishabh',
    plotNumber: 'Gate-A',
    phone: '9876543210',
    userType: 'guard',
    isVerified: true,
    position: 'Senior Security Officer',
    permissions: [
      'view_all_houses',
      'view_house_details',
      'view_resident_contacts',
      'view_maintenance_requests',
      'view_reports',
      'approve_visitors',
      'manage_visitor_entries',
      'create_security_reports',
      'view_vehicle_entries'
    ]
  },
  {
    id: '3',
    name: 'Super Admin',
    plotNumber: 'Admin Office',
    phone: '1234567890',
    userType: 'super_admin',
    isVerified: true,
    permissions: [
      'view_all_users',
      'manage_all_users',
      'view_all_houses',
      'manage_all_houses',
      'view_all_visitors',
      'manage_all_visitors',
      'view_all_reports',
      'manage_all_reports',
      'view_all_maintenance',
      'manage_all_maintenance',
      'view_analytics',
      'system_settings'
    ]
  }
];

// Sample visitors
export const testVisitors: Visitor[] = [
  {
    id: '1',
    name: 'John Doe',
    image: 'https://via.placeholder.com/60',
    visitTime: '2024-01-15 10:30 AM',
    purpose: 'Meeting',
    status: 'approved',
    houseId: '1',
    approvedBy: 'Rishabh'
  },
  {
    id: '2',
    name: 'Jane Smith',
    image: 'https://via.placeholder.com/60',
    visitTime: '2024-01-15 11:15 AM',
    purpose: 'Delivery',
    status: 'approved',
    houseId: '2',
    approvedBy: 'Rishabh'
  },
  {
    id: '3',
    name: 'Alice Johnson',
    image: 'https://via.placeholder.com/60',
    visitTime: '2024-01-15 02:45 PM',
    purpose: 'Maintenance',
    status: 'pending',
    houseId: '1'
  }
];

// Sample maintenance requests
export const testMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: '1',
    houseId: '1',
    title: 'Water Leak',
    description: 'Water leaking from bathroom ceiling',
    status: 'pending',
    priority: 'high',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    houseId: '2',
    title: 'AC Not Working',
    description: 'Air conditioner not cooling properly',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-15T09:00:00Z'
  }
];

// Sample reports
export const testReports: Report[] = [
  {
    id: '1',
    houseId: '1',
    reporterName: 'Anuj Munda',
    title: 'Suspicious Activity',
    description: 'Saw someone loitering around Block A',
    type: 'security',
    status: 'pending',
    createdAt: '2024-01-15T08:00:00Z'
  },
  {
    id: '2',
    houseId: '2',
    reporterName: 'Rahul Sharma',
    title: 'Noise Complaint',
    description: 'Loud music from neighboring flat',
    type: 'behavior',
    status: 'reviewed',
    createdAt: '2024-01-14T22:00:00Z'
  }
];

// Sample notices
export const testNotices = [
  {
    id: '1',
    title: 'Notice',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '2024-01-15'
  },
  {
    id: '2',
    title: 'Maintenance Alert',
    content: 'Water supply will be interrupted tomorrow from 10 AM to 2 PM for maintenance work.',
    date: '2024-01-14'
  }
];

// Authentication helper
export const authenticateUser = (phone: string, otp: string): User | null => {
  // Simple mock authentication - in real app, this would call an API
  if (otp === '4545') {
    return testUsers.find(user => user.phone === phone) || null;
  }
  return null;
};

// Permission helper functions
export const hasPermission = (user: User, permission: string): boolean => {
  return user.permissions.includes(permission);
};

export const canAccessHouse = (user: User, houseId: string): boolean => {
  if (user.userType === 'super_admin') return true;
  if (user.userType === 'guard') return true;
  if (user.userType === 'resident') {
    const house = testHouses.find(h => h.id === houseId);
    return house?.ownerName === user.name;
  }
  return false;
};

// Document types for verification
export const documentTypes = [
  { label: 'Aadhar Card', value: 'aadhar' },
  { label: 'Pan Card', value: 'pan' },
  { label: 'Voter ID', value: 'voter' },
  { label: 'Driving License', value: 'license' },
  { label: 'Passport', value: 'passport' },
];
