import { _decorator, Camera, Component, EventKeyboard, EventMouse, Node, Prefab } from 'cc';
import { PlayerInput } from './PlayerInput';
import { PlayerMovement } from './PlayerMovement';
import { PlayerWeapon } from './PlayerWeapon';
import { WeaponConfig } from './WeaponConfig';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    private inputSystem: PlayerInput | null = null;
    private movementSystem: PlayerMovement | null = null;
    private weaponSystem: PlayerWeapon | null = null;
    private mainCamera: Camera | null = null;

    protected onLoad(): void {
        this.inputSystem = this.getComponent(PlayerInput);
        this.movementSystem = this.getComponent(PlayerMovement);
        this.weaponSystem = this.getComponent(PlayerWeapon);
    }

    public initialize (camera: Camera): void {
        this.mainCamera = camera
    }


    public initializeWeapon(config: WeaponConfig, bulletPrefab: Prefab, bulletContainer: Node) {
        if (this.weaponSystem) {
            this.weaponSystem.equipWeapon(config, bulletPrefab, bulletContainer, this.node);
        }
    }

    start() {

    }


    protected update(deltaTime: number) {
        if (this.inputSystem && this.movementSystem) {
            let moveDir = this.inputSystem.getMoveDirection()
            this.movementSystem.updateMovement(moveDir);
        }

        if (this.inputSystem && this.weaponSystem) {
            let isFiring = this.inputSystem.isShooting;
            this.weaponSystem.processFiring(isFiring, this.node.angle)
        }
    }


    public processKeyDown(event: EventKeyboard): void { 
        if (this.inputSystem) this.inputSystem.handleKeyDown(event);
    }
    public processKeyUp(event: EventKeyboard): void { 
        if (this.inputSystem) this.inputSystem.handleKeyUp(event);
    }
    public processMouseMove(event: EventMouse): void { 
        if (this.inputSystem && this.movementSystem && this.mainCamera) {
            let targetAngle = this.inputSystem.handleMouseMove(event, this.mainCamera, this.node.getWorldPosition());
            this.movementSystem.updateRotation(targetAngle);
        }
    }
    public processMouseDown(event: EventMouse): void { 
        if (this.inputSystem) this.inputSystem.handleMouseDown(event);
        if (this.weaponSystem) this.weaponSystem.triggerSingleShot(this.node.angle);
    }
    public processMouseUp(event: EventMouse): void { 
        if (this.inputSystem) this.inputSystem.handleMouseUp(event);
    }
}


