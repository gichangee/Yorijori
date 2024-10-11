package com.recipe.yorijori.controller;

import com.recipe.yorijori.client.RecipeServiceClient;
import com.recipe.yorijori.data.domain.User;
import com.recipe.yorijori.data.dto.allergy.request.AllergyRequestDto;
import com.recipe.yorijori.data.dto.allergy.response.AllergyResponseDto;
import com.recipe.yorijori.data.dto.common.response.CommonResponseDto;
import com.recipe.yorijori.data.dto.rank.RankResponseDto;
import com.recipe.yorijori.data.dto.rank.RankResponseWrapperDto;
import com.recipe.yorijori.data.dto.recipe.response.*;
import com.recipe.yorijori.data.dto.user.request.UserModifyRequestDto;
import com.recipe.yorijori.data.dto.user.request.UserSignUpDto;
import com.recipe.yorijori.data.dto.user.response.UserResponseDto;
import com.recipe.yorijori.global.exception.InCorrectAccessTokenException;
import com.recipe.yorijori.global.exception.NoAccessTokenException;
import com.recipe.yorijori.global.exception.Unauthorized;
import com.recipe.yorijori.global.exception.UserNotFoundException;
import com.recipe.yorijori.repository.UserRepository;
import com.recipe.yorijori.service.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
@Slf4j
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final RecipeServiceClient recipeServiceClient;
    private final S3Uploader s3Uploader;
    private final CommonService commonService;
    private final AllergyService allergyService;

    @PostMapping("/sign-up")
    public String signUp(@RequestBody UserSignUpDto userSignUpDto) throws Exception {
        userService.signUp(userSignUpDto);
        return "회원가입 성공";
    }

    @GetMapping("/recipe")
    public ResponseEntity<?> getUserRecipe(HttpServletRequest request) {

        String userEmail = getUserEmailFromRequest(request);
        Long userId = userService.getUserIdByEmail(userEmail);

        List<UserRecipeRegistResponseDto> userRecipeRegistResponseDto = recipeServiceClient.getUserRecipes(userId);

        return ResponseEntity.status(HttpStatus.OK).body(userRecipeRegistResponseDto);
    }

    @GetMapping("/like")
    public ResponseEntity<?> getUserRecipeLike(HttpServletRequest request) {

        String userEmail = getUserEmailFromRequest(request);
        Long userId = userService.getUserIdByEmail(userEmail);

        List<UserRecipeLikeResponseDto> userRecipeRegistererResponseDto = recipeServiceClient.getUserLikeRecipes(userId);

        for (UserRecipeLikeResponseDto likeRecipe : userRecipeRegistererResponseDto) {
            Long recipeUserId = likeRecipe.getUserId();
            User user = userRepository.findById(recipeUserId)
                    .orElseThrow(UserNotFoundException::new);
            likeRecipe.setNickname(user.getNickname());
            likeRecipe.setProfileImage(user.getProfileImage());
        }

        return ResponseEntity.status(HttpStatus.OK).body(userRecipeRegistererResponseDto);
    }

    @GetMapping("/scrap")
    public ResponseEntity<?> getUserRecipeScrap(HttpServletRequest request) {

        String userEmail = getUserEmailFromRequest(request);
        Long userId = userService.getUserIdByEmail(userEmail);

        List<UserRecipeScrapResponseDto> userRecipeScrapResponseDto = recipeServiceClient.getUserScrapRecipes(userId);

        for (UserRecipeScrapResponseDto scrapRecipe : userRecipeScrapResponseDto) {
            Long recipeUserId = scrapRecipe.getUserId();

            User user = userRepository.findById(recipeUserId)
                    .orElseThrow(UserNotFoundException::new);
            scrapRecipe.setNickname(user.getNickname());
            scrapRecipe.setProfileImage(user.getProfileImage());
        }

        return ResponseEntity.status(HttpStatus.OK).body(userRecipeScrapResponseDto);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUser(@PathVariable("userId") Long userId) {
        UserRecipeResponseDto userRecipeResponseDto = userService.getUserById(userId);
        return ResponseEntity.status(HttpStatus.OK).body(userRecipeResponseDto);
    }

    @GetMapping("/simple/{userId}")
    public UserSimpleResponseDto getSimpleUser(@PathVariable("userId") Long userId) {
        return userService.getSimpleUserById(userId);
    }

    @GetMapping("/id")
    public Long getUserId(@RequestHeader("Authorization") String authorization) {

        String accessToken = authorization.split(" ")[1];

        String userEmail = jwtService.extractEmail(accessToken)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 AccessToken입니다."));

        return userService.getUserIdByEmail(userEmail);
    }

    @PatchMapping("/user")
    public ResponseEntity<?> updateUserInfo(HttpServletRequest request, @RequestBody UserModifyRequestDto userModifyRequestDto) {

        String userEmail = getUserEmailFromRequest(request);

        userService.updateUser(userEmail, userModifyRequestDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<UserResponseDto> getUserInfo(HttpServletRequest request) {

        String userEmail = getUserEmailFromRequest(request);

        UserResponseDto userDto = userService.getUserByEmail(userEmail);

        return ResponseEntity.ok(userDto);

    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserResponseDto> getOtherUserInfo(@PathVariable("id") Long id) {

        String userEmail = userService.getEmailById(id);
        UserResponseDto userDto = userService.getUserByEmail(userEmail);

        return ResponseEntity.ok(userDto);
    }

    @GetMapping("/rank")
    public ResponseEntity<?> getUserRank() {

        List<RankResponseDto> userRank = userService.getUserRank();

        return ResponseEntity.status(HttpStatus.OK).body(userRank);
    }


    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshAccessToken(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = jwtService.extractRefreshToken(request)
                .filter(jwtService::isTokenValid)
                .orElseThrow(Unauthorized::new);

        return userRepository.findByRefreshToken(refreshToken)
                .map(user -> {
                    String newAccessToken = jwtService.createAccessToken(user.getEmail());
                    String newRefreshToken = jwtService.createRefreshToken();
                    user.updateRefreshToken(newRefreshToken);
                    userRepository.saveAndFlush(user);
                    jwtService.sendAccessAndRefreshToken(response, newAccessToken, newRefreshToken);
                    Map<String, String> tokens = new HashMap<>();
                    tokens.put("accessToken", newAccessToken);
                    tokens.put("refreshToken", newRefreshToken);

                    return ResponseEntity.ok(tokens);
                })
                .orElseThrow(Unauthorized::new);
    }


    @PostMapping("/update-profile")
    public ResponseEntity<?> uploadFile(HttpServletRequest request, @RequestParam("file") MultipartFile file) {
        String userEmail = getUserEmailFromRequest(request);
        Long userId = userService.getUserIdByEmail(userEmail);

        try {
            String fileUrl = s3Uploader.saveFile(file);
            userService.updateUserProfileImage(userId, fileUrl);
            return ResponseEntity.ok().body(fileUrl);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("파일 업로드 실패: " + e.getMessage());
        }
    }


    @GetMapping("/common")
    public ResponseEntity<List<CommonResponseDto>> getCommonList() {
        List<CommonResponseDto> commonList = commonService.getAllCommonCodes();
        return ResponseEntity.ok(commonList);
    }

    @GetMapping("/allergys")
    public ResponseEntity<?> getAllAllergy(@RequestHeader("Authorization") String authorization) {
        String accessToken = authorization.split(" ")[1];

        String userEmail = jwtService.extractEmail(accessToken)
                .orElseThrow(InCorrectAccessTokenException::new);

        Long userId = userService.getUserIdByEmail(userEmail);

        List<AllergyResponseDto> allergies = allergyService.getAllergiesByUserId(userId);

        return ResponseEntity.ok(allergies);
    }

    @PostMapping("/allergys")
    public ResponseEntity<AllergyResponseDto> addAllergy(HttpServletRequest request, @RequestBody AllergyRequestDto requestDto) {
        String userEmail = getUserEmailFromRequest(request);
        Long userId = userService.getUserIdByEmail(userEmail);
        AllergyResponseDto addedAllergy = allergyService.addAllergy(userId, requestDto);

        return ResponseEntity.ok(addedAllergy);
    }

    @DeleteMapping("/allergys/{commonCodeNum}")
    public ResponseEntity<?> deleteAllergy(HttpServletRequest request, @PathVariable String commonCodeNum) {
        String userEmail = getUserEmailFromRequest(request);
        Long userId = userService.getUserIdByEmail(userEmail);
        allergyService.deleteAllergyByCommonCodeNum(commonCodeNum, userId);

        return ResponseEntity.ok("알러지가 삭제되었습니다.");
    }


    @GetMapping("/recipe/other/{id}")
    public ResponseEntity<?> getOtherRecipe(@PathVariable Long id) {
        List<UserRecipeRegistResponseDto> userRecipeRegisterResponseDto = recipeServiceClient.getUserRecipes(id);

        // 비어있을 경우 빈 배열 반환
        if (userRecipeRegisterResponseDto.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(Collections.emptyList());
        }

        return ResponseEntity.status(HttpStatus.OK).body(userRecipeRegisterResponseDto);
    }


    private String getUserEmailFromRequest(HttpServletRequest request) {
        String accessToken = jwtService.extractAccessToken(request)
                .orElseThrow(NoAccessTokenException::new);
        return jwtService.extractEmail(accessToken)
                .orElseThrow(InCorrectAccessTokenException::new);
    }


    @GetMapping("/point/{userId}")
    public ResponseEntity<?> plusPoint(@PathVariable("userId") Long userId){
        userService.plusUserScore(userId, 10L); // 10점 추가
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
