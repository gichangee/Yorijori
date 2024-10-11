# sys.path.append(os.path.dirname(os.path.abspath(__file__)))

import uvicorn
from fastapi import FastAPI

from app.controller import RecipeController, PriceController, CrawlingController
from app.database.base import Base
from app.database.database import engineconn

# 모델을 명시적으로 임포트 (필수)
from app.models import Users, DayPrice, Materials, MonthPrice, RecipeMaterials, RecipeNutrient, RecipeOrders, \
    Recipes, WeekPrice  # noqa

app = FastAPI()


@app.on_event("startup")
async def startup_event():
    engine = engineconn()
    try:
        connection = engine.connection()  # 데이터베이스 연결 확인
        print("데이터베이스 연결 성공")
    except Exception as e:
        print(f"데이터베이스 연결 실패: {e}")

    print("등록된 테이블 목록:", Base.metadata.tables)

    # 테이블 자동 생성
    Base.metadata.create_all(engine.engine)


app.include_router(RecipeController.router)
app.include_router(PriceController.router)
app.include_router(CrawlingController.router)

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
