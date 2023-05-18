from sqlalchemy import Column, Integer, String

from server.config.db import Base


class Member(Base):

    __tablename__ = "members"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
