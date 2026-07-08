exports.main = async (event, callback) => {
  const correlationId = event.callbackId;
  const requiredExternalId = String(event.inputFields.external_id || "").trim();

  if (!requiredExternalId) {
    return callback({
      outputFields: {
        success: false,
        error_code: "MISSING_EXTERNAL_ID",
        error_message: "external_id input is required to continue.",
        error_step: "validate_inputs",
        correlation_id: correlationId,
        retryable: false,
        processed_at: new Date().toISOString(),
      },
    });
  }

  callback({
    outputFields: {
      success: true,
      error_code: "",
      error_message: "",
      error_step: "",
      correlation_id: correlationId,
      retryable: false,
      processed_at: new Date().toISOString(),
    },
  });
};

