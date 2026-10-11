export interface IntentConfig {
    seekWeight: number;
    fleeWeight: number;
}

export interface MovementConfig {
    maxSpeed: number;
    maxTurnForce: number
}

export interface EnemyConfig {
    intent: IntentConfig;
    moving: MovementConfig
}