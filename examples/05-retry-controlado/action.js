const axios = require("axios");

exports.main = async (event, callback) => {
  const correlationId = event.callbackId;

  try {
    const response = await axios.get("https://example.com/status", {
      timeout: 5000,
      headers: {
        "X-Correlation-Id": correlationId,
      },
    });

    callback({
      outputFields: {
        success: true,
        error_code: "",
        error_message: "",
        error_step: "",
        correlation_id: correlationId,
        retryable: false,
        processed_at: new Date().toISOString(),
        external_status: response.data.status || "unknown",
      },
    });
  } catch (err) {
    const statusCode = Number(err.response?.status || err.code);

    if (statusCode === 429 || statusCode >= 500) {
      console.error("retryable_external_error", {
        correlationId,
        statusCode,
      });
      throw err;
    }

    callback({
      outputFields: {
        success: false,
        error_code: "EXTERNAL_REQUEST_FAILED",
        error_message: `External API returned non-retryable status ${statusCode || "unknown"}.`,
        error_step: "call_external_api",
        correlation_id: correlationId,
        retryable: false,
        processed_at: new Date().toISOString(),
        external_status: "",
      },
    });
  }
};

