exports.main = async (event, callback) => {
  const correlationId = event.callbackId;
  const dealName = String(event.inputFields.dealname || "").trim();
  const companyDomain = String(event.inputFields.associated_company_domain || "").trim();
  const companySegment = String(event.inputFields.associated_company_segment || "").trim();

  if (!companyDomain) {
    return callback({
      outputFields: {
        success: false,
        error_code: "MISSING_ASSOCIATED_COMPANY_DOMAIN",
        error_message: "Associated company domain was not available as input.",
        error_step: "validate_associated_company_inputs",
        correlation_id: correlationId,
        retryable: false,
        processed_at: new Date().toISOString(),
        routing_key: "",
      },
    });
  }

  const routingKey = [companySegment || "unknown", companyDomain].join(":");

  callback({
    outputFields: {
      success: true,
      error_code: "",
      error_message: "",
      error_step: "",
      correlation_id: correlationId,
      retryable: false,
      processed_at: new Date().toISOString(),
      routing_key: routingKey,
      deal_summary: `${dealName} | ${companyDomain}`,
    },
  });
};

