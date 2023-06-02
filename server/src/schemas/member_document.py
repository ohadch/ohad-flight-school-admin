import datetime

from pydantic import BaseModel, Field

from src.models.member_document import MemberDocumentType, MemberDocumentStatus


class MemberDocumentSchema(BaseModel):
    id: int
    member_id: int
    type: MemberDocumentType
    status: MemberDocumentStatus
    expiration_at: datetime.datetime

    class Config:
        orm_mode = True


class MemberDocumentCreateSchema(BaseModel):
    type: MemberDocumentType
    status: MemberDocumentStatus = Field(default=MemberDocumentStatus.PENDING)
    expiration_at: str


class MemberDocumentUpdateSchema(BaseModel):
    type: MemberDocumentType = Field(None)
    status: MemberDocumentStatus = Field(None)
    expiration_at: str = Field(None)
