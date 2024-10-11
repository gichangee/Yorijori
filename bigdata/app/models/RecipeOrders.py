from sqlalchemy import BigInteger, Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class RecipeOrders(Base):
    __tablename__ = "recipeorders"

    recipe_order_id = Column(BigInteger, primary_key=True, index=True, autoincrement=True, nullable=False)
    recipe_order_content = Column(String(512), nullable=False)
    recipe_order_num = Column(Integer, nullable=False)
    recipe_order_img = Column(String(512))

    recipe_id = Column(BigInteger, ForeignKey("recipes.recipe_id"), nullable=False)

    recipe = relationship("Recipes", back_populates="recipe_orders")
