const {
  transitionScheduledPolls,
  transitionOpenPolls,
} = require("../services/pollLifecycle.service");

const runPollLifecycleJob = async () => {
  try {
    await transitionScheduledPolls();
    await transitionOpenPolls();
  } catch (err) {
    console.error("Poll lifecycle job failed:", err);
  }
};

module.exports = {
  runPollLifecycleJob,
};
