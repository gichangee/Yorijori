import asyncio
import os
from itertools import islice

import pandas as pd
import requests
from bs4 import BeautifulSoup
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

from app.globals import set_recipe_back_crawling_status

# data_dir = "../data/recipe/"
data_dir = "/app/data/recipe/"

by_type = {'밑반찬': '63', '메인반찬': '56', '국/탕': '54', '찌개': '55', '디저트': '60', '면/만두': '53',
           '밥/죽/떡': '52', '퓨전': '61', '양념/잼/소스': '58', '양식': '65', '샐러드': '64', '스프': '68',
           '빵': '66', '과자': '69', '차/음료/술': '59'}  # cat4
by_situation = {'일상': '12', '초스피드': '18', '손님접대': '13', '술안주': '19', '다이어트': '21',
                '도시락': '15', '영양식': '43', '간식': '17', '야식': '45', '명절': '44'}  # cat2
by_ingredient = {'소고기': '70', '돼지고기': '71', '닭고기': '72', '육류': '23', '채소류': '28', '해물류': '24',
                 '달걀/유제품': '50', '쌀': '47', '밀가루': '32', '건어물류': '25', '버섯류': '31', '과일류': '48',
                 '곡류': '26'}  # cat3
by_method = {'볶음': '6', '끓이기': '1', '부침': '7', '조림': '36', '무침': '41', '비빔': '42',
             '찜': '8', '절임': '10', '튀김': '9', '삶기': '38', '굽기': '67', '회': '37'}  # cat1


# 시작위치 받아서 시작하는 API 만들기
# 현재 크롤링중인 위치 보내주는 API
# 현재까지 크롤링한 데이터


