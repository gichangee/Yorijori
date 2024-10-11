import pytz
from hdfs import InsecureClient
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, when
from sqlalchemy import Column, BigInteger, String, Double
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

Base = declarative_base()

# load_dotenv()

# KST 타임존 설정
kst = pytz.timezone('Asia/Seoul')

DATABASE_URL = "mysql+pymysql://eejuuung:eejuuung@mysql:3306/yorijori?charset=utf8mb4"


class engineconnection:

    def __init__(self):
        self.engine = create_engine(DATABASE_URL, echo=False, pool_recycle=500)

    def sessionmaker(self):
        Session = sessionmaker(bind=self.engine)
        session = Session()
        return session

    def connection(self):
        conn = self.engine.connect()

        return conn


# HDFS 클라이언트 설정 (HDFS NameNode 주소로 접속)
hdfs_client = InsecureClient('http://master:9870', user='root')
hdfs_directory = "/user/root/nutrient/"

# Spark 세션 생성
spark = SparkSession.builder \
    .appName("Filter Nutrient Squash") \
    .config("spark.sql.shuffle.partitions", "50") \
    .getOrCreate()


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


def main():
    # 파일 경로를 이용해 데이터를 정제 및 저장
    print("1. hdfs 파일 정제시작")
    process_nutrient_data()

    print(f"Uploaded data to MySQL")

    spark.stop()
    return {"message": "All files processed and uploaded to MySQL"}


def process_nutrient_data():
    print("2. hdfs 에서 파일 읽기")
    df = spark.read.csv(
        "hdfs://master:9000/user/root/nutrient/*.csv",
        header=True,
        inferSchema=True,
        encoding='utf-8'
    )

    print("3. hdfs read.csv 성공")
    # item_name이 null이 아닌 행만 필터링
    df = df.filter(df['식품명'].isNotNull() & df['영양성분함량기준량'].isNotNull() & df['에너지(kcal)'].isNotNull())

    # 영양성분함량기준량
    df = df.withColumn(
        "영양성분함량기준량",
        when(col("영양성분함량기준량").isNull(), 0).otherwise(col("영양성분함량기준량"))
    )

    # 에너지(kcal)
    df = df.withColumn(
        "에너지(kcal)",
        when(col("에너지(kcal)").isNull(), 0).otherwise(col("에너지(kcal)"))
    )

    # 단백질(g)
    df = df.withColumn(
        "단백질(g)",
        when(col("단백질(g)").isNull(), 0).otherwise(col("단백질(g)"))
    )

    # 탄수화물(g)
    df = df.withColumn(
        "탄수화물(g)",
        when(col("탄수화물(g)").isNull(), 0).otherwise(col("탄수화물(g)"))
    )

    # 지방(g)
    df = df.withColumn(
        "지방(g)",
        when(col("지방(g)").isNull(), 0).otherwise(col("지방(g)"))
    )

    # 콜레스테롤(mg)
    df = df.withColumn(
        "콜레스테롤(mg)",
        when(col("콜레스테롤(mg)").isNull(), 0).otherwise(col("콜레스테롤(mg)"))
    )

    # 나트륨(mg)
    df = df.withColumn(
        "나트륨(mg)",
        when(col("나트륨(mg)").isNull(), 0).otherwise(col("나트륨(mg)"))
    )

    # 데이터를 리스트로 변환 (collect 사용)
    rows = df.collect()

    print(f"남아있는 데이터의 수: {len(rows)}")

    for idx, row in enumerate(rows, 1):  # idx는 1부터 시작
        # 각 row를 순회하며 필요한 값들을 가져옴
        item_name = row['식품명']
        capacity = row['영양성분함량기준량']
        kcal = row['에너지(kcal)']
        protein = row['단백질(g)']
        carbohydrate = row['탄수화물(g)']
        fat = row['지방(g)']
        cholesterol = row['콜레스테롤(mg)']
        salt = row['나트륨(mg)']

        print(f"총 {len(rows)}개 중 {idx}번째 row 처리 중입니다.")

        print("6. 레시피 저장")

        save_nutrient_db(item_name, capacity, kcal, protein, carbohydrate, fat, cholesterol, salt)


def save_nutrient_db(item_name, capacity, kcal, protein, carbohydrate, fat, cholesterol, salt):
    engine = engineconnection()
    session = engine.sessionmaker()

    new_nutrient = RecipeNutrient(
        name=item_name,
        capacity=capacity,
        kcal=kcal,
        protein=protein,
        carbohydrate=carbohydrate,
        fat=fat,
        cholesterol=cholesterol,
        salt=salt
    )
    session.add(new_nutrient)
    session.commit()
    session.close()


if __name__ == "__main__":
    main()
