exports.main = async (event, callback) => {
  const correlationId = event.callbackId;
  const rawPhone = String(event.inputFields.phone || "");
  const digits = rawPhone.replace(/\D/g, "");

  callback({
    outputFields: {
      success: true,
      error_code: "",
      error_message: "",
      error_step: "",
      correlation_id: correlationId,
      retryable: false,
      processed_at: new Date().toISOString(),
      phone_digits: digits,
      has_phone: digits.length > 0,
    },
  });
};

