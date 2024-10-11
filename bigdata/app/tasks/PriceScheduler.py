import asyncio
import csv
import os
from datetime import datetime, timedelta

import requests
from dotenv import load_dotenv

from app.globals import set_price_back_crawling_status

# .env 파일에서 환경 변수 로드
load_dotenv()

# 환경 변수 읽기
cert_key = os.getenv('PRICE_CERT_KEY')
cert_id = os.getenv('PRICE_CERT_ID')
api_url = os.getenv('PRICE_API_URL')

# 소매우선, 그 후 도매
p_cls_code = ["01", "02"]
p_category_code = {'식량작물': '100', '채소류': '200', '특용작물': '300', '과일류': '400', '축산물': '500', '수산물': '600'}
p_category_item_name = {
    '100': [
        "쌀", "찹쌀", "콩", "팥", "녹두", "메밀", "고구마", "감자"
    ],
    '200': [
        "양배추", "시금치", {"상추": {"적=상추&적상추", "청=청상추"}}, {"배추": "고랭지=배추&고랭지배추"}, "수박", "얼갈이배추",
        {"오이": {"가시=오이&가시오이", "다다기=다다기오이", "취청=취청오이"}}, {"호박": {"애호박", "쥬키니"}},
        "토마토", "무", "당근", "열무", "건고추", "참외", "고춧가루", "브로콜리",
        {"풋고추": {"풋고추=고추", "풋고추", "꽈리고추", "청양고추", "오이맛고추=오이고추"}},
        "붉은고추", {"피마늘": {"난지=마늘"}}, "양파", {"파": {"대파", "쪽파"}}, "생강", "미나리", "깻잎", "피망",
        "파프리카", "멜론", "깐마늘=마늘", "알배기배추", {"방울토마토": {"방울토마토", "대추방울토마토"}}
    ],
    '300': [
        "참깨", "들깨", "땅콩", {"느타리버섯": {"느타리버섯", "애느타리버섯"}}, "팽이버섯", "새송이버섯", "호두", "아몬드"
    ],
    '400': [
        "사과", "배", "복숭아", {"포도": {"캠벨얼리", "거봉", "MBA=머루포도", "샤인머스켓"}}, "감귤=귤", "바나나", "참다래=키위",
        "파인애플", "오렌지", "레몬", "망고", "체리", "아보카도"
    ],
    '500': [
        {"소": {"안심=소_안심", "등심=소_등심", "설도", "양지=소_양지", "갈비=소_갈비"}},
        {"돼지": {"앞다리=돼지_앞다리살", "삼겹살=돼지_삼겹살", "갈비=돼지_갈비", "목심=돼지_목심"}},
        "닭", "계란", "우유"
    ],
    '600': [
        "고등어", "꽁치", "갈치", "명태", "물오징어=오징어", "건멸치=멸치&건멸치", "북어=황태&북어",
        "건오징어=건오징어&마른오징어", {"김": {"마른김=김&마른김", "구운김"}}, "건미역=미역", "새우젓", "멸치액젓",
        "굵은소금", "전복", "새우", "홍합", "건다시마=다시마&건다시마", {"조기": {"참조기=조기&참조기", "굴비"}}
    ]
}

# kg, 개, 구, 마리, 속, 포기

seen = {}
filtered_items = []
# data_dir = "../data/price/"
data_dir = "/app/data/price/"


