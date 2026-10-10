import { _decorator, Component, Node, find, Vec2 } from 'cc';
import { EnemyInput } from './EnemyInput';
import { EnemyMovement } from './EnemyMovement';
import { HealthSystem } from './HealthSystem';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {

    private inputSystem: EnemyInput | null = null;
    private movementSystem: EnemyMovement | null = null;
    private healthSystem: HealthSystem | null = null;
    private targetNode: Node | null = null;

    protected onLoad(): void {
        this.inputSystem = this.getComponent(EnemyInput);
        this.movementSystem = this.getComponent(EnemyMovement);
        this.healthSystem = this.getComponent(HealthSystem);

        if (this.healthSystem) {
            this.healthSystem.initialize(20);
        }

        if (this.inputSystem) {
            this.targetNode = find("Canvas/Player");
            let wanderPoints = this.node.getParent().getChildByName("WanderNodes").children.map(
                child => new Vec2(child.worldPosition.x, child.worldPosition.y)
            );
            this.inputSystem.initialize(this.targetNode, wanderPoints);
        }

    }

    start() {

    }

    update(deltaTime: number) {
        if (this.healthSystem) {
            if (this.healthSystem.isDead) {
                this.node.destroy();
            }
        }

        if (this.inputSystem && this.movementSystem) {

            let isSlow = this.movementSystem.isMovingSlowly();
            this.inputSystem.isMovingSlowly = isSlow;

            this.inputSystem.processFSM(deltaTime);

            let moveDir = this.inputSystem.getMoveDirection();

            this.movementSystem.updateMovement(moveDir);

            let targetAngle = this.inputSystem.getRotationAngle();
            this.movementSystem.updateRotation(targetAngle);
        }

        if (this.inputSystem.stateDebugLabel) {
            this.inputSystem.stateDebugLabel.node.angle = -this.node.angle;
        }
    }
}


