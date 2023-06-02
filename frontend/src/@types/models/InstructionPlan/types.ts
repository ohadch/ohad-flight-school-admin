export interface IInstructionPlan {
    id: number;
    name: string;
}

export interface IInstructionPlanCreate {
    name: string;
}

export interface IInstructionPlanUpdate {
    name?: string;
}