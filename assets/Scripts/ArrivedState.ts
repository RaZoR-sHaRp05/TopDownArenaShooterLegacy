import { Vec2 } from "cc";
import { EnemyInput } from "./EnemyInput";
import { IState } from "./IState";

export class ArrivedState implements IState {
   
    private waitTime: number = 2.0;
    private timer: number = 0;

    enter(brain: EnemyInput): void {
        brain.setMoveDirection(Vec2.ZERO);
        this.timer = this.waitTime;
    }
    execute(brain: EnemyInput, dt: number): void {
        this.timer -= dt;
        let myPos = new Vec2(brain.node.worldPosition.x, brain.node.worldPosition.y);

        if (this.timer <= 0) {
            //brain.wander.pickNewWanderPoint();
            brain.changeState(brain.patrolState);
        }
    }
    exit(brain: EnemyInput): void {
        
    }
}


