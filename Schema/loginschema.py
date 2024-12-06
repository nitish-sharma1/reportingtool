from marshmallow import Schema, fields, validate


class LoginSchema(Schema):
    username = fields.Str(required=True, validate=validate.Length(max=150))
    password = fields.String(required=True, validate=validate.Length(min=5))

    class Meta:
        strict = True
