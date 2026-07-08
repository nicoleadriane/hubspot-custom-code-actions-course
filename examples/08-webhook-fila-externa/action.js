const axios = require("axios");

exports.main = async (event, callback) => {
  const correlationId = event.callbackId;

  try {
    await axios.post(
      process.env.INTERNAL_QUEUE_WEBHOOK_URL,
      {
        correlationId,
        objectType: event.object.objectType,
        objectId: event.object.objectId,
        requestedAt: new Date().toISOString(),
      },
      {
        timeout: 5000,
        headers: {
          Authorization: `Bearer ${process.env.INTERNAL_QUEUE_TOKEN}`,
          "X-Correlation-Id": correlationId,
        },
      }
    );

    callback({
      outputFields: {
        success: true,
        error_code: "",
        error_message: "",
        error_step: "",
        correlation_id: correlationId,
        retryable: false,
        processed_at: new Date().toISOString(),
        queued: true,
      },
    });
  } catch (err) {
    const statusCode = Number(err.response?.status || err.code);

    if (statusCode === 429 || statusCode >= 500) {
      throw err;
    }

    callback({
      outputFields: {
        success: false,
        error_code: "QUEUE_WEBHOOK_FAILED",
        error_message: "Could not enqueue external processing request.",
        error_step: "enqueue",
        correlation_id: correlationId,
        retryable: false,
        processed_at: new Date().toISOString(),
        queued: false,
      },
    });
  }
};

