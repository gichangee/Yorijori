# import os
#
# from dotenv import load_dotenv
# from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
#
# load_dotenv()
#
# DATABASE_URL = os.getenv("DATABASE_URL")
#
# # 비동기 엔진 생성
# engine = create_async_engine(DATABASE_URL, echo=True, future=True)
#
# # 비동기 세션 생성
# SessionLocal = sessionmaker(
#     bind=engine,
#     class_=AsyncSession,
#     autocommit=False,
#     autoflush=False
# )
#
# # Declarative Base 생성
# Base = declarative_base()
