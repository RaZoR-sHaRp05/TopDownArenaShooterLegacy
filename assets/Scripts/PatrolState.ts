import { Vec2, log } from "cc";
import { EnemyInput } from "./EnemyInput";
import { IState } from "./IState";

export class PatrolState implements IState {

    private stuckTimer: number = 0;
    private stuckThresholdTime: number = 0.5;
    
    enter(brain: EnemyInput): void {
        this.stuckTimer = 0
    }
    execute(brain: EnemyInput, dt: number): void {

        let myPos = new Vec2(brain.node.worldPosition.x, brain.node.worldPosition.y);

        if (brain.getDistanceToPlayer(myPos) < brain.spotPlayerDistance) {
            brain.changeState(brain.chaseState)
            log ("Spotted player")
            return;
        }

        if (brain.wander.hasArrived(myPos)) {
            brain.wander.pickNewWanderPoint();
            brain.changeState(brain.arrivedState)
            return;
        }

        if (brain.isMovingSlowly) {
            this.stuckTimer += dt;

            if (this.stuckTimer >= this.stuckThresholdTime) {
                brain.changeState(brain.stuckState);
                return;
            }
        }
        else {
            this.stuckTimer = Math.max(0, this.stuckTimer - (dt * 2));
        }

        let dir = brain.wander.getDesiredVelocity(myPos);
        brain.setMoveDirection(dir);
    }
    exit(brain: EnemyInput): void {
        
    }
}


