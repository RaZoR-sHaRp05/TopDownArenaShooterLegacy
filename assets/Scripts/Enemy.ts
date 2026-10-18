import { _decorator, Component, Node, find, Vec2, JsonAsset, log } from 'cc';
import { EnemyInput } from './EnemyInput';
import { EnemyMovement } from './EnemyMovement';
import { HealthSystem } from './HealthSystem';
import { EnemyConfig, IntentConfig, MovementConfig } from './EnemyConfig';
import { EventBus, GameEvents } from './EventBus';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {



    private inputSystem: EnemyInput | null = null;
    private movementSystem: EnemyMovement | null = null;
    private healthSystem: HealthSystem | null = null;
    
    private configLoaded: boolean = false;

    @property({ type: JsonAsset })
    public testConfigFile: JsonAsset | null = null;

    protected onLoad(): void {
    
    }

    protected start(): void {
        if (!this.configLoaded) {
            if (this.testConfigFile && this.testConfigFile.json) {
                let configData = this.testConfigFile.json as unknown as EnemyConfig;
                log(`[Enemy] reading conifguration file from ${this.testConfigFile.name}`);
                this.init(configData);
            }
            else {
                log('[Enemy] No JSON config file attached')
            }
        }
    }

    public init(enemyConfig: EnemyConfig, providedTarget?: Node, providedWanderPoints?: Vec2[]) {
        if (!this.inputSystem) {
            this.inputSystem = this.getComponent(EnemyInput);
        }
        if (!this.movementSystem) {
            this.movementSystem = this.getComponent(EnemyMovement);
        }
        if (!this.healthSystem) {
            this.healthSystem = this.getComponent(HealthSystem);
        }

        this.configLoaded = true;

        this.node.setScale(enemyConfig.scale.x, enemyConfig.scale.y);

        if (this.healthSystem) {
            this.healthSystem.initialize(20);
        }

        if (this.inputSystem) {
            let targetNode = providedTarget || find("Canvas/Player");
            let wanderPoints = providedWanderPoints
            if (!wanderPoints) {
                this.node.getParent().getChildByName("WanderNodes").children.map(
                    child => new Vec2(child.worldPosition.x, child.worldPosition.y));
            }

            this.inputSystem.initialize(targetNode, wanderPoints, enemyConfig.intent);
        }

        if (this.movementSystem) {
            this.movementSystem.init(enemyConfig.intent.maxSpeed, enemyConfig.moving)
        }

        if (this.healthSystem) {
            this.healthSystem.initialize(enemyConfig.health);
        }
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

    protected onDestroy(): void {
        EventBus.emit(GameEvents.ENEMY_DIED, this);
    }
}


