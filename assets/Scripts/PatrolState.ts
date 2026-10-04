import { Vec2, log } from "cc";
import { EnemyInput } from "./EnemyInput";
import { IState } from "./IState";

export class PatrolState implements IState {
    
    enter(brain: EnemyInput): void {

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

        let dir = brain.wander.getDesiredVelocity(myPos);
        brain.setMoveDirection(dir);
    }
    exit(brain: EnemyInput): void {
        
    }
}


