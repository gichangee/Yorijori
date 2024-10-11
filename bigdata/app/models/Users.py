from datetime import datetime

from sqlalchemy import String, Column, BigInteger, DateTime, Boolean
from sqlalchemy.orm import relationship

from app.database.base import Base


class Users(Base):
    __tablename__ = "users"

    user_id = Column(BigInteger, primary_key=True, autoincrement=True, index=True, nullable=False)
    user_email = Column(String(255))
    user_nickname = Column(String(255))
    user_image = Column(String(255))
    user_name = Column(String(255))
    user_score = Column(BigInteger, default=0, nullable=False)
    user_social_id = Column(String(30))
    user_social_type = Column(String(30))
    user_password = Column(String(30))
    user_refresh_token = Column(String(100))
    user_role = Column(String(30))
    user_status = Column(Boolean, default=True, nullable=False)
    created_date = Column(DateTime, default=datetime.utcnow, nullable=False)
    modified_date = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # 관계설정
    recipe = relationship("Recipes", back_populates="user")
