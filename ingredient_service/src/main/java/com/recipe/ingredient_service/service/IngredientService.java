package com.recipe.ingredient_service.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.recipe.ingredient_service.client.NaverSearchClient;
import com.recipe.ingredient_service.data.domain.DayPrice;
import com.recipe.ingredient_service.data.domain.Ingredient;
import com.recipe.ingredient_service.data.domain.UserLikeMaterials;
import com.recipe.ingredient_service.data.dto.ingredient.DayDto;
import com.recipe.ingredient_service.data.dto.ingredient.response.*;
import com.recipe.ingredient_service.global.exception.AlreadyLikedException;
import com.recipe.ingredient_service.repository.DayPriceRepository;
import com.recipe.ingredient_service.repository.IngredientRepository;
import com.recipe.ingredient_service.repository.RecipematerialsRepository;
import com.recipe.ingredient_service.repository.UserLikeMaterialsRepository;
import info.debatty.java.stringsimilarity.JaroWinkler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoField;
import java.util.*;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class IngredientService {

    private final UserLikeMaterialsRepository userLikeMaterialsRepository;
    private final IngredientRepository ingredientRepository;
    private final DayPriceRepository dayPriceRepository;
    private final RecipematerialsRepository recipematerialsRepository;

    private final NaverSearchClient naverSearchClient;

    private JaroWinkler jaroWinkler = new JaroWinkler();
    // 알러지 매핑 데이터
    private Map<String, List<String>> allergyMapping = new HashMap<>();
    private Map<String, String> allergyCodeMapping = new HashMap<>();

    // 초기화 블록에서 매핑 데이터 설정
    {
        allergyMapping.put("알류", List.of("달걀", "계란", "메추리알", "오리알", "난백", "흰자", "노른자", "계란파우더", "난백파우더", "마요네즈", "타르타르 소스", "홀랜다이즈 소스",
                "에그누들", "팬케이크 믹스", "머랭", "크레페", "에그"));
        allergyMapping.put("우유", List.of("우유", "연유", "크림", "치즈", "버터", "요거트", "사워 크림", "카제인", "유청 단백질", "우유 분말", "모차렐라치츠", "모짜렐라치즈", "크림치즈"));
        allergyMapping.put("메밀", List.of("메밀가루", "메밀면", "소바", "메밀빵", "메밀 크래커", "메밀 팬케이크", "메밀"));
        allergyMapping.put("땅콩", List.of("땅콩", "땅콩버터", "땅콩 오일", "땅콩 가루", "땅콩 소스", "땅콩 스낵"));
        allergyMapping.put("대두", List.of("대두", "콩", "두부", "된장", "간장", "콩기름", "콩 단백질", "템페", "낫토", "두유", "에다마메"));
        allergyMapping.put("밀", List.of("밀가루", "통밀", "빵", "파스타", "크래커", "시리얼", "쿠키", "케이크", "밀가루 베이스 믹스", "밀글루텐"));
        allergyMapping.put("잣", List.of("잣", "잣 오일", "잣 가루", "잣 페스토"));
        allergyMapping.put("호두", List.of("호두", "호두 오일", "호두 가루", "호두 스낵"));
        allergyMapping.put("게", List.of("게", "게살", "크랩 스틱", "게 소스"));
        allergyMapping.put("새우", List.of("새우", "건새우", "새우 페이스트", "새우칩"));
        allergyMapping.put("오징어", List.of("오징어", "마른 오징어", "오징어볼", "오징어젓갈"));
        allergyMapping.put("고등어", List.of("고등어", "고등어 통조림", "훈제 고등어"));
        allergyMapping.put("조개류", List.of("조개", "바지락", "홍합", "가리비", "굴", "전복", "모시조개", "대합"));
        allergyMapping.put("복숭아", List.of("복숭아", "복숭아 잼", "복숭아 통조림", "복숭아 주스"));
        allergyMapping.put("토마토", List.of("토마토", "토마토 페이스트", "토마토 소스", "토마토 퓨레", "케첩"));
        allergyMapping.put("닭고기", List.of("닭고기", "닭가슴살", "닭날개", "닭다리", "치킨 스톡", "닭고기 소시지"));
        allergyMapping.put("돼지고기", List.of("돼지고기", "삼겹살", "베이컨", "햄", "소시지", "돼지갈비", "돼지앞다리살", "앞다리살", "돼지삼겹살", "돼지목심", "목살", "목심"));
        allergyMapping.put("쇠고기", List.of("쇠고기", "소고기", "스테이크", "쇠고기 소시지", "쇠고기 스톡", "쇠고기 다짐육", "소갈비", "설도", "안심", "등심", "양지", "소안심", "소등심", "소양지"));
        allergyMapping.put("아황산류", List.of("건조 과일", "와인"));

        allergyCodeMapping.put("알류", "A_0001");
        allergyCodeMapping.put("우유", "A_0002");
        allergyCodeMapping.put("메밀", "A_0003");
        allergyCodeMapping.put("땅콩", "A_0004");
        allergyCodeMapping.put("대두", "A_0005");
        allergyCodeMapping.put("밀", "A_0006");
        allergyCodeMapping.put("잣", "A_0007");
        allergyCodeMapping.put("호두", "A_0008");
        allergyCodeMapping.put("게", "A_0009");
        allergyCodeMapping.put("새우", "A_0010");
        allergyCodeMapping.put("오징어", "A_0011");
        allergyCodeMapping.put("고등어", "A_0012");
        allergyCodeMapping.put("조개류", "A_0013");
        allergyCodeMapping.put("복숭아", "A_0014");
        allergyCodeMapping.put("토마토", "A_0015");
        allergyCodeMapping.put("닭고기", "A_0016");
        allergyCodeMapping.put("돼지고기", "A_0017");
        allergyCodeMapping.put("쇠고기", "A_0018");
        allergyCodeMapping.put("아황산류", "A_0019");
    }

    public Ingredient findMatchingIngredient(String ingredientName) {
        ingredientName = ingredientName.trim();
        log.info("ingredientName : {}", ingredientName);


        Optional<Ingredient> foundIngredient = ingredientRepository.findByName(ingredientName);

        log.info("foundIngredient 1: {}", foundIngredient);
        if (foundIngredient.isPresent()) {

            return foundIngredient.get();
        }
        log.info("foundIngredient 2: {}", foundIngredient);
        List<Ingredient> ingredients = ingredientRepository.findAll();
        Ingredient bestMatch = null;
        double highestSimilarity = 0.0;


        for (Ingredient item : ingredients) {
            double similarity = jaroWinkler.similarity(ingredientName, item.getName());

            if (similarity > highestSimilarity && similarity >= 0.9) {
                highestSimilarity = similarity;
                bestMatch = item;
            }
        }

        if (bestMatch != null) {
            return bestMatch;
        }
        return null;
    }

    private String findMatchingAllergyCode(String ingredientName) {
        String bestMatchCategory = null;
        double highestSimilarity = 0.0;

        for (Map.Entry<String, List<String>> entry : allergyMapping.entrySet()) {
            String allergyCategory = entry.getKey();
            List<String> items = entry.getValue();

            for (String item : items) {
                double similarity = jaroWinkler.similarity(ingredientName, item);
                if (similarity > highestSimilarity && similarity >= 0.9) {
                    highestSimilarity = similarity;
                    bestMatchCategory = allergyCategory;
                }
            }
        }

        if (bestMatchCategory != null)
            return allergyCodeMapping.get(bestMatchCategory);

        return null;
    }

    public IngredientIdResponseDto findSimilarName(String name) {
        Ingredient findIngredient = findMatchingIngredient(name);

        if (findIngredient == null) {
            String allergyCode = findMatchingAllergyCode(name);
            Ingredient newIngredient = Ingredient.builder()
                    .name(name)
                    .priceStatus(false)
                    .allergyNum(allergyCode)
                    .build();

            Ingredient saveIngredient = ingredientRepository.save(newIngredient);

            return IngredientIdResponseDto.builder()
                    .id(saveIngredient.getId())
                    .build();
        }

        return IngredientIdResponseDto.builder()
                .id(findIngredient.getId())
                .build();
    }

    public IngredientsSearchResponseDto findIngredientData(String name) {
        Ingredient findIngredient = findMatchingIngredient(name);
        if (findIngredient == null) {
            return IngredientsSearchResponseDto.builder()
                    .id(null)
                    .name("Unknown")
                    .ingredientImage("")
                    .dayprice(0)
                    .build();
        }

        DayPrice findTopDayIngredientPrice = dayPriceRepository.findTopByIngredientIdAndPriceGreaterThanOrderByDayDesc(findIngredient.getId(), 0);
        if (findTopDayIngredientPrice == null) {
            return IngredientsSearchResponseDto.builder()
                    .id(findIngredient.getId())
                    .name(findIngredient.getName())
                    .ingredientImage(findIngredient.getIngredientImage())
                    .dayprice(0)
                    .build();
        }

        return IngredientsSearchResponseDto.builder()
                .id(findIngredient.getId())
                .name(findIngredient.getName())
                .ingredientImage(findIngredient.getIngredientImage())
                .dayprice(findTopDayIngredientPrice.getPrice())
                .build();
    }

    public List<IngredientPriceChangeResponseDto> findAllIngredientPriceData() {

        List<Long> priceIngredientList = ingredientRepository.findMaterialIdsWithPriceStatusTrue();

        if (priceIngredientList == null || priceIngredientList.isEmpty()) {
            return new ArrayList<>();
        }

        List<Object[]> priceChanges = dayPriceRepository.findIngredientPriceChanges(priceIngredientList);

        if (priceChanges == null) {
            return new ArrayList<>();
        }

        List<IngredientPriceChangeResponseDto> responseDtoList = new ArrayList<>();

        if (priceChanges.size() % 2 != 0) {
            throw new IllegalStateException("priceChanges Data Wrong");
        }

        for (int i = 0; i < priceChanges.size(); i += 2) {
            Long ingredientId = (Long) priceChanges.get(i)[0];
            Integer currentPrice = (Integer) priceChanges.get(i)[1];
            Integer yesterdayPrice = (Integer) priceChanges.get(i + 1)[1];
            int priceGapPrice = (currentPrice - yesterdayPrice);

            if (priceGapPrice == 0)
                continue;

            String ingredientName = ingredientRepository.findById(ingredientId)
                    .map(Ingredient::getName)
                    .orElse("Unknown Ingredient");

            if (!ingredientName.equals("Unknown Ingredient")) {
                IngredientPriceChangeResponseDto dto = IngredientPriceChangeResponseDto.builder()
                        .id(ingredientId)
                        .name(ingredientName)
                        .currentPrice(currentPrice.toString())
                        .yesterdayPrice(yesterdayPrice.toString())
                        .priceGap(priceGapPrice)
                        .build();

                responseDtoList.add(dto);
            }
        }
        responseDtoList.sort(Comparator.comparing(IngredientPriceChangeResponseDto::getPriceGap));

        return responseDtoList;
    }

    public IngredientPriceDetailsResponseDto findAllDayIngredientPriceData(Long ingredientId) {
        IngredientPriceDetailsResponseDto newIngredient = new IngredientPriceDetailsResponseDto();

        // 현재 시간 기준
        LocalDateTime today = LocalDateTime.now();

        // 일간 데이터 조회
        List<DayDto> dayPriceList = getRecentDayPrice(ingredientId, today);
        newIngredient.setDayPriceData(dayPriceList);

        // 주간 데이터 조회
        List<DayDto> weeklyAveragePriceList = getRecentWeekPrice(ingredientId, today);
        newIngredient.setWeekPriceData(weeklyAveragePriceList);

        // 월간 데이터 조회
        List<DayDto> monthlyAveragePriceList = getRecentMonthPrice(ingredientId, today);
        newIngredient.setMonthPriceData(monthlyAveragePriceList);

        return newIngredient;
    }

    // 월간
    private List<DayDto> getRecentMonthPrice(Long ingredientId, LocalDateTime today) {
        List<Object[]> monthlyAverages = dayPriceRepository.findMonthlyAveragePriceInPast(ingredientId, today);

        List<DayDto> monthlyAveragePriceList = new ArrayList<>();
        Map<Integer, BigDecimal> monthPriceMap = new HashMap<>(); // 월별 가격 매핑

        if (monthlyAverages != null && !monthlyAverages.isEmpty()) {
            // 월별 데이터 매핑
            for (Object[] result : monthlyAverages) {
                int monthNum = (int) result[0];
                BigDecimal avgPrice = (BigDecimal) result[1];
                monthPriceMap.put(monthNum, avgPrice);
            }

            for (int i = 0; i < 12; i++) {
                int targetMonth = today.minusMonths(i).getMonthValue();
                BigDecimal price = monthPriceMap.get(targetMonth);
                int monthsAgo = i + 1;

                if (price != null && price.intValue() != 0) {
                    monthlyAveragePriceList.add(new DayDto(monthsAgo, price.intValue()));
                } else {
                    monthlyAveragePriceList.add(new DayDto(monthsAgo, 0)); // 데이터가 없으면 0
                }
            }
        }
        return monthlyAveragePriceList;
    }

    // 주간
    private List<DayDto> getRecentWeekPrice(Long ingredientId, LocalDateTime today) {
        List<Object[]> weeklyAverages = dayPriceRepository.findWeeklyAveragePriceInPast(ingredientId, today);

        List<DayDto> weeklyAveragePriceList = new ArrayList<>();
        Map<Integer, BigDecimal> weekPriceMap = new HashMap<>(); // 주별 가격 매핑

        if (weeklyAverages != null && !weeklyAverages.isEmpty()) {
            // 주별 데이터 매핑
            for (Object[] result : weeklyAverages) {
                int weekNum = (int) result[0];
                BigDecimal avgPrice = (BigDecimal) result[1];
                weekPriceMap.put(weekNum, avgPrice);
            }

            for (int i = 0; i < 12; i++) {
                int targetWeek = today.minusWeeks(i).get(ChronoField.ALIGNED_WEEK_OF_YEAR);
                BigDecimal price = weekPriceMap.get(targetWeek);
                int weeksAgo = i + 1;

                if (price != null && price.intValue() != 0) {
                    weeklyAveragePriceList.add(new DayDto(weeksAgo, price.intValue()));
                } else {
                    weeklyAveragePriceList.add(new DayDto(weeksAgo, 0)); // 데이터가 없으면 0
                }
            }
        }

        return weeklyAveragePriceList;
    }

    // 일간
    private List<DayDto> getRecentDayPrice(Long ingredientId, LocalDateTime today) {
        Pageable pageable = PageRequest.of(0, 12);
        List<DayPrice> findTopDayIngredientPrice = dayPriceRepository.findRecentDays(ingredientId, today, pageable);

        List<DayDto> dayPriceList = new ArrayList<>();
        Map<LocalDateTime, Integer> dayPriceMap = new HashMap<>();

        // 일간 데이터 매핑
        for (DayPrice dayPrice : findTopDayIngredientPrice) {
            dayPriceMap.put(dayPrice.getDay(), dayPrice.getPrice());
        }

        for (int i = 0; i < 12; i++) {
            LocalDateTime currentDate = today.minusDays(i);
            Integer price = dayPriceMap.get(currentDate);
            int daysAgo = i + 1;

            if (price != null && price != 0) {
                dayPriceList.add(new DayDto(daysAgo, price));
            } else {
                dayPriceList.add(new DayDto(daysAgo, 0)); // 데이터가 없으면 0
            }
        }

        return dayPriceList;
    }

    public List<IngredientPopularResponseDto> findPopularIngredients(int day) {

        LocalDateTime startDate = LocalDateTime.now().minusDays(day);
        Pageable pageable = PageRequest.of(0, 3);

        List<Object[]> topLikedIngredients = userLikeMaterialsRepository.findTop3LikedIngredients(startDate, pageable);

        return topLikedIngredients.stream().map(result -> {
            Long ingredientId = (Long) result[0];
            Long likeCount = (Long) result[1];

            Ingredient ingredient = ingredientRepository.findById(ingredientId)
                    .orElseThrow(() -> new NoSuchElementException("재료를 찾을 수 없습니다. ID: " + ingredientId));

            Pageable pricePageable = PageRequest.of(0, 1);
            int price = dayPriceRepository.findRecentDays(ingredientId, LocalDateTime.now(), pricePageable)
                    .stream()
                    .findFirst()
                    .map(DayPrice::getPrice)
                    .orElse(0);

            return new IngredientPopularResponseDto(
                    ingredientId,
                    ingredient.getName(),
                    ingredient.getIngredientImage(),
                    price,
                    likeCount
            );
        }).collect(Collectors.toList());
    }

    public void addUserIngredientLike(Long userId, Long ingredientId) {

        boolean isAlreadyLiked = userLikeMaterialsRepository.existsByUserIdAndIngredientId(userId, ingredientId);
        if (isAlreadyLiked) {
            throw new AlreadyLikedException();
        }
        UserLikeMaterials newLike = UserLikeMaterials.builder()
                .userId(userId)
                .ingredientId(ingredientId)
                .date(LocalDateTime.now())
                .build();

        userLikeMaterialsRepository.save(newLike);
    }

    @Transactional
    public void removeUserIngredientLike(Long userId, Long ingredientId) {
        userLikeMaterialsRepository.deleteByUserIdAndIngredientId(userId, ingredientId);
    }

    public List<IngredientUserLikeDto> findUserLikeIngredients(Long userId) {
        List<Long> ingredientList = userLikeMaterialsRepository.findIngredientIdsByUserId(userId);

        return ingredientRepository.findByIds(ingredientList)
                .stream().map(ingredient -> {
                    Pageable pageable = PageRequest.of(0, 1);
                    List<DayPrice> recentDays = dayPriceRepository.findRecentDays(ingredient.getId(), LocalDateTime.now(), pageable);

                    int price = recentDays.isEmpty() ? 0 : recentDays.get(0).getPrice();
                    
                    return new IngredientUserLikeDto(
                            ingredient.getId(),
                            ingredient.getName(),
                            ingredient.isPriceStatus(),
                            ingredient.getIngredientImage(),
                            ingredient.getAllergyNum(),
                            price
                    );
                })
                .collect(Collectors.toList());
    }

    public Ingredient addIngredient(String name) {
        Ingredient ingredient = Ingredient.builder()
                .name(name)
                .ingredientImage("")
                .allergyNum("")
                .priceStatus(true)
                .build();

        ingredientRepository.save(ingredient);

        return ingredient;
    }


    public List<Long> getRecipeIdByIngredients(List<Long> ingredientIds) {
        Pageable limit = PageRequest.of(0, 3);  // 최대 3개 결과 반환

        // 제공된 재료를 모두 포함하고 있을 경우 해당 레시피를 반환
        return recipematerialsRepository.findRecipeIdsByAtLeastIngredientIds(ingredientIds, (long) ingredientIds.size(), limit);
    }


    public Ingredient findById(Long materialId) {
        return ingredientRepository.findById(materialId)
                .orElseThrow(() -> new NoSuchElementException("해당 재료가 존재하지 않습니다."));
    }

    public Ingredient findAllergyById(Long materialId) {
        return ingredientRepository.findById(materialId)
                .orElseThrow(() -> new NoSuchElementException("해당 재료가 존재하지 않습니다."));


    }

    public List<LowestPriceDto> getLowestPriceResult(String query, String display, String start, String sort) throws Exception {
        Object data = naverSearchClient.getLowestPriceResult(query, display, start, sort);
        ObjectMapper objectMapper = new ObjectMapper();

        Map<String, Object> mapData = objectMapper.readValue((String) data, new TypeReference<Map<String, Object>>() {
        });
        List<Map<String, Object>> items = (List<Map<String, Object>>) mapData.get("items");
        return items.stream()
                .map(LowestPriceDto::from)
                .collect(Collectors.toList());
    }

}
