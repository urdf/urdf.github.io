export type ComponentCategory = 'Sensor' | 'Actuator' | 'MCU' | 'Power' | 'Structural';

export interface LibraryEntry {
    id:          string;
    label:       string;
    category:    ComponentCategory;
    description: string;
    defaultDims: [number, number, number];  // [w, d, h] in metres
    cssColor:    string;
    urdfRgba:    string;
    defaultZ:    number;
    factory:     () => Promise<{ generate: () => ArrayBuffer }>;
}

export const LIBRARY: LibraryEntry[] = [
    {
        id: 'hcsr04', label: 'HC-SR04', category: 'Sensor',
        description: 'Ultrasonic distance sensor',
        defaultDims: [0.045, 0.020, 0.015], cssColor: '#3373e5', urdfRgba: '0.20 0.45 0.90 1.00', defaultZ: 0.015,
        factory: () => import('./generators.js').then(m => ({ generate: m.generateHcsr04 })),
    },
    {
        id: 'l298n', label: 'L298N', category: 'Actuator',
        description: 'Dual H-bridge motor driver',
        defaultDims: [0.043, 0.043, 0.020], cssColor: '#c01f1f', urdfRgba: '0.75 0.12 0.12 1.00', defaultZ: 0.005,
        factory: () => import('./generators.js').then(m => ({ generate: m.generateL298n })),
    },
    {
        id: 'esp32cam_lib', label: 'ESP32-CAM', category: 'MCU',
        description: 'ESP32 camera module',
        defaultDims: [0.0405, 0.027, 0.013], cssColor: '#1a7a3c', urdfRgba: '0.00 0.45 0.20 1.00', defaultZ: 0.005,
        factory: () => import('./generators.js').then(m => ({ generate: m.generateEsp32Cam })),
    },
    {
        id: 'tt_motor', label: 'TT Motor', category: 'Actuator',
        description: 'TT gear motor with DC can',
        defaultDims: [0.036, 0.018, 0.022], cssColor: '#c89a14', urdfRgba: '0.83 0.63 0.09 1.00', defaultZ: 0.011,
        factory: () => import('./generators.js').then(m => ({ generate: m.generateTtMotor })),
    },
    {
        id: 'sg90', label: 'SG90', category: 'Actuator',
        description: 'Micro servo motor',
        defaultDims: [0.022, 0.0115, 0.023], cssColor: '#e07810', urdfRgba: '0.90 0.50 0.15 1.00', defaultZ: 0.012,
        factory: () => import('./generators.js').then(m => ({ generate: m.generateSg90 })),
    },
    {
        id: 'arduino_nano', label: 'Arduino Nano', category: 'MCU',
        description: 'Arduino Nano microcontroller',
        defaultDims: [0.043, 0.018, 0.010], cssColor: '#006e33', urdfRgba: '0.00 0.50 0.30 1.00', defaultZ: 0.005,
        factory: () => import('./generators.js').then(m => ({ generate: m.generateArduinoNano })),
    },
    {
        id: 'mpu6050', label: 'MPU-6050', category: 'Sensor',
        description: '6-axis IMU (accelerometer + gyroscope)',
        defaultDims: [0.020, 0.020, 0.0025], cssColor: '#7a52cc', urdfRgba: '0.55 0.35 0.80 1.00', defaultZ: 0.005,
        factory: () => import('./generators.js').then(m => ({ generate: m.generateMpu6050 })),
    },
];
