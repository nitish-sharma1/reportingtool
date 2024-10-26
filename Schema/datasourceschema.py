from marshmallow import Schema, fields


class DataSourceSchema(Schema):
    datasource_type = fields.Str(required=True)
    instance_name = fields.Str(required=True)
    username = fields.Str(required=True)
    password = fields.Str(required=True)
    hostname = fields.Str(required=True)
    port = fields.Int(required=True)

    class Meta:
        strict = True
