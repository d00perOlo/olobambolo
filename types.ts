export interface ProjectStat {
  id: string;
  name: string;
  status: 'active' | 'on-hold' | 'completed' | 'planning';
  tasksCompleted: number;
  totalTasks: number;
  percentage: number;
}

export interface MatrixItem {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  count: string; // e.g., "Subtasks: 2/5"
  progress: number;
}

export interface MatrixColumn {
  id: string;
  title: string;
  items: MatrixItem[];
}

export enum ViewMode {
  DASHBOARD = 'DASHBOARD',
  TASKS = 'TASKS',
  IDEAS = 'IDEAS',
  ARCHIVE = 'ARCHIVE'
}

export interface ChartDataPoint {
  date: Date;
  completed: number;
  scope: number;
}