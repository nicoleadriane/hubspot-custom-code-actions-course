const hubspot = require("@hubspot/api-client");

exports.main = async (event, callback) => {
  const startedAt = new Date().toISOString();
  const correlationId = event.callbackId || `object-${event.object.objectId}`;

  try {
    const inputs = {
      objectId: event.object.objectId,
      email: event.inputFields.email || "",
    };

    if (!inputs.email) {
      return callback({
        outputFields: buildBusinessError({
          code: "MISSING_EMAIL",
          message: "Input email is required.",
          step: "validate_inputs",
          correlationId,
          startedAt,
        }),
      });
    }

    const hubspotClient = new hubspot.Client({
      accessToken: process.env.HUBSPOT_PRIVATE_APP_TOKEN,
    });

    // Add only the API calls that cannot be replaced by workflow inputs.
    const result = {
      normalized_email: inputs.email.trim().toLowerCase(),
    };

    return callback({
      outputFields: {
        success: true,
        error_code: "",
        error_message: "",
        error_step: "",
        correlation_id: correlationId,
        retryable: false,
        processed_at: new Date().toISOString(),
        normalized_email: result.normalized_email,
      },
    });
  } catch (err) {
    console.error("custom_code_action_failed", {
      correlationId,
      objectId: event.object.objectId,
      message: err.message,
      statusCode: err.statusCode || err.code,
    });

    if (isRetryableError(err)) {
      throw err;
    }

    return callback({
      outputFields: buildBusinessError({
        code: "UNEXPECTED_ERROR",
        message: "Unexpected non-retryable error.",
        step: "catch",
        correlationId,
        startedAt,
      }),
    });
  }
};

function isRetryableError(err) {
  const statusCode = Number(err.statusCode || err.code || err.response?.status);
  return statusCode === 429 || statusCode >= 500;
}

function buildBusinessError({ code, message, step, correlationId }) {
  return {
    success: false,
    error_code: code,
    error_message: message,
    error_step: step,
    correlation_id: correlationId,
    retryable: false,
    processed_at: new Date().toISOString(),
  };
}

