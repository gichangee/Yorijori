from sqlalchemy import Column, BigInteger, DateTime, ForeignKey, Integer
from sqlalchemy.orm import relationship

from app.database.base import Base


class DayPrice(Base):
    __tablename__ = "dayprice"

    day_price_id = Column(BigInteger, primary_key=True, autoincrement=True, index=True, nullable=False)
    day_price_day = Column(DateTime, nullable=False)
    day_price = Column(Integer, default=0)

    material_id = Column(BigInteger, ForeignKey("materials.material_id"), nullable=False)
    material = relationship("Materials", back_populates="day_price")
