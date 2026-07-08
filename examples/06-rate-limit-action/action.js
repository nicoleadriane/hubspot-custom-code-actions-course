const axios = require("axios");

exports.main = async (event, callback) => {
  const correlationId = event.callbackId;
  const email = String(event.inputFields.email || "").trim().toLowerCase();

  if (!email) {
    return callback({
      outputFields: {
        success: false,
        error_code: "MISSING_EMAIL",
        error_message: "Email is required.",
        error_step: "validate_inputs",
        correlation_id: correlationId,
        retryable: false,
        processed_at: new Date().toISOString(),
      },
    });
  }

  const response = await axios.post("https://example.com/enrich", {
    email,
    correlationId,
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
      enrichment_status: response.data.status || "completed",
    },
  });
};

