import { math, Vec2 } from "cc";
import { ISteeringBehavior } from "./ISteeringBehavior";
import { MovementConfig } from "./EnemyConfig";
import { EnemyMovement } from "./EnemyMovement";
import { AvoidBehavior } from "./AvoidBehavior";
import { SeparationBehavior } from "./SeparationBehavior";
import { Alignment_Behavior } from "./Alignment Behavior";
import { CohesionBehavior } from "./CohesionBehavior";

export class TacticalSteeringBehavior implements ISteeringBehavior {
    private movementConfig: MovementConfig;
    private currentHitNormals: Vec2[] = [];
    private brain: EnemyMovement;
    private avoidBehavior: AvoidBehavior;
    private separationBehavior: SeparationBehavior;
    private alignmentBehavior: Alignment_Behavior;
    private cohesionBehavior: CohesionBehavior;

    constructor(movementConfig: MovementConfig, enemyMovement: EnemyMovement) {
        this.movementConfig = movementConfig;
        this.brain = enemyMovement
        this.avoidBehavior = new AvoidBehavior(enemyMovement, movementConfig.whiskers);
        this.separationBehavior = new SeparationBehavior(enemyMovement, movementConfig.flocking.seperationRadius);
        this.alignmentBehavior = new Alignment_Behavior(enemyMovement, movementConfig.flocking.alignmentRadius);
        this.cohesionBehavior = new CohesionBehavior(enemyMovement, movementConfig.flocking.cohesionRadius);
    }


    getDesiredVelocity(currentPosition: math.Vec2, targetPosition?: Readonly<math.Vec2>): math.Vec2 {
       let totalTacticalForce = new Vec2;

       if (this.movementConfig.avoidWeight > 0) {
        let avoidForce = this.avoidBehavior.getDesiredVelocity(currentPosition);

        avoidForce.multiplyScalar(this.movementConfig.avoidWeight)
        totalTacticalForce.add(avoidForce);
       }

       if (this.movementConfig.flocking.seperationWeight > 0) {
            let separationForce = this.separationBehavior.getDesiredVelocity(currentPosition)
            separationForce.multiplyScalar(this.movementConfig.flocking.seperationWeight);
            totalTacticalForce.add(separationForce);
       }

       if (this.movementConfig.flocking.alignmentWeight > 0) {
            let alignmentForce = this.alignmentBehavior.getDesiredVelocity(currentPosition);
            alignmentForce.multiplyScalar(this.movementConfig.flocking.cohesionWeight);
            totalTacticalForce.add(alignmentForce);
       }

       if (this.movementConfig.flocking.cohesionWeight > 0) {
            let cohesionForce = this.cohesionBehavior.getDesiredVelocity(currentPosition);
            cohesionForce.multiplyScalar(this.movementConfig.flocking.cohesionWeight);
            totalTacticalForce.add(cohesionForce);
       }

       if (totalTacticalForce.lengthSqr() > 1.0) {
        totalTacticalForce.normalize()
       }

       return totalTacticalForce;
   }
}


