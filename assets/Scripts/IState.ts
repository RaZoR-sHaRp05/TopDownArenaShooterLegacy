import { EnemyInput } from "./EnemyInput";

export interface IState {
    enter(brain: EnemyInput): void;
    execute(brain: EnemyInput, dt: number): void;
    exit(brain: EnemyInput): void;
}