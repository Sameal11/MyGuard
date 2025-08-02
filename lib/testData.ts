// Test data for MyGuard app
export interface User {
  id: string;
  name: string;
  plotNumber: string;
  phone: string;
  userType: 'resident' | 'guard';
  isVerified: boolean;
  position?: string; // For guards only
}

export interface Visitor {
  id: string;
  name: string;
  image: string;
  visitTime: string;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
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
}

// Sample users
export const testUsers: User[] = [
  {
    id: '1',
    name: 'Anuj Munda',
    plotNumber: 'Plot-101',
    phone: '7451235671',
    userType: 'resident',
    isVerified: true
  },
  {
    id: '2',
    name: 'Rishabh',
    plotNumber: 'Gate-A',
    phone: '9876543210',
    userType: 'guard',
    isVerified: true,
    position: 'Senior Security Officer'
  },
  {
    id: '3',
    name: 'Security Guard',
    plotNumber: 'Gate-B',
    phone: '1234567890',
    userType: 'guard',
    isVerified: false,
    position: 'Night Shift Guard'
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
    status: 'approved'
  },
  {
    id: '2',
    name: 'Jane Smith',
    image: 'https://via.placeholder.com/60',
    visitTime: '2024-01-15 11:15 AM',
    purpose: 'Delivery',
    status: 'approved'
  },
  {
    id: '3',
    name: 'Alice Johnson',
    image: 'https://via.placeholder.com/60',
    visitTime: '2024-01-15 02:45 PM',
    purpose: 'Maintenance',
    status: 'pending'
  },
  {
    id: '4',
    name: 'Bob Brown',
    image: 'https://via.placeholder.com/60',
    visitTime: '2024-01-15 03:30 PM',
    purpose: 'Guest',
    status: 'approved'
  },
  {
    id: '5',
    name: 'Plumber',
    image: 'https://via.placeholder.com/60',
    visitTime: '2024-01-15 04:00 PM',
    purpose: 'Repair',
    status: 'approved'
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

// Document types for verification
export const documentTypes = [
  { label: 'Aadhar Card', value: 'aadhar' },
  { label: 'Pan Card', value: 'pan' },
  { label: 'Voter ID', value: 'voter' },
  { label: 'Driving License', value: 'license' },
  { label: 'Passport', value: 'passport' },
];
