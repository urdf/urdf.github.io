export type ComponentCategory = 'Sensor' | 'Actuator' | 'MCU' | 'Power' | 'Structural';

export interface LibraryEntry {
    id:          string;
    label:       string;
    category:    ComponentCategory;
    description: string;
    dims:        string;
    cssColor:    string;
    urdfRgba:    string;
    defaultZ:    number;
    factory:     () => Promise<{ generate: () => ArrayBuffer }>;
}

export const LIBRARY: LibraryEntry[] = [
    {
        id: 'hcsr04', label: 'HC-SR04', category: 'Sensor',
        description: 'Ultrasonic distance sensor', dims: '45×20×15 mm',
        cssColor: '#3373e5', urdfRgba: '0.20 0.45 0.90 1.00', defaultZ: 0.015,
        factory: () => import('./hcsr04.js').then(m => ({ generate: m.generateHcsr04 })),
    },
    {
        id: 'l298n', label: 'L298N', category: 'Actuator',
        description: 'Dual H-bridge motor driver', dims: '43×43×20 mm',
        cssColor: '#3d7ad6', urdfRgba: '0.24 0.48 0.84 1.00', defaultZ: 0.005,
        factory: () => import('./l298n.js').then(m => ({ generate: m.generateL298n })),
    },
    {
        id: 'esp32cam_lib', label: 'ESP32-CAM', category: 'MCU',
        description: 'ESP32 camera module', dims: '40×27×13 mm',
        cssColor: '#1a7a3c', urdfRgba: '0.00 0.45 0.20 1.00', defaultZ: 0.005,
        factory: () => import('./esp32cam.js').then(m => ({ generate: m.generateEsp32Cam })),
    },
    {
        id: 'tt_motor', label: 'TT Motor', category: 'Actuator',
        description: 'TT gear motor with DC can', dims: '36×18×22 mm',
        cssColor: '#c89a14', urdfRgba: '0.83 0.63 0.09 1.00', defaultZ: 0.011,
        factory: () => import('./ttmotor.js').then(m => ({ generate: m.generateTtMotor })),
    },
    {
        id: 'sg90', label: 'SG90', category: 'Actuator',
        description: 'Micro servo motor', dims: '22×12×23 mm',
        cssColor: '#e07810', urdfRgba: '0.90 0.50 0.15 1.00', defaultZ: 0.012,
        factory: () => import('./sg90.js').then(m => ({ generate: m.generateSg90 })),
    },
    {
        id: 'arduino_nano', label: 'Arduino Nano', category: 'MCU',
        description: 'Arduino Nano microcontroller', dims: '43×18×10 mm',
        cssColor: '#006e33', urdfRgba: '0.00 0.50 0.30 1.00', defaultZ: 0.005,
        factory: () => import('./arduino_nano.js').then(m => ({ generate: m.generateArduinoNano })),
    },
    {
        id: 'mpu6050', label: 'MPU-6050', category: 'Sensor',
        description: '6-axis IMU (accelerometer + gyroscope)', dims: '20×20×2 mm',
        cssColor: '#7a52cc', urdfRgba: '0.55 0.35 0.80 1.00', defaultZ: 0.005,
        factory: () => import('./mpu6050.js').then(m => ({ generate: m.generateMpu6050 })),
    },
];
