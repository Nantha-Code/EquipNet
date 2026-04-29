/**
 * EquipNet India — API Service Layer
 * Currently reads from local JSON data + localStorage.
 * Designed for easy swap to real Flask API in Phase 2.
 */

import equipmentData from '../data/equipment.json';
import usersData from '../data/users.json';

const API_BASE = '/api'; // Will be used in Phase 2

// ── Helper: localStorage wrapper ──
const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch { return null; }
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key) => {
    localStorage.removeItem(key);
  }
};

// ── Initialize localStorage with seed data ──
function initializeData() {
  if (!storage.get('equipnet_equipment')) {
    storage.set('equipnet_equipment', equipmentData);
  }
  if (!storage.get('equipnet_users')) {
    storage.set('equipnet_users', usersData);
  }
  if (!storage.get('equipnet_requests')) {
    storage.set('equipnet_requests', []);
  }
}

initializeData();

// ── Simulate async delay ──
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================
// AUTH API
// ============================================

export async function loginUser(email, password) {
  await delay(500);
  const users = storage.get('equipnet_users') || [];
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    throw new Error('Invalid email or password');
  }
  const { password: _, ...safeUser } = user;
  storage.set('equipnet_currentUser', safeUser);
  return safeUser;
}

export async function registerUser(userData) {
  await delay(500);
  const users = storage.get('equipnet_users') || [];
  
  if (users.find(u => u.email === userData.email)) {
    throw new Error('Email already registered');
  }
  
  const newUser = {
    id: Date.now(),
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: userData.role || 'Student',
    institution: userData.institution || ''
  };
  
  users.push(newUser);
  storage.set('equipnet_users', users);
  
  const { password: _, ...safeUser } = newUser;
  storage.set('equipnet_currentUser', safeUser);
  return safeUser;
}

export function getCurrentUser() {
  return storage.get('equipnet_currentUser');
}

export function logoutUser() {
  storage.remove('equipnet_currentUser');
}

// ============================================
// EQUIPMENT API
// ============================================

export async function getEquipment(filters = {}) {
  await delay(300);
  let equipment = storage.get('equipnet_equipment') || [];
  
  if (filters.search) {
    const q = filters.search.toLowerCase();
    equipment = equipment.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.institution.toLowerCase().includes(q)
    );
  }
  
  if (filters.location) {
    equipment = equipment.filter(e => e.location === filters.location);
  }
  
  if (filters.type) {
    equipment = equipment.filter(e => e.usageType === filters.type);
  }
  
  if (filters.availability) {
    equipment = equipment.filter(e => e.availabilityStatus === filters.availability);
  }
  
  return equipment;
}

export async function getEquipmentById(id) {
  await delay(200);
  const equipment = storage.get('equipnet_equipment') || [];
  const item = equipment.find(e => e.id === Number(id));
  if (!item) throw new Error('Equipment not found');
  return item;
}

export async function addEquipment(equipmentItem) {
  await delay(400);
  const equipment = storage.get('equipnet_equipment') || [];
  const newItem = {
    ...equipmentItem,
    id: Date.now(),
    availabilityStatus: equipmentItem.availabilityStatus || 'Available'
  };
  equipment.push(newItem);
  storage.set('equipnet_equipment', equipment);
  return newItem;
}

export async function updateEquipment(id, updates) {
  await delay(400);
  const equipment = storage.get('equipnet_equipment') || [];
  const index = equipment.findIndex(e => e.id === Number(id));
  if (index === -1) throw new Error('Equipment not found');
  equipment[index] = { ...equipment[index], ...updates };
  storage.set('equipnet_equipment', equipment);
  return equipment[index];
}

export async function deleteEquipment(id) {
  await delay(300);
  let equipment = storage.get('equipnet_equipment') || [];
  equipment = equipment.filter(e => e.id !== Number(id));
  storage.set('equipnet_equipment', equipment);
  return { success: true };
}

// ============================================
// REQUESTS API
// ============================================

export async function submitRequest(requestData) {
  await delay(500);
  const requests = storage.get('equipnet_requests') || [];
  const newRequest = {
    id: Date.now(),
    userId: requestData.userId,
    userName: requestData.userName,
    userEmail: requestData.userEmail,
    equipmentId: requestData.equipmentId,
    equipmentName: requestData.equipmentName,
    purpose: requestData.purpose || '',
    startDate: requestData.startDate || '',
    endDate: requestData.endDate || '',
    status: 'Pending',
    requestDate: new Date().toISOString()
  };
  requests.push(newRequest);
  storage.set('equipnet_requests', requests);
  return newRequest;
}

export async function getUserRequests(userId) {
  await delay(300);
  const requests = storage.get('equipnet_requests') || [];
  return requests.filter(r => r.userId === userId);
}

export async function getAllRequests() {
  await delay(300);
  return storage.get('equipnet_requests') || [];
}

export async function updateRequestStatus(requestId, status) {
  await delay(300);
  const requests = storage.get('equipnet_requests') || [];
  const index = requests.findIndex(r => r.id === Number(requestId));
  if (index === -1) throw new Error('Request not found');
  requests[index].status = status;
  storage.set('equipnet_requests', requests);
  return requests[index];
}

// ── Utility: Get unique filter values ──
export function getFilterOptions() {
  const equipment = storage.get('equipnet_equipment') || [];
  return {
    locations: [...new Set(equipment.map(e => e.location))].sort(),
    types: [...new Set(equipment.map(e => e.usageType))].sort(),
    statuses: ['Available', 'Booked', 'Maintenance']
  };
}
