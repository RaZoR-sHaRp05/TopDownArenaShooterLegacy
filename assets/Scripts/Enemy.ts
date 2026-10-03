import { _decorator, Component, Node } from 'cc';
import { EnemyInput } from './EnemyInput';
import { EnemyMovement } from './EnemyMovement';
import { HealthSystem } from './HealthSystem';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {

    private inputSystem: EnemyInput | null = null;
    private movementSystem: EnemyMovement | null = null;
    private healthSystem: HealthSystem | null = null;

    protected onLoad(): void {
        this.inputSystem = this.getComponent(EnemyInput);
        this.movementSystem = this.getComponent(EnemyMovement);
        this.healthSystem = this.getComponent(HealthSystem);

        if (this.healthSystem) {
            this.healthSystem.initialize(20);
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
    }
}


