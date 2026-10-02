import { _decorator, Camera, Component, EventKeyboard, EventMouse, Input, input, Node, Prefab } from 'cc';
import { Player } from './Player';
import { DOUBLE_GUN, FORWARD_REAR_PISTOL, PISTOL, SPREAD_GUN } from './WeaponConfig';
const { ccclass, property } = _decorator;

@ccclass('GameCtrl')
export class GameCtrl extends Component {


    @property({ type: Player, tooltip: "Player node"})
    public player: Player | null = null;

    @property({ type: Camera, tooltip: "Main camera"})
    public camera: Camera | null = null;

    @property({ type: Prefab, tooltip: "Bullet prefab"})
    public bulletPrefab: Prefab | null = null;

    @property({ type: Node, tooltip: "Bullet container"})
    public bulletContainer: Node | null = null;


    start() {
        if (this.player && this.camera) {
            this.player.initialize(this.camera);
        }

        if (this.player && this.bulletPrefab && this.bulletContainer) {
            this.player.initializeWeapon(PISTOL, this.bulletPrefab, this.bulletContainer);
        }

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
        input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
        input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);

        if (this.player) {
            this.player.node.on('WeaponSelect', this.handleWeaponSwap, this);
        }
    }

    protected onDestroy(): void {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
        input.off(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
        input.off(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
        input.off(Input.EventType.MOUSE_UP, this.onMouseUp, this);

        if (this.player) {
            this.player.node.off('WeaponSelect', this.handleWeaponSwap, this);
        }
    }

    update(deltaTime: number) {
        
    }
    
    private onKeyDown(event: EventKeyboard): void { 
        if (this.player) this.player.processKeyDown(event);
    }
    private onKeyUp(event: EventKeyboard): void { 
        if (this.player) this.player.processKeyUp(event);
    }
    private onMouseMove(event: EventMouse): void { 
        if (this.player) this.player.processMouseMove(event);
    }
    private onMouseDown(event: EventMouse): void { 
        if (this.player) this.player.processMouseDown(event);
    }
    private onMouseUp(event: EventMouse): void { 
        if (this.player) this.player.processMouseUp(event);
    }

    private handleWeaponSwap(weaponIndex: number) {
        switch (weaponIndex) {
            case 1:
                this.player.initializeWeapon(PISTOL, this.bulletPrefab, this.bulletContainer);
                break;
            case 2:
                this.player.initializeWeapon(DOUBLE_GUN, this.bulletPrefab, this.bulletContainer);
                break;
            case 3:
                this.player.initializeWeapon(FORWARD_REAR_PISTOL, this.bulletPrefab, this.bulletContainer);
                break;
            case 4:
                this.player.initializeWeapon(SPREAD_GUN, this.bulletPrefab, this.bulletContainer);
                break;
        }
    }
}


