from pydantic import BaseModel


class RecipeBackCrawlingDto(BaseModel):
    now_type: int
    now_situation: int
    now_ingredient: int
    now_method: int
    now_page: int
    recipe_idx: int
