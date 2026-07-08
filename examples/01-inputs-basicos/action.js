exports.main = async (event, callback) => {
  const correlationId = event.callbackId;

  const email = String(event.inputFields.email || "").trim().toLowerCase();
  const firstname = String(event.inputFields.firstname || "").trim();
  const lastname = String(event.inputFields.lastname || "").trim();

  if (!email) {
    return callback({
      outputFields: {
        success: false,
        error_code: "MISSING_EMAIL",
        error_message: "Email input is required.",
        error_step: "validate_inputs",
        correlation_id: correlationId,
        retryable: false,
        processed_at: new Date().toISOString(),
        normalized_email: "",
        full_name: "",
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
      normalized_email: email,
      full_name: [firstname, lastname].filter(Boolean).join(" "),
    },
  });
};

