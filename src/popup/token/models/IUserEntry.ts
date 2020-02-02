export interface IUserEntry {
  id: string;
  date: string;
  activity: {
    fullName: string;
    taskKey: number;
    projectId: string;
    beginDate: string;
    endDate: string;
    billable: boolean;
  };
  userId: string;
  startTime: string;
  endTime: string;
  totalWorkedHours: number;
}
