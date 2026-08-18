const MAX_ATTEMPTS = 3;

const BASE_DELAY_MS = 30 * 1000;

const calculateNextAttemptAt = (attempt) => {
  const exponentialDelay = BASE_DELAY_MS * 2 ** (attempt - 1);

  const jitter = Math.floor(Math.random() * 10_000);

  return new Date(Date.now() + exponentialDelay + jitter);
};

module.exports = {
  MAX_ATTEMPTS,
  calculateNextAttemptAt,
};
