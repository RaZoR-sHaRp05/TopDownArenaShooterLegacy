import { _decorator, Component, Node, find } from 'cc';
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

        this.targetNode = find("Canvas/Player");
        this.inputSystem.initialize(this.targetNode);
    }

    start() {

    }

    update(deltaTime: number) {
        if (this.healthSystem) {
            if (this.healthSystem.isDead) {
                this.node.destroy();
            }
        }

        if (this.inputSystem && this.movementSystem && this.targetNode) {

            let moveDir = this.inputSystem.getMoveDirection();

            this.movementSystem.updateMovement(moveDir);

            let targetAngle = this.inputSystem.getRotationAngle();
            this.movementSystem.updateRotation(targetAngle);
        }
    }
}


