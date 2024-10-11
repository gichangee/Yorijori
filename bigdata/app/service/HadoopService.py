import os

import requests
from fastapi import HTTPException
from hdfs import InsecureClient

from app.globals import set_hdfs_upload_status

# HDFS 클라이언트 설정 (HDFS NameNode 주소로 접속)
hdfs_client = InsecureClient('http://master:9870', user='root')


async def upload_file_to_mysql(what_do, startnum):
    spark_url = "http://master:6066/v1/submissions/create"
    filter_name = "recipe_filter.py"
    filter_url = '/opt/spark-scripts/filter.py'

    # spark 정제코드 요청

    if what_do == 1:
        filter_name = "RecipeFilter.py"
        filter_url = '/opt/spark-scripts/RecipeFilter.py'
        print("1(recipe) : 정제 후 mysql 실행")

    elif what_do == 2:
        filter_name = "PriceFilter.py"
        filter_url = '/opt/spark-scripts/PriceFilter.py'
        print("2(price) : 정제 후 mysql 실행")

    elif what_do == 3:
        filter_name = "NutrientFilter.py"
        filter_url = '/opt/spark-scripts/NutrientFilter.py'
        print("3(nutrients) : 정제 후 mysql 실행")

    data = {
        "action": "CreateSubmissionRequest",
        "appArgs": [filter_url, "", startnum],
        "appResource": filter_url,
        "clientSparkVersion": "3.5.2",
        "mainClass": "org.apache.spark.deploy.PythonRunner",
        "environmentVariables": {
            "SPARK_ENV_LOADED": "1"
        },
        "sparkProperties": {
            "spark.driver.supervise": "false",
            "spark.app.name": "FastAPI Spark Job",
            "spark.eventLog.dir": "hdfs://master:9000/spark-logs",
            "spark.eventLog.enabled": "true",
            "spark.submit.deployMode": "client",
            "spark.master": "spark://master:7077",
            "spark.driver.memory": "1g",
            "spark.executor.memory": "1g",
            "spark.submit.pyFiles": filter_url,
            "spark.pyspark.python": "/usr/bin/python3",
            "spark.pyspark.driver.python": "/usr/bin/python3"
        }
    }

    try:
        print("1. Spark 작업 제출 중...")
        print(f"Spark 작업 제출 데이터: {data}")  # 작업 제출 데이터를 출력
        response = requests.post(spark_url, json=data)
        response_data = response.json()

        if response.status_code == 200:
            submission_id = response_data.get("submissionId")
            print(f"2. 작업 제출 성공. Submission ID: {submission_id}")

        else:
            print(f"12. Spark 작업 제출 실패: {response.text}")
            raise HTTPException(status_code=response.status_code, detail="Spark 작업 제출 실패")
    except Exception as e:
        print(f"13. 서버 오류 발생: {str(e)}")
        raise HTTPException(status_code=500, detail=f"서버 오류 발생: {str(e)}")


async def upload_recipe_file_to_hdfs():
    # 업로드 할 파일 경로
    # local_directory = "../data/recipe/"
    local_directory = "/app/data/recipe/"

    # 로컬 디렉토리 내 모든 .csv 파일 목록 가져오기
    csv_files = [f for f in os.listdir(local_directory) if f.endswith('.csv')]

    print(f"1. 로컬 디렉토리 내 모든 .csv 파일 목록 가져오기")

    # HDFS 업로드 경로 (파일을 저장할 디렉토리)
    hdfs_directory = "/user/root/recipe/"

    # HDFS 디렉토리가 없으면 생성
    if not hdfs_client.status(hdfs_directory, strict=False):
        hdfs_client.makedirs(hdfs_directory)

    print(f"2. HDFS 디렉토리가 없으면 생성")

    hdfs_file_path = ""

    for file_name in csv_files:
        local_file_path = os.path.join(local_directory, file_name)
        hdfs_file_path = os.path.join(hdfs_directory, file_name)

        # HDFS에 해당 파일이 이미 존재하는지 확인
        if not hdfs_client.status(hdfs_file_path, strict=False):
            # 파일이 존재하지 않으면 업로드
            with open(local_file_path, 'rb') as local_file:
                hdfs_client.write(hdfs_file_path, local_file)
                print(f"Uploaded: {file_name}")
        else:
            print(f"Skipped (already exists): {file_name}")

    set_hdfs_upload_status(False)

    return {"message": f"Recipe Back File uploaded to {hdfs_file_path} in HDFS!"}


async def upload_price_file_to_hdfs():
    # 업로드 할 파일 경로
    # local_directory = "../data/recipe/"
    local_directory = "/app/data/price/"

    # 로컬 디렉토리 내 모든 .csv 파일 목록 가져오기
    csv_files = [f for f in os.listdir(local_directory) if f.endswith('.csv')]

    print(f"1. 로컬 디렉토리 내 모든 .csv 파일 목록 가져오기")

    # HDFS 업로드 경로 (파일을 저장할 디렉토리)
    hdfs_directory = "/user/root/price/"

    # HDFS 디렉토리가 없으면 생성
    if not hdfs_client.status(hdfs_directory, strict=False):
        hdfs_client.makedirs(hdfs_directory)

    print(f"2. HDFS 디렉토리가 없으면 생성")

    hdfs_file_path = ""

    for file_name in csv_files:
        local_file_path = os.path.join(local_directory, file_name)
        hdfs_file_path = os.path.join(hdfs_directory, file_name)

        # HDFS에 해당 파일이 이미 존재하는지 확인
        if not hdfs_client.status(hdfs_file_path, strict=False):
            # 파일이 존재하지 않으면 업로드
            with open(local_file_path, 'rb') as local_file:
                hdfs_client.write(hdfs_file_path, local_file)
                print(f"Uploaded: {file_name}")
        else:
            print(f"Skipped (already exists): {file_name}")

    set_hdfs_upload_status(False)

    return {"message": f"Price Back File uploaded to {hdfs_file_path} in HDFS!"}


async def upload_nutrient_file_to_hdfs():
    # 업로드 할 파일 경로
    # local_directory = "../data/recipe/"
    local_directory = "/app/data/nutrient/"

    # 로컬 디렉토리 내 모든 .csv 파일 목록 가져오기
    csv_files = [f for f in os.listdir(local_directory) if f.endswith('.csv')]

    print(f"1. 로컬 디렉토리 내 모든 .csv 파일 목록 가져오기")

    # HDFS 업로드 경로 (파일을 저장할 디렉토리)
    hdfs_directory = "/user/root/nutrient/"

    # HDFS 디렉토리가 없으면 생성
    if not hdfs_client.status(hdfs_directory, strict=False):
        hdfs_client.makedirs(hdfs_directory)

    print(f"2. HDFS 디렉토리가 없으면 생성")

    hdfs_file_path = ""

    for file_name in csv_files:
        local_file_path = os.path.join(local_directory, file_name)
        hdfs_file_path = os.path.join(hdfs_directory, file_name)

        # HDFS에 해당 파일이 이미 존재하는지 확인
        if not hdfs_client.status(hdfs_file_path, strict=False):
            # 파일이 존재하지 않으면 업로드
            with open(local_file_path, 'rb') as local_file:
                hdfs_client.write(hdfs_file_path, local_file)
                print(f"Uploaded: {file_name}")
        else:
            print(f"Skipped (already exists): {file_name}")

    set_hdfs_upload_status(False)

    return {"message": f"Price Back File uploaded to {hdfs_file_path} in HDFS!"}
