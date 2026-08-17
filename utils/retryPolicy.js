const MAX_ATTEMPTS = 3;

const getRetryDelay = (attemp) => {
  const delay = {
    1: 30 * 1000,
    2: 2 * 60 * 1000,
  };
  return delay[attemp] ?? null;
};

const getNextAttemptAt = (attempt) => {
  const delay = getRetryDelay(attempt);

  if (delay === null) {
    return null;
  }
  return new Date(Date.now() + delay);
};
module.exports = {
  MAX_ATTEMPTS,
  getRetryDelay,
  getNextAttemptAt,
};
