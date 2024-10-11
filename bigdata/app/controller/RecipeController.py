from fastapi import APIRouter, HTTPException

from app.globals import get_recipe_back_crawling_status
from app.service.HadoopService import upload_file_to_mysql

router = APIRouter(
    prefix="/recipes",
    tags=["Recipes"]
)


# recipe 정제 api
@router.get("/jungjae/{what_do}")
async def start_recipe_jungjae(what_do: int, startnum: int):
    if get_recipe_back_crawling_status():
        raise HTTPException(status_code=429, detail="이미 작업이 진행 중입니다. 작업이 완료된 후 다시 시도하세요.")

    await upload_file_to_mysql(what_do, startnum)
    # 클라이언트에게 즉시 응답 반환
    return {"message": "작업이 백그라운드에서 시작되었습니다."}
