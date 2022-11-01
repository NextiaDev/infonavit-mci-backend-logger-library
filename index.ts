import pino from "pino";

const pinoLogger = require('pino');

export class buildLogger extends pinoLogger {
    constructor(nameModule: string) {
        const levels = {
            emerg: 80, alert: 70, crit: 60, error: 50, warn: 40, info: 30, notice: 20, debug: 10,
        };
        let module = nameModule;

        let streams = [{stream: buildLogger.destination({dest: '../' + module + '.log', sync: false})},];

        if (process.env.NODE_ENV !== 'production') {
            streams = [{stream: process.stdout}, {
                stream: buildLogger.destination({
                    dest: '../' + module + '.log', sync: false
                })
            },];
        }

        super({
            level: 10, customLevels: levels, useOnlyCustomLevels: true, timestamp: () => {
                return `,"time":"${new Date().toLocaleString("es-MX", {timeZone: 'America/Mexico_City'})}"`;
            }, formatters: {
                level: (label: string) => {
                    return {level: label};
                },
            },
        }, pinoLogger.multistream(streams));
    }
}