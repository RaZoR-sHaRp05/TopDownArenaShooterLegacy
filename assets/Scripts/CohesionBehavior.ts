import { math, Vec2 } from "cc";
import { ISteeringBehavior } from "./ISteeringBehavior";
import { EnemyMovement } from "./EnemyMovement";

export class CohesionBehavior implements ISteeringBehavior {
    
    private brain: EnemyMovement;
    private cohesionRadius: number;

    constructor(enemyMovement: EnemyMovement, cohesionRadius: number) {
        this.brain = enemyMovement;
        this.cohesionRadius = cohesionRadius;
    }
    
    getDesiredVelocity(currentPosition: math.Vec2, targetPosition?: Readonly<math.Vec2>): math.Vec2 {
        let neighbors = this.brain.getNeighborData();
        let cohesionForce = new Vec2;

        if (neighbors.length <= 0) return cohesionForce;

        let centerOfMass = new Vec2;
        let neighborCount = 0;

        for (let neighbor of neighbors) {
            let distance = Vec2.distance(currentPosition, neighbor.position);

            if (distance < this.cohesionRadius) {
                centerOfMass.add(neighbor.position);
                neighborCount++;
            }
        }

        if (neighborCount === 0) return cohesionForce;

        centerOfMass.multiplyScalar(1.0 / neighborCount);
        Vec2.subtract(cohesionForce, centerOfMass, currentPosition);

        let distanceToCenter = cohesionForce.length();
        cohesionForce.normalize();

        let strength = Math.min(distanceToCenter / this.cohesionRadius, 1.0);
        cohesionForce.multiplyScalar(strength);

        return cohesionForce;
    }
}


