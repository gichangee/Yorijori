from sqlalchemy import Column, BigInteger, String, Boolean
from sqlalchemy.orm import relationship

from app.database.base import Base


class Materials(Base):
    __tablename__ = "materials"

    material_id = Column(BigInteger, primary_key=True, index=True, autoincrement=True, nullable=False)
    material_name = Column(String(20), nullable=False)
    material_price_status = Column(Boolean, default=False, nullable=False)
    material_img = Column(String(512))
    material_allergy_num = Column(String(20))

    nutrient = relationship("Nutrients", back_populates="material")
    month_price = relationship("MonthPrice", back_populates="material")
    week_price = relationship("WeekPrice", back_populates="material")
    day_price = relationship("DayPrice", back_populates="material")
    recipe_materials = relationship("RecipeMaterials", back_populates="material")
