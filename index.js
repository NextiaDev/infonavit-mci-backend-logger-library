"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLogger = void 0;
const pinoLogger = require('pino');
function buildLogger(nameModule) {
    const levels = {
        emerg: 80, alert: 70, crit: 60, error: 50, warn: 40, info: 30, notice: 20, debug: 10,
    };
    let streams = [{ stream: pinoLogger.destination({ dest: '../' + nameModule + '.log', sync: false }) },];
    if (process.env.NODE_ENV !== 'production') {
        streams = [{ stream: process.stdout }, {
                stream: pinoLogger.destination({
                    dest: '../' + nameModule + '.log', sync: false
                })
            },];
    }
    return pinoLogger({
        level: 10, customLevels: levels, useOnlyCustomLevels: true, timestamp: () => {
            return `,"time":"${new Date().toLocaleString("es-MX", { timeZone: 'America/Mexico_City' })}"`;
        }, formatters: {
            level: (label) => {
                return { level: label };
            },
        },
    }, pinoLogger.multistream(streams));
}
exports.buildLogger = buildLogger;
