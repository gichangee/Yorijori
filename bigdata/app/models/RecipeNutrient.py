from sqlalchemy import Column, String, BigInteger, Double, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class RecipeNutrient(Base):
    __tablename__ = "recipenutrient"

    recipe_nutrient_id = Column(BigInteger, nullable=False, primary_key=True, index=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    capacity = Column(String(20), nullable=False)
    kcal = Column(BigInteger, nullable=False)
    protein = Column(Double)
    carbohydrate = Column(Double)
    fat = Column(Double)
    cholesterol = Column(Double)
    salt = Column(Double)
