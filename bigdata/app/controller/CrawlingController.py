import os

from fastapi import APIRouter, HTTPException, BackgroundTasks, UploadFile, File
from hdfs import InsecureClient

from app.globals import get_recipe_back_crawling_status, set_recipe_back_crawling_status, \
    get_price_back_crawling_status, set_price_back_crawling_status, get_hdfs_upload_status, set_hdfs_upload_status
from app.models.request.PriceBackAPIDto import PriceBackAPIDto
from app.models.request.RecipeBackCrawlingDto import RecipeBackCrawlingDto
from app.service.HadoopService import upload_recipe_file_to_hdfs, upload_price_file_to_hdfs, \
    upload_nutrient_file_to_hdfs
from app.tasks.PriceScheduler import price_back_data_api_scheduler
from app.tasks.RecipeScheduler import recipe_back_data_crawling_scheduler

router = APIRouter(
    prefix="/crawling",
    tags=["Crawling"]
)


# recipe 백데이터 쌓는 api
@router.post("/recipe/back-data")
async def start_recipe_back_crawling(data: RecipeBackCrawlingDto, background_tasks: BackgroundTasks):
    if get_recipe_back_crawling_status():
        raise HTTPException(status_code=429, detail="이미 작업이 진행 중입니다. 작업이 완료된 후 다시 시도하세요.")

    set_recipe_back_crawling_status(True)

    background_tasks.add_task(
        recipe_back_data_crawling_scheduler,
        data.now_type,
        data.now_situation,
        data.now_ingredient,
        data.now_method,
        data.now_page,
        data.recipe_idx)

    # 클라이언트에게 즉시 응답 반환
    return {"message": "작업이 백그라운드에서 시작되었습니다."}


@router.post("/price/back-data")
async def start_price_back_crawling(data: PriceBackAPIDto, background_tasks: BackgroundTasks):
    if get_price_back_crawling_status():
        raise HTTPException(status_code=429, detail="이미 작업이 진행 중입니다. 작업이 완료된 후 다시 시도하세요.")

    set_price_back_crawling_status(True)

    background_tasks.add_task(
        price_back_data_api_scheduler,
        data.p_regday
    )

    return {"message": "작업이 백그라운드에서 시작되었습니다."}


@router.post("/upload-script")
async def upload_script(file: UploadFile = File(...)):
    # HDFS 클라이언트 설정 (HDFS NameNode 주소로 접속)
    hdfs_client = InsecureClient('http://master:9870', user='root')

    # 로컬 임시 저장 경로
    local_file_path = f"/tmp/{file.filename}"

    # 로컬에 파일 저장
    with open(local_file_path, "wb") as local_file:
        content = await file.read()
        local_file.write(content)

    # HDFS에 업로드
    hdfs_script_path = "/user/root/scripts/" + file.filename
    hdfs_client.upload(hdfs_script_path, local_file_path, overwrite=True)
    os.remove(local_file_path)

    # Docker 컨테이너 내 /usr/local/scripts/ 경로에 저장
    docker_filter_path = f"/usr/local/scripts/{file.filename}"
    os.makedirs("/usr/local/scripts/", exist_ok=True)
    with open(docker_filter_path, "wb") as docker_file:
        docker_file.write(content)

    return {"message": f"Script {file.filename} uploaded to HDFS at {hdfs_script_path}."}


@router.post("/recipe/upload/file")
async def start_recipe_uploaded_file():
    if get_hdfs_upload_status():
        raise HTTPException(status_code=429, detail="이미 작업이 진행 중입니다. 작업이 완료된 후 다시 시도하세요.")

    set_hdfs_upload_status(True)
    await upload_recipe_file_to_hdfs()


@router.post("/price/upload/file")
async def start_price_uploaded_file():
    if get_hdfs_upload_status():
        raise HTTPException(status_code=429, detail="이미 작업이 진행 중입니다. 작업이 완료된 후 다시 시도하세요.")

    set_hdfs_upload_status(True)
    await upload_price_file_to_hdfs()


@router.post("/nutrient/upload/file")
async def start_price_uploaded_file():
    if get_hdfs_upload_status():
        raise HTTPException(status_code=429, detail="이미 작업이 진행 중입니다. 작업이 완료된 후 다시 시도하세요.")

    set_hdfs_upload_status(True)
    await upload_nutrient_file_to_hdfs()
