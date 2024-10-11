from sqlalchemy import Column, BigInteger, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class RecipeMaterials(Base):
    __tablename__ = "recipematerials"

    recipe_material_id = Column(BigInteger, primary_key=True, nullable=False, index=True, autoincrement=True)
    recipe_material_amount = Column(String(100))
    recipe_material_unit = Column(String(100))

    recipe_id = Column(BigInteger, ForeignKey("recipes.recipe_id"), nullable=False)
    recipe = relationship("Recipes", back_populates="recipe_materials")

    material_id = Column(BigInteger, ForeignKey("materials.material_id"), nullable=True)
    material = relationship("Materials", back_populates="recipe_materials")
