import pino from 'pino';

export const logger = pino({
  level: 'info',
  transport: {
    targets: [
      {
        target: 'pino/file',
        options: { destination: './src/logger/pino.log' },
      },
      { target: 'pino-pretty' },
    ],
  },
});