async def recipe_back_data_crawling_scheduler(get_type, get_situation, get_ingredient, get_method, get_page,
                                              recipe_idx):
    recipe_url = None  # 기본값으로 None 설정

    try:
        # 경로가 존재하지 않으면 생성
        os.makedirs(data_dir, exist_ok=True)

        # 세션, 리트라이
        session = requests.Session()
        retry = Retry(total=5, backoff_factor=2, status_forcelist=[500, 502, 503, 504])
        adapter = HTTPAdapter(max_retries=retry)
        session.mount('http://', adapter)
        session.mount('https://', adapter)

        list4df = []

        for type_key, type_value in islice(by_type.items(), get_type, None):
            print(f"{type_key} 카테고리의 레시피를 처리 중입니다...")

            for situ_key, situ_value in islice(by_situation.items(), get_situation, None):
                print(f"{situ_key} 카테고리의 레시피를 처리 중입니다...")

                for ing_key, ing_value in islice(by_ingredient.items(), get_ingredient, None):
                    print(f"{ing_key} 카테고리의 레시피를 처리 중입니다...")

                    for method_key, method_value in islice(by_method.items(), get_method, None):
                        print(f"{method_key} 카테고리의 레시피를 처리 중입니다...")

                        # -------------------------크롤링 코드 --------------------------

                        main_url = 'https://www.10000recipe.com/recipe/list.html?q=&query=&' \
                                   'cat1={m}&cat2={s}&cat3={i}&cat4={t}' \
                                   '&fct=&order=reco&lastcate=cat4&dsearch=&copyshot=&scrap=&degree=&portion=&time=&niresource=' \
                            .format(m=method_value, s=situ_value, i=ing_value, t=type_value)

                        print(f"레시피 목록 페이지 요청 중: {main_url}")

                        response = session.get(main_url, headers={'User-Agent': 'Mozilla/5.0'})
                        await asyncio.sleep(2)  # 페이지 리스트 요청 후 2초 지연

                        if response.status_code == 200:  # 정상 연결시

                            print(f"{main_url} 페이지에서 응답을 성공적으로 받았습니다.")
                            soup = BeautifulSoup(response.text, 'html.parser')
                            page_len = len(soup.select('#contents_area_full > ul > nav > ul > li'))

                            while get_page <= page_len + 1:

                                if get_page % 10 == 1 and get_page != 1:
                                    print(f"{main_url} 페이지에서 응답을 성공적으로 받았습니다.")
                                    soup = BeautifulSoup(response.text, 'html.parser')
                                    page_len = len(soup.select('#contents_area_full > ul > nav > ul > li'))

                                if get_page != 1:
                                    main_url = main_url + '&page=' + str(get_page)
                                    response = session.get(main_url, headers={'User-Agent': 'Mozilla/5.0'})
                                    # HTTP 상태 코드 체크
                                    if response.status_code == 200:  # 정상 응답일 때
                                        soup = BeautifulSoup(response.text, 'html.parser')
                                        print(f"다음 페이지로 이동 중: {main_url}")
                                        await asyncio.sleep(2)  # 페이지 변경 후 2초 지연

                                    else:
                                        print(f"페이지 이동 실패. 상태 코드: {response.status_code} - {main_url}")
                                        break  # 오류 발생 시 반복문 탈출

                                sources = soup.select(
                                    '#contents_area_full > ul > ul > li > div.common_sp_thumb > a')
                                for source in sources:

                                    # 상세정보 크롤링 시작
                                    recipe_url = 'https://www.10000recipe.com' + \
                                                 str(source).split('href')[1].split('"')[1]
                                    response_r = session.get(recipe_url, headers={'User-Agent': 'Mozilla/5.0'})
                                    soup_r = BeautifulSoup(response_r.text, 'html.parser')
                                    print(f"레시피 URL: {recipe_url}")
                                    await asyncio.sleep(2)  # 레시피 상세 요청 후 2초 지연

                                    # 글제목
                                    try:
                                        title = soup_r.select_one(
                                            '.view2_summary.st3 > h3').text.strip()  # h3 태그의 텍스트 추출 후 공백 제거
                                        print(f"글 제목: {title}")
                                    except Exception as e:
                                        print(f"Error occurred: {e}")
                                        title = 'None'
                                        print("제목을 찾을 수 없습니다.")

                                    # 이미지
                                    try:
                                        dish_image = soup_r.select_one('#main_thumbs')['src']
                                        print(f"레시피 이미지 URL: {dish_image}")
                                    except Exception as e:
                                        print(f"Error occurred: {e}")
                                        dish_image = 'None'

                                    # 레시피 이름
                                    dish_title_element = soup_r.find('b', {
                                        'style': 'color:#74b243;'})  # 'b' 태그에서 특정 style 속성을 가진 요소 찾기
                                    if dish_title_element:  # 요소가 존재할 경우
                                        dish_title = dish_title_element.text  # 텍스트를 추출
                                        print(f"레시피 이름: {dish_title}")
                                    else:
                                        dish_title = 'None'
                                        print("요리제목을 찾을 수 없습니다.")

                                    if title == 'None' and dish_title_element == 'None':
                                        continue

                                    # 조회수
                                    views_element = soup_r.select('span.hit.font_num')
                                    if views_element:  # 요소가 존재할 경우
                                        views = views_element[0].text  # 첫 번째 요소의 텍스트 추출
                                        print(f"조회수: {views}")
                                    else:
                                        views = 'None'
                                        print("조회수 정보를 찾을 수 없습니다.")

                                    # 조리시간
                                    # 난이도
                                    # 인분

                                    try:
                                        summary_info = soup_r.select('.view2_summary_info span')
                                        servings = summary_info[0].text.strip()
                                        cooking_time = summary_info[1].text.strip()  # 두 번째 span: 시간 정보
                                        difficulty = summary_info[2].text.strip()  # 세 번째 span: 난이도 정보
                                        print(f"조리시간: {cooking_time}, 난이도: {difficulty}, 인분: {servings}")

                                    except Exception as e:
                                        print(f"Error occurred: {e}")
                                        cooking_time, difficulty, servings = 'None', 'None', 'None'

                                    # 재료

                                    try:
                                        # 재료의 이름과 수량을 저장할 리스트
                                        ingredient = []

                                        # 모든 재료 항목을 추출
                                        materials = soup_r.select('#divConfirmedMaterialArea li')

                                        for material in materials:
                                            # 재료 이름 추출
                                            name = material.select_one('.ingre_list_name').text.strip()

                                            # 재료 수량 추출
                                            amount = material.select_one('.ingre_list_ea').text.strip()

                                            # 이름과 수량을 튜플로 저장
                                            ingredient.append((name, amount))
                                        print(f"재료: {ingredient}")
                                    except Exception as e:
                                        print(f"Error occurred: {e}")
                                        ingredient = []

                                    # 소개글
                                    try:
                                        intro = soup_r.select_one('#recipeIntro').text.strip()
                                        print(f"소개글: {intro}")
                                    except Exception as e:
                                        print(f"Error occurred: {e}")
                                        intro = None

                                    cooking_order = []
                                    
                                    # 조리순서
                                    try:
                                        # 단계별 조리법과 이미지를 저장할 리스트
                                        cooking_order = []
                                        step_num = 1

                                        # stepDiv가 연속된 숫자를 가질 때까지 반복
                                        while True:
                                            step_id = f'stepDiv{step_num}'  # stepDiv1, stepDiv2, ...
                                            step_div = soup_r.find('div', {'id': step_id})

                                            if not step_div:
                                                break  # 더 이상 해당 ID를 가진 요소가 없으면 종료

                                            # 조리법 추출
                                            step_descr = step_div.select_one(f'#stepdescr{step_num}').text.strip()

                                            # 이미지 URL 추출
                                            step_img_tag = step_div.select_one(f'#stepimg{step_num} img')
                                            step_img_url = step_img_tag['src'] if step_img_tag else None

                                            # 추출된 조리법과 이미지 URL을 리스트에 추가
                                            cooking_order.append({
                                                'step_number': step_num,
                                                'description': step_descr,
                                                'image_url': step_img_url
                                            })

                                            # 다음 단계로 이동
                                            step_num += 1

                                        # 결과 출력
                                        for step in cooking_order:
                                            print(f"Step {step['step_number']}: {step['description']}")
                                            print(f"Image URL: {step['image_url']}\n")

                                    except Exception as e:
                                        print(f"Error occurred: {e}")

                                    # 상세정보 크롤링 끝
                                    list4df.append(
                                        [recipe_idx, type_key, situ_key, ing_key, method_key, title, dish_title,
                                         dish_image, views,
                                         cooking_time, difficulty, servings, ingredient, intro, cooking_order])
                                    recipe_idx += 1

                                # 페이지 변경 -> csv 저장
                                # 데이터프레임 생성 및 저장
                                recipe_df = pd.DataFrame(list4df,
                                                         columns=['index', '종류별', '상황별', '재료별', '방법별', '글 제목',
                                                                  '레시피이름', '레시피이미지',
                                                                  '조회수', '조리시간', '난이도', '인분', '재료', '소개글', '조리순서'])

                                print(recipe_df)

                                if not list4df:
                                    break

                                save_recipe_fname = os.path.join(data_dir,
                                                                 f"recipe_back_{get_type}_{get_situation}_{get_ingredient}_{get_method}_{get_page}.csv")

                                # 데이터프레임을 CSV 파일로 저장 (덮어쓰기 모드)
                                recipe_df.to_csv(save_recipe_fname, encoding='utf-8', index=False)

                                print(f"데이터가 {save_recipe_fname}파일로 저장되었습니다.")
                                list4df = []  # 데이터를 저장했으므로 리스트를 초기화

                                get_page += 1

                        else:
                            print(f"메인 URL 연결 실패. 상태 코드: {response.status_code}")

                        get_page = 1
                        get_method += 1

                    get_method = 0
                    get_ingredient += 1

                get_ingredient = 0
                get_situation += 1

            get_situation = 0
            get_type += 1

    except Exception as e:
        print(f"에러 발생: {e}")
        print(f"에러가 발생한 레시피 URL: {recipe_url}")

    finally:
        print("크롤링 작업이 종료되었으며, 잠금이 해제되었습니다.")
        set_recipe_back_crawling_status(False)
