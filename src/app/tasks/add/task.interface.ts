interface ITask {
    id?: number;
    name: string;
    type: string;
    dueDate: Date;
    description: string;
    username: string;
   
  }
  interface ITaskTypeOption {
    type: string;
  }
  
  interface ITypePercentage {
    count: number;
    type: string;
  }
  
  export { ITask, ITaskTypeOption, ITypePercentage };
  
  