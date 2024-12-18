from marshmallow import Schema, fields


class OutboundServiceSMTP(Schema):
    outbound_service_name = fields.Str(required=True)
    outbound_service_type = fields.Str(required=True)
    smtp_server = fields.Str(required=True)
    app_password = fields.Str(required=True)
    login_email = fields.Str(required=True)
    user_id = fields.Str(required=True)

    class Meta:
        strict = True


class OutboundServiceAWS(Schema):
    outbound_service_name = fields.Str(required=True)
    outbound_service_type = fields.Str(required=True)
    access_key = fields.Str(required=True)
    secret_key = fields.Str(required=True)
    aws_region = fields.Str(required=True)
    user_id = fields.Str(required=True)

    class Meta:
        strict = True


class OutboundServiceMFT(Schema):
    outbound_service_name = fields.Str(required=True)
    outbound_service_type = fields.Str(required=True)
    sftp_host = fields.Str(required=True)
    sftp_port = fields.Int(required=True)
    sftp_username = fields.Str(required=True)
    sftp_password = fields.Str(required=True)
    remote_file_path = fields.Str(required=True)
    user_id = fields.Str(required=True)

    class Meta:
        strict = True
