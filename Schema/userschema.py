from marshmallow import Schema, fields, validate


class UserSchema(Schema):
    email = fields.Email(required=True, validate=validate.Length(max=150))
    username = fields.Str(required=True, validate=validate.Length(max=150))
    password = fields.String(required=True, validate=validate.Length(min=8))

    class Meta:
        strict = True
