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

        if (this.player) {
            this.player.node.on('WeaponSelect', this.handleWeaponSwap, this);
        }
    }

    protected onDestroy(): void {

        if (this.player) {
            this.player.node.off('WeaponSelect', this.handleWeaponSwap, this);
        }
    }

    update(deltaTime: number) {
        
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


