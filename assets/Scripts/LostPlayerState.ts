import { Vec2 } from "cc";
import { EnemyInput } from "./EnemyInput";
import { IState } from "./IState";

export class LostPlayerState implements IState {

    private timer: number = 0;
    private waitTime: number = 0.5

   enter(brain: EnemyInput): void {
       brain.setMoveDirection(Vec2.ZERO);
       this.timer = this.waitTime;
   }
   execute(brain: EnemyInput, dt: number): void {
       this.timer -= dt;
       let myPos = new Vec2(brain.node.worldPosition.x, brain.node.worldPosition.y);

       if (brain.getDistanceToPlayer(myPos) < brain.spotPlayerDistance) {
        brain.changeState(brain.chaseState);
        return
       }

       if (this.timer <= 0) {
        brain.changeState(brain.patrolState);
       }
   }
   exit(brain: EnemyInput): void {
       
   }
}


