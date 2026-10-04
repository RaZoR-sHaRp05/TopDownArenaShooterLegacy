import { Vec2 } from "cc";
import { EnemyInput } from "./EnemyInput";
import { IState } from "./IState";

export class ChaseState implements IState {
    enter(brain: EnemyInput): void {
        
    }
    execute(brain: EnemyInput, dt: number): void {
        if (!brain.targetNode) return;

        let myPos = new Vec2(brain.node.worldPosition.x, brain.node.worldPosition.y)

        if (brain.getDistanceToPlayer(myPos) > brain.losePlayerDistance) {
            brain.changeState(brain.lostPlayerState);
            return;
        }

        let dir = brain.seek.getDesiredVelocity(myPos, brain.getPlayerPos())
        brain.setMoveDirection(dir);
    }
    exit(brain: EnemyInput): void {
        
    }
}


