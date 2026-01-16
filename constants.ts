import { ProjectStat, MatrixColumn, ChartDataPoint } from './types';

export const PROJECT_STATS: ProjectStat[] = [
  { id: 'P1', name: 'Refactoring API', status: 'active', tasksCompleted: 45, totalTasks: 60, percentage: 75 },
  { id: 'P2', name: 'Nowy Landing Page', status: 'active', tasksCompleted: 12, totalTasks: 20, percentage: 60 },
  { id: 'P3', name: 'Migracja Bazy Danych', status: 'planning', tasksCompleted: 2, totalTasks: 50, percentage: 4 },
  { id: 'P4', name: 'System Autoryzacji', status: 'completed', tasksCompleted: 30, totalTasks: 30, percentage: 100 },
  { id: 'P5', name: 'Panel Admina v2', status: 'active', tasksCompleted: 85, totalTasks: 120, percentage: 71 },
  { id: 'P6', name: 'Integracja Stripe', status: 'on-hold', tasksCompleted: 15, totalTasks: 15, percentage: 100 },
  { id: 'P7', name: 'Testy E2E', status: 'active', tasksCompleted: 5, totalTasks: 40, percentage: 12 },
  { id: 'P8', name: 'Optymalizacja SEO', status: 'planning', tasksCompleted: 0, totalTasks: 10, percentage: 0 },
];

// Matrix representing Project Phases (Kanban-like but in matrix view)
export const PROJECT_MATRIX: MatrixColumn[] = [
  {
    id: 'ideas',
    title: 'Bank Pomysłów',
    items: [
      { id: 'i1', title: 'Moduł AI Chat', priority: 'low', count: '0/5', progress: 0 },
      { id: 'i2', title: 'Dark Mode Mobilny', priority: 'medium', count: '0/1', progress: 0 },
      { id: 'i3', title: 'System powiadomień', priority: 'high', count: '1/4', progress: 25 },
    ]
  },
  {
    id: 'analysis',
    title: 'Analiza & Design',
    items: [
      { id: 'a1', title: 'Makiety UX Dashboard', priority: 'high', count: '4/5', progress: 80 },
      { id: 'a2', title: 'Specyfikacja API', priority: 'high', count: '1/1', progress: 100 },
    ]
  },
  {
    id: 'todo',
    title: 'Do Zrobienia',
    items: [
      { id: 't1', title: 'Setup środowiska', priority: 'medium', count: '0/3', progress: 0 },
      { id: 't2', title: 'Konfig Docker', priority: 'low', count: '0/1', progress: 0 },
      { id: 't3', title: 'Migracja usera', priority: 'high', count: '2/10', progress: 20 },
    ]
  },
  {
    id: 'dev',
    title: 'Development',
    items: [
      { id: 'd1', title: 'Komponent Wykresu', priority: 'high', count: '8/10', progress: 80 },
      { id: 'd2', title: 'Logika Auth', priority: 'high', count: '2/2', progress: 100 },
      { id: 'd3', title: 'Sidebar layout', priority: 'medium', count: '1/1', progress: 100 },
    ]
  },
  {
    id: 'review',
    title: 'Code Review',
    items: [
      { id: 'r1', title: 'Pull Request #42', priority: 'high', count: '1/3', progress: 33 },
      { id: 'r2', title: 'Optymalizacja zapytań', priority: 'medium', count: '1/4', progress: 25 },
    ]
  },
  {
    id: 'testing',
    title: 'Testy QA',
    items: [
      { id: 'q1', title: 'Testy integracyjne', priority: 'high', count: '50/50', progress: 100 },
      { id: 'q2', title: 'Testy wydajności', priority: 'low', count: '0/1', progress: 0 },
    ]
  },
  {
    id: 'done',
    title: 'Wdrożone',
    items: [
      { id: 'done1', title: 'Wersja MVP 1.0', priority: 'high', count: '100/100', progress: 100 },
      { id: 'done2', title: 'Fix: Logowanie', priority: 'high', count: '1/1', progress: 100 },
      { id: 'done3', title: 'Analityka', priority: 'medium', count: '5/5', progress: 100 },
    ]
  },
];

// Generate fake chart data for the last 30 days
export const CHART_DATA: ChartDataPoint[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  // Simulated cumulative progress
  const baseScope = 100;
  const scopeGrowth = i * 2; // Scope grows over time
  const completedBase = i * 3 + (Math.random() * 10);
  
  return {
    date,
    scope: baseScope + scopeGrowth,
    completed: Math.min(baseScope + scopeGrowth, completedBase)
  };
});