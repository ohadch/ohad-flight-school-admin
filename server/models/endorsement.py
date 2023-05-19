from sqlalchemy import Integer, Column, String

from server.config.db import Base


class Endorsement(Base):
    __tablename__ = "endorsements"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
