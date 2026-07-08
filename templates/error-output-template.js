function successOutput(extraFields = {}, correlationId) {
  return {
    success: true,
    error_code: "",
    error_message: "",
    error_step: "",
    correlation_id: correlationId,
    retryable: false,
    processed_at: new Date().toISOString(),
    ...extraFields,
  };
}

function errorOutput({ code, message, step, correlationId, retryable = false }) {
  return {
    success: false,
    error_code: code,
    error_message: sanitizeMessage(message),
    error_step: step,
    correlation_id: correlationId,
    retryable,
    processed_at: new Date().toISOString(),
  };
}

function sanitizeMessage(message) {
  return String(message || "")
    .replace(/Bearer\s+[A-Za-z0-9._-]+/g, "Bearer [REDACTED]")
    .slice(0, 500);
}

module.exports = {
  successOutput,
  errorOutput,
};

