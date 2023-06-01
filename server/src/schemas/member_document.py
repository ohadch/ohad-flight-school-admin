from pydantic import BaseModel, Field

from src.models.member_document import MemberDocumentType


class MemberDocumentSchema(BaseModel):
    id: int
    member_id: int
    type: MemberDocumentType
    expiration_at: str


class MemberDocumentCreateSchema(BaseModel):
    type: MemberDocumentType
    expiration_at: str


class MemberDocumentUpdateSchema(BaseModel):
    type: MemberDocumentType = Field(None)
    expiration_at: str = Field(None)
