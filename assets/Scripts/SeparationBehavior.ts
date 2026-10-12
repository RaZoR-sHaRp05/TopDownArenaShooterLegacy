import { math, Vec2 } from "cc";
import { ISteeringBehavior } from "./ISteeringBehavior";
import { EnemyMovement } from "./EnemyMovement";

export class SeparationBehavior implements ISteeringBehavior {
    
    private brain: EnemyMovement;
    private separationRadius: number;

    constructor(movementSystem: EnemyMovement, separationRadius: number) {
        this.brain = movementSystem;
        this.separationRadius = separationRadius;
    }

    getDesiredVelocity(currentPosition: math.Vec2, targetPosition?: Readonly<math.Vec2>): math.Vec2 {
        let neighbors = this.brain.getNeighbors();
        let separationForce = new Vec2;

        if (neighbors.length <= 0) return separationForce;

        let pushCount = 0;

        for (let neighbor of neighbors) {
            let distance = Vec2.distance(currentPosition, neighbor);

            if (distance < this.separationRadius) {
                let pushVector = new Vec2;

                if (distance === 0) {
                    pushVector.set(math.randomRange(-0.1, 0.1), math.randomRange(-0.1, 0.1))
                }
                else {
                    Vec2.subtract(pushVector, currentPosition, neighbor);
                    pushVector.normalize();
                    let strength = 1.0 - (distance / this.separationRadius);
                    pushVector.multiplyScalar(strength);
                }

                separationForce.add(pushVector);
                pushCount++;
            }

            if (pushCount > 0) {
                separationForce.multiplyScalar(1.0 / pushCount);
            }
            return separationForce;
        }
    }
}