async def price_back_data_api_scheduler(get_start_date):
    # 경로가 존재하지 않으면 생성
    os.makedirs(data_dir, exist_ok=True)

    global filtered_items
    global seen
    start_date = datetime.strptime(get_start_date, "%Y-%m-%d")
    now_date = datetime.now()

    while start_date <= now_date:
        for category_code in p_category_item_name.keys():
            for cls_code in p_cls_code:
                try:
                    url = api_url

                    # 파라미터 설정
                    params = {
                        "action": "dailyPriceByCategoryList",  # API 액션
                        "p_product_cls_code": cls_code,  # 상품 구분 코드
                        "p_country_code": "1101",  # 국가 코드
                        "p_regday": start_date.strftime("%Y-%m-%d"),  # 조회 날짜
                        "p_convert_kg_yn": "N",  # kg 단위 변환 여부
                        "p_item_category_code": category_code,  # 품목 대분류 코드
                        "p_cert_key": cert_key,  # 인증 키
                        "p_cert_id": cert_id,  # 인증 ID
                        "p_returntype": "json",  # 반환 형식
                    }

                    # API 요청 보내기
                    response = requests.get(url, params=params)
                    await asyncio.sleep(2)

                    # 응답 상태 코드 확인
                    if response.status_code == 200:
                        data = response.json()

                        # data가 리스트인 경우 (에러 상황이거나 건너뛰어야 할 경우)
                        if isinstance(data["data"], list):
                            print(
                                f"{start_date.strftime('%Y-%m-%d')} - 상품 구분 코드: {cls_code} - 카테고리 코드: {category_code} - 잘못된 응답 형식 또는 에러 발생, 건너뜁니다.")
                            continue

                        # 정상적인 데이터 처리 (딕셔너리인 경우)
                        if isinstance(data, dict) and data["data"]["error_code"] == "000":
                            items = data["data"]["item"]

                            for item in items:
                                item_name = item["item_name"]
                                category_items = p_category_item_name[category_code]

                                for category_item in category_items:
                                    if isinstance(category_item, str):
                                        if item_name == category_item:
                                            process_item(item, item_name)
                                            break
                                    elif isinstance(category_item, dict):  # 규칙이 있는 항목 (예: 상추, 오이 등)
                                        for key, value in category_item.items():
                                            if item_name == key:
                                                kind_rules = value
                                                # kind_rules가 set인지 확인
                                                if isinstance(kind_rules, set):
                                                    for kind_rule in kind_rules:
                                                        if "=" in kind_rule:
                                                            kind_key, kind_value = kind_rule.split("=")
                                                            if kind_key in item["kind_name"]:
                                                                kind_names = kind_value.split("&")
                                                                for kind_name in kind_names:
                                                                    process_item(item, kind_name)
                                                        else:
                                                            if kind_rule in item["kind_name"]:
                                                                process_item(item, kind_rule)
                                                else:
                                                    # kind_rules가 문자열일 경우 처리
                                                    kind_rules_list = kind_rules.split(",")
                                                    for kind_rule in kind_rules_list:
                                                        if "=" in kind_rule:
                                                            kind_key, kind_value = kind_rule.split("=")
                                                            if kind_key in item["kind_name"]:
                                                                kind_names = kind_value.split("&")
                                                                for kind_name in kind_names:
                                                                    process_item(item, kind_name)
                                                        else:
                                                            if kind_rule in item["kind_name"]:
                                                                process_item(item, kind_rule)

                            print(
                                f"{start_date.strftime('%Y-%m-%d')} - 상품 구분 코드: {cls_code} - 카테고리 코드: {category_code} - API 요청 성공!")
                    else:
                        print(
                            f"API 요청 실패. 상태 코드: {response.status_code} - 날짜: {start_date.strftime('%Y-%m-%d')}, 상품 구분 코드: {cls_code}, 카테고리 코드: {category_code}")

                except Exception as e:
                    print(
                        f"에러 발생: {str(e)} - 날짜: {start_date.strftime('%Y-%m-%d')}, 상품 구분 코드: {cls_code}, 카테고리 코드: {category_code}")

        save_to_csv(filtered_items, start_date.strftime("%Y-%m-%d"))
        seen = {}
        filtered_items = []

        # 날짜를 하루씩 증가시킴
        start_date += timedelta(days=1)

    set_price_back_crawling_status(False)


def process_item(item, item_name):
    # 고유한 키를 저장될 이름인 item_name으로 설정
    key = item_name
    if key not in seen:
        seen[key] = True  # 중복 방지
        filtered_item = item.copy()
        filtered_item["item_name"] = item_name
        filtered_items.append(filtered_item)


def save_to_csv(filter_items, start_date):
    # CSV 파일로 저장할 필드명 정의
    csv_columns = ["item_name", "kind_name", "rank", "unit", "day1", "dpr1", "item_code",
                   "rank_code", "day2", "dpr2", "day3", "dpr3", "day4", "dpr4",
                   "day5", "dpr5", "day6", "dpr6", "day7", "dpr7"]
    csv_file_name = os.path.join(data_dir, f"price_back_{start_date}.csv")

    try:
        with open(csv_file_name, mode='w', newline='', encoding='utf-8') as file:
            writer = csv.DictWriter(file, fieldnames=csv_columns)
            writer.writeheader()

            # 각 아이템에서 모든 필드를 CSV에 쓰기
            for item in filter_items:
                filtered_item = {key: item.get(key, "") for key in csv_columns}  # 값이 없으면 빈 문자열로 대체
                writer.writerow(filtered_item)

        print(f"CSV 파일이 성공적으로 저장되었습니다: {csv_file_name}")
    except IOError:
        print("CSV 파일을 저장하는 동안 오류가 발생했습니다.")
