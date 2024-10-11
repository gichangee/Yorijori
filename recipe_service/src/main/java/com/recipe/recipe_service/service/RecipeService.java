package com.recipe.recipe_service.service;

import com.recipe.recipe_service.client.IngredientServiceClient;
import com.recipe.recipe_service.client.UserServiceClient;
import com.recipe.recipe_service.data.domain.*;
import com.recipe.recipe_service.data.dto.ingredient.response.RecipeMaterialsAllergyResponseDto;
import com.recipe.recipe_service.data.dto.recipe.request.RecipeRegisterRequestDto;
import com.recipe.recipe_service.data.dto.recipe.response.*;
import com.recipe.recipe_service.data.dto.recommend.response.RecipeRecommendResponseDto;
import com.recipe.recipe_service.data.dto.user.response.UserSimpleResponseDto;
import com.recipe.recipe_service.repository.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@AllArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final RecipeLikesRepository recipeLikesRepository;
    private final RecipeCommentsRepository recipeCommentsRepository;
    private final RecipeScrapsRepository recipeScrapsRepository;
    private final RecipeMaterialsRepository recipeMaterialsRepository;
    private final RecipeOrdersRepository recipeOrdersRepository;

    private final UserServiceClient userServiceClient;
    private final IngredientServiceClient ingredientServiceClient;

    public Recipe createRecipe(RecipeRegisterRequestDto createRecipeDto, Long userId) {

        // Builder 패턴을 사용하여 RecipeRegisterRequestDto 객체 생성
        Recipe recipeEntity = Recipe.builder()
                .userId(userId)  // userId를 설정
                .title(createRecipeDto.getTitle())  // 다른 값들을 그대로 사용
                .name(createRecipeDto.getName())
                .intro(createRecipeDto.getIntro())
                .image(createRecipeDto.getImage())
                .likeCount(0L)
                .viewCount(0L)
                .servings(createRecipeDto.getServings())
                .time(createRecipeDto.getTime())
                .level(createRecipeDto.getLevel())
                .cookingTools(createRecipeDto.getCookingTools())
                .type(createRecipeDto.getType())
                .situation(createRecipeDto.getSituation())
                .ingredients(createRecipeDto.getIngredients())
                .method(createRecipeDto.getMethod())
                .userStatus(true)  // 필요 시 기본값을 넣거나 그대로 사용
                .build();

        // 레시피 저장
        Recipe savedRecipe = recipeRepository.save(recipeEntity);

        // RecipeMaterials 저장
        if (createRecipeDto.getRecipeMaterials() != null) {
            List<RecipeMaterials> materialsList = createRecipeDto.getRecipeMaterials().stream()
                    .map(materialDto -> RecipeMaterials.builder()
                            .recipeId(savedRecipe.getId())
                            .materialId(materialDto.getMaterialId()) // 재료 ID 사용
                            .amount(materialDto.getMaterialAmount())
                            .unit(materialDto.getMaterialUnit())
                            .subtitle(materialDto.getMaterialSubtitle())
                            .build())
                    .collect(Collectors.toList());
            recipeMaterialsRepository.saveAll(materialsList);
        }

        // RecipeOrders 저장
        if (createRecipeDto.getRecipeOrders() != null) {
            List<RecipeOrders> ordersList = createRecipeDto.getRecipeOrders().stream()
                    .map(orderDto -> RecipeOrders.builder()
                            .recipeId(savedRecipe.getId())
                            .orderNum(orderDto.getOrderNum())
                            .image(orderDto.getOrderImg())
                            .content(orderDto.getOrderContent())
                            .build())
                    .collect(Collectors.toList());
            recipeOrdersRepository.saveAll(ordersList);
        }

        // 변환된 엔티티를 저장
        return savedRecipe;
    }

    public Iterable<Recipe> getRecipesByUserEmail(Long userId) {
        return recipeRepository.findByUserId(userId);
    }

    public List<RecipeDetailsResponseDto> getAllRecipes(int pageNumber, int pageSize) {
        // 페이지 요청을 생성하여 레시피를 페이징 처리
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Page<Recipe> recipePage = recipeRepository.findAll(pageable);

        // 페이지 결과에서 데이터를 추출하여 DTO로 변환
        return recipePage.getContent().stream()
                .map(recipe -> {
                    // Feign Client를 통해 유저 정보를 가져오기
                    UserSimpleResponseDto userInfo = userServiceClient.getUserInfo(recipe.getUserId());

                    // 유저 정보를 포함한 DTO로 변환
                    return RecipeDetailsResponseDto.builder()
                            .id(recipe.getId())
                            .title(recipe.getTitle())
                            .name(recipe.getName())
                            .intro(recipe.getIntro())
                            .image(recipe.getImage())
                            .viewCount(recipe.getViewCount())
                            .servings(recipe.getServings())
                            .time(recipe.getTime())
                            .level(recipe.getLevel())
                            .type(recipe.getType())
                            .situation(recipe.getSituation())
                            .ingredients(recipe.getIngredients())
                            .method(recipe.getMethod())
                            .userId(recipe.getUserId())
                            .nickname(userInfo.getNickname()) // 유저의 닉네임 설정
                            .profileImage(userInfo.getProfileImage()) // 유저의 프로필 이미지 설정
                            .summary(userInfo.getSummary()) // 유저의 요약 정보 설정
                            .likeCount(recipe.getLikeCount())
                            .scrapCount(recipe.getScrapCount())
                            .commentCount(recipe.getCommentCount())
                            .build();
                })
                .toList();
    }

    public RecipeDetailsAllergyResponseDto getRecipe(Long recipeId) {

        // 레시피 조회
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new EntityNotFoundException("해당 ID에 해당하는 레시피가 존재하지 않습니다."));

        // 유저 정보 조회
        UserSimpleResponseDto userInfo = userServiceClient.getUserInfo(recipe.getUserId());

        // 레시피 재료 가져오기
        List<RecipeMaterials> recipeMaterials = recipeMaterialsRepository.findByRecipeId(recipeId);

        // 재료를 DTO로 변환
        List<RecipeMaterialsAllergyResponseDto> recipeMaterialsAllergyResponseDto = recipeMaterials.stream()
                .map(material -> RecipeMaterialsAllergyResponseDto.builder()
                        .materialId(material.getMaterialId())
                        .materialName(ingredientServiceClient.getIngredientNameById(material.getMaterialId())) // 재료 이름 가져오기
                        .amount(material.getAmount())
                        .unit(material.getUnit())
                        .subtitle(material.getSubtitle())
                        .allergyCode(ingredientServiceClient.getIngredientAllergyById(material.getMaterialId()))
                        .build())
                .toList();

        // 레시피 요리 순서 가져오기
        List<RecipeOrders> recipeOrders = recipeOrdersRepository.findByRecipeId(recipeId);

        // 요리 순서를 DTO로 변환
        List<RecipeOrdersResponseDto> recipeOrdersResponseDto = recipeOrders.stream()
                .map(order -> RecipeOrdersResponseDto.builder()
                        .orderNum(order.getOrderNum())
                        .orderImg(order.getImage())
                        .orderContent(order.getContent())
                        .build())
                .toList();


        // 레시피 상세 정보를 RecipeDetailsResponseDto로 변환
        return RecipeDetailsAllergyResponseDto.builder()
                .id(recipe.getId())
                .title(recipe.getTitle())
                .name(recipe.getName())
                .intro(recipe.getIntro())
                .image(recipe.getImage())
                .viewCount(recipe.getViewCount())
                .servings(recipe.getServings())
                .time(recipe.getTime())
                .level(recipe.getLevel())
                .cookingTools(recipe.getCookingTools())
                .type(recipe.getType())
                .situation(recipe.getSituation())
                .ingredients(recipe.getIngredients())
                .method(recipe.getMethod())
                .userId(userInfo.getUserId())
                .nickname(userInfo.getNickname())
                .profileImage(userInfo.getProfileImage())
                .summary(userInfo.getSummary())
                .likeCount(recipe.getLikeCount())
                .scrapCount(recipe.getScrapCount())
                .commentCount(recipe.getCommentCount())
                .calorie(recipe.getKcal())
                .price(null)
                .materials(recipeMaterialsAllergyResponseDto) // 재료 추가
                .recipeOrders(recipeOrdersResponseDto) // 요리 순서 추가
                .build();

    }
    
    // 레시피 검색
    public Page<RecipeDetailsResponseDto> searchRecipe(String keyword, Pageable pageable) {

        // 필터링을 위한 쿼리 작성
        Page<Recipe> recipePage = recipeRepository.searchByKeyword(keyword, pageable);

        // 검색된 레시피를 DTO로 변환하여 반환 (페이징 결과로 변환)
        return recipePage.map(recipe -> {

            // 유저 정보 조회
            UserSimpleResponseDto userInfo = userServiceClient.getUserInfo(recipe.getUserId());

            // 유저 정보를 포함한 DTO로 변환
            return RecipeDetailsResponseDto.builder()
                    .id(recipe.getId())
                    .title(recipe.getTitle())
                    .name(recipe.getName())
                    .intro(recipe.getIntro())
                    .image(recipe.getImage())
                    .viewCount(recipe.getViewCount())
                    .servings(recipe.getServings())
                    .time(recipe.getTime())
                    .level(recipe.getLevel())
                    .cookingTools(recipe.getCookingTools())
                    .type(recipe.getType())
                    .situation(recipe.getSituation())
                    .ingredients(recipe.getIngredients())
                    .method(recipe.getMethod())
                    .userId(recipe.getUserId())
                    .nickname(userInfo.getNickname()) // 유저의 닉네임 설정
                    .profileImage(userInfo.getProfileImage()) // 유저의 프로필 이미지 설정
                    .summary(userInfo.getSummary()) // 유저의 요약 정보 설정
                    .likeCount(recipe.getLikeCount())
                    .scrapCount(recipe.getScrapCount())
                    .commentCount(recipe.getCommentCount())
                    .build();
        });
    }

    @Transactional
    public void addComment(Long recipeId, Long userId, String content) {
        RecipeComments newComment = RecipeComments.builder()
                .recipeId(recipeId)
                .userId(userId)
                .commentContent(content)
                .status(true) // 댓글 등록
                .build();

        recipeCommentsRepository.save(newComment);
    }

    public List<RecipeComments> getCommentsByRecipeId(Long recipeId) {
        // 댓글 조회
        return recipeCommentsRepository.findByRecipeId(recipeId);
    }

    // 특정 userId에 해당하는 레시피 조회
    public List<UserRecipeRegistResponseDto> getRecipesByUserId(Long userId) {
        List<Recipe> recipes = recipeRepository.findByUserId(userId);

        // Entity를 DTO로 변환
        return recipes.stream()
                .map(recipe -> new UserRecipeRegistResponseDto(
                        recipe.getId(),
                        recipe.getTitle(),
                        recipe.getName(),
                        recipe.getIntro(),
                        recipe.getImage(),
                        recipe.getViewCount(),
                        recipe.getServings(),
                        recipe.getTime(),
                        recipe.getLevel(),
                        recipe.getCookingTools(),
                        recipe.getType(),
                        recipe.getSituation(),
                        recipe.getIngredients(),
                        recipe.getMethod(),
                        recipe.getUserId(),
                        recipe.getLikeCount(),
                        recipe.getScrapCount(),
                        recipe.getCommentCount()
                ))
                .limit(100) // 레시피 1000개 조회 제한
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<UserRecipeLikeResponseDto> getUserLikeRecipes(Long userId) {
        // 특정 유저가 좋아요한 레시피 ID 목록 가져오기
        List<RecipeLikes> likedRecipes = recipeLikesRepository.findByUserIdAndStatusTrue(userId);

        // 레시피 ID에 해당하는 레시피 정보를 가져와 DTO로 변환
        List<UserRecipeLikeResponseDto> likedRecipeDtos = likedRecipes.stream()
                .map(recipeLike -> {
                    Recipe recipe = recipeRepository.findById(recipeLike.getRecipeId())
                            .orElseThrow(() -> new EntityNotFoundException("Recipe not found"));

                    return new UserRecipeLikeResponseDto(
                            recipe.getId(),
                            recipe.getTitle(),
                            recipe.getName(),
                            recipe.getIntro(),
                            recipe.getImage(),
                            recipe.getViewCount(),
                            recipe.getServings(),
                            recipe.getTime(),
                            recipe.getLevel(),
                            recipe.getCookingTools(),
                            recipe.getType(),
                            recipe.getSituation(),
                            recipe.getIngredients(),
                            recipe.getMethod(),
                            recipe.getUserId(),
                            recipe.getLikeCount(),
                            recipe.getScrapCount(),
                            recipe.getCommentCount(),
                            "",
                            ""
                    );
                })
                .collect(Collectors.toList());

        return likedRecipeDtos;
    }

    @Transactional(readOnly = true)
    public List<UserRecipeScrapResponseDto> getUserScrapRecipes(Long userId) {
        // 특정 유저가 좋아요한 레시피 ID 목록 가져오기
        List<RecipeScraps> scrapedRecipes = recipeScrapsRepository.findByUserIdAndStatusTrue(userId);

        // 레시피 ID에 해당하는 레시피 정보를 가져와 DTO로 변환
        List<UserRecipeScrapResponseDto> scrapedRecipeDtos = scrapedRecipes.stream()
                .map(recipeScraps -> {
                    Recipe recipe = recipeRepository.findById(recipeScraps.getRecipeId())
                            .orElseThrow(() -> new EntityNotFoundException("Recipe not found"));

                    return new UserRecipeScrapResponseDto(
                            recipe.getId(),
                            recipe.getTitle(),
                            recipe.getName(),
                            recipe.getIntro(),
                            recipe.getImage(),
                            recipe.getViewCount(),
                            recipe.getServings(),
                            recipe.getTime(),
                            recipe.getLevel(),
                            recipe.getCookingTools(),
                            recipe.getType(),
                            recipe.getSituation(),
                            recipe.getIngredients(),
                            recipe.getMethod(),
                            recipe.getUserId(),
                            recipe.getLikeCount(),
                            recipe.getScrapCount(),
                            recipe.getCommentCount(),
                            "",
                            ""
                    );
                })
                .collect(Collectors.toList());

        return scrapedRecipeDtos;
    }


    @Transactional
    public void deleteRecipe(Long recipeId, Long userId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new EntityNotFoundException("해당 아이디를 가진 레시피가 존재하지 않습니다."));

        if (!recipe.getUserId().equals(userId)) {
            throw new IllegalStateException("해당 레시피를 삭제할 권한이 없습니다.");
        }

        // 1. 레시피에 대한 모든 재료 삭제
        List<RecipeMaterials> materials = recipeMaterialsRepository.findByRecipeId(recipeId);
        recipeMaterialsRepository.deleteAll(materials);

        // 2. 레시피에 대한 모든 순서 삭제
        List<RecipeOrders> orders = recipeOrdersRepository.findByRecipeId(recipeId);
        recipeOrdersRepository.deleteAll(orders);

        // 3. 레시피에 대한 모든 좋아요 삭제
        List<RecipeLikes> likes = recipeLikesRepository.findByRecipeId(recipeId);
        recipeLikesRepository.deleteAll(likes);

        // 4. 레시피에 대한 모든 스크랩 삭제
        List<RecipeScraps> scraps = recipeScrapsRepository.findByRecipeId(recipeId);
        recipeScrapsRepository.deleteAll(scraps);

        // 5. 레시피에 대한 모든 댓글 삭제
        List<RecipeComments> comments = recipeCommentsRepository.findByRecipeId(recipeId);
        recipeCommentsRepository.deleteAll(comments);

        // 6. 레시피 삭제
        recipeRepository.deleteById(recipeId);
    }

    @Transactional
    public void deleteComment(Long commentId, Long userId) {

        RecipeComments comments = recipeCommentsRepository.findById(commentId)
                .orElseThrow(() -> new EntityNotFoundException("해당 댓글이 존재하지 않습니다."));

        if (!comments.getUserId().equals(userId)) {
            throw new IllegalStateException("해당 댓글을 삭제할 권한이 없습니다.");
        }

        recipeCommentsRepository.deleteById(commentId);
    }

    public Page<RecipeCategoryResponseDto> searchRecipeByCategory(String codeB, String codeC, String codeD, String codeE, Pageable pageable) {

        // 필터링을 위한 쿼리 작성 - 필요 시 각 필드가 존재할 때만 필터링
        Page<Recipe> foundRecipes = recipeRepository.findRecipesByCategory(codeB, codeC, codeD, codeE, pageable);

        // 검색된 레시피를 DTO로 변환하여 반환 (페이징 결과로 변환)
        return foundRecipes.map(recipe -> {

            // 유저 정보 조회
            UserSimpleResponseDto userInfo = userServiceClient.getUserInfo(recipe.getUserId());

            return RecipeCategoryResponseDto.builder()
                    .id(recipe.getId())
                    .title(recipe.getTitle())
                    .name(recipe.getName())
                    .intro(recipe.getIntro())
                    .image(recipe.getImage())
                    .viewCount(recipe.getViewCount())
                    .servings(recipe.getServings())
                    .time(recipe.getTime())
                    .level(recipe.getLevel())
                    .cookingTools(recipe.getCookingTools())
                    .type(recipe.getType())
                    .situation(recipe.getSituation())
                    .ingredients(recipe.getIngredients())
                    .method(recipe.getMethod())
                    .userId(recipe.getUserId())
                    .nickname(userInfo.getNickname())
                    .profileImage(userInfo.getProfileImage())
                    .likeCount(recipe.getLikeCount())
                    .scrapCount(recipe.getScrapCount())
                    .commentCount(recipe.getCommentCount())
                    .build();
        });

    }

}