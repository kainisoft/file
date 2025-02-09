module.exports = {
  apps: [
    {
      name: "file",
      script: "./index.js",
      instances: 1,
      max_memory_restart: '1G',
      autorestart: true,

      // Logging
      out_file: './out.log',
      error_file: './error.log',
      merge_logs: true,
      log_date_format: 'DD-MM HH:mm:ss Z',
    },
  ],
};
