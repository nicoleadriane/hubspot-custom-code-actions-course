const hubspot = require("@hubspot/api-client");

exports.main = async (event, callback) => {
  const correlationId = event.callbackId;
  const sequenceControllerId = event.inputFields.sequence_controller_id;

  if (!sequenceControllerId) {
    return callback({
      outputFields: {
        success: false,
        error_code: "MISSING_SEQUENCE_CONTROLLER",
        error_message: "sequence_controller_id input is required.",
        error_step: "validate_inputs",
        correlation_id: correlationId,
        retryable: false,
        processed_at: new Date().toISOString(),
        generated_code: "",
      },
    });
  }

  const hubspotClient = new hubspot.Client({
    accessToken: process.env.HUBSPOT_PRIVATE_APP_TOKEN,
  });

  try {
    const controller = await hubspotClient.crm.objects.basicApi.getById(
      "p_sequence_controller",
      sequenceControllerId,
      ["prefix", "next_number"]
    );

    const prefix = controller.properties.prefix || "SEQ";
    const nextNumber = Number(controller.properties.next_number || 1);
    const generatedCode = `${prefix}-${String(nextNumber).padStart(6, "0")}`;

    await hubspotClient.crm.objects.basicApi.update("p_sequence_controller", sequenceControllerId, {
      properties: {
        next_number: String(nextNumber + 1),
        last_generated_code: generatedCode,
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
        generated_code: generatedCode,
      },
    });
  } catch (err) {
    if (Number(err.statusCode || err.code || err.response?.status) >= 500) {
      throw err;
    }

    callback({
      outputFields: {
        success: false,
        error_code: "SEQUENCE_GENERATION_FAILED",
        error_message: "Could not generate sequence code.",
        error_step: "generate_sequence",
        correlation_id: correlationId,
        retryable: false,
        processed_at: new Date().toISOString(),
        generated_code: "",
      },
    });
  }
};

