from marshmallow import Schema, fields


class ConfigSchema(Schema):
    instance_name = fields.Str(required=True)
    report_time = fields.Str(required=True)
    frequency = fields.List(fields.Str(), required=True)
    report_name = fields.Str(required=True)
    query = fields.Str(required=True)
    recipents = fields.List(fields.Str(), required=False)
    subject = fields.Str(required=False)
    email_body = fields.Str(required=False)
    outbound_service_name = fields.Str(required=True)

    class Meta:
        strict = True
