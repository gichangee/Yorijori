package com.recipe.yorijori.service;

import com.recipe.yorijori.client.RecipeServiceClient;
import com.recipe.yorijori.client.SocialServiceClient;
import com.recipe.yorijori.data.domain.User;
import com.recipe.yorijori.data.dto.rank.RankResponseDto;
import com.recipe.yorijori.data.dto.rank.RankResponseWrapperDto;
import com.recipe.yorijori.data.dto.recipe.response.*;
import com.recipe.yorijori.data.dto.user.request.UserModifyRequestDto;
import com.recipe.yorijori.data.dto.user.request.UserSignUpDto;
import com.recipe.yorijori.data.dto.user.response.FollowerResponseDto;
import com.recipe.yorijori.data.dto.user.response.FollowingResponseDto;
import com.recipe.yorijori.data.dto.user.response.UserResponseDto;
import com.recipe.yorijori.data.enums.Role;
import com.recipe.yorijori.global.exception.*;
import com.recipe.yorijori.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RecipeServiceClient recipeServiceClient;
    private final SocialServiceClient socialServiceClient;

    public void signUp(UserSignUpDto userSignUpDto) throws Exception {

        if (userRepository.findByEmail(userSignUpDto.getEmail()).isPresent()) {
            throw new AlreadyEmailException();
        }

        if (userRepository.findByNickname(userSignUpDto.getNickname()).isPresent()) {
            throw new AlreadyNicknameException();
        }

        User user = User.builder()
                .email(userSignUpDto.getEmail())
                .password(userSignUpDto.getPassword())
                .nickname(userSignUpDto.getNickname())
                .role(Role.USER)
                .build();

        user.passwordEncode(passwordEncoder);
        userRepository.save(user);
    }


    public UserResponseDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(UserNotFoundEmailException::new);


        return new UserResponseDto(
                user.getUserId(),
                user.getEmail(),
                user.getNickname(),
                user.getProfileImage(),
                user.getName(),
                user.getScore(),
                user.getSummary(),
                mapFollowersToDto(user.getUserId()),
                mapFollowingsToDto(user.getUserId())
        );
    }

    public UserRecipeResponseDto getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        List<RecipeResponseDto> recipeList = recipeServiceClient.getRecipes(userId);

        ModelMapper modelMapper = new ModelMapper();
        UserRecipeResponseDto userRecipeResponseDto = modelMapper.map(user, UserRecipeResponseDto.class);
        userRecipeResponseDto.setRecipes(recipeList);

        return userRecipeResponseDto;
    }


    public List<FollowerResponseDto> mapFollowersToDto(Long userId) {
        List<Long> followerIds = socialServiceClient.getFollowers(userId);
        return followerIds.stream().map(followerId -> {
            User follower = userRepository.findById(followerId)
                    .orElseThrow(UserNotFoundException::new);
            return new FollowerResponseDto(
                    follower.getUserId(),
                    follower.getNickname(),
                    follower.getProfileImage()
            );
        }).collect(Collectors.toList());
    }

    public List<FollowingResponseDto> mapFollowingsToDto(Long userId) {
        List<Long> followingIds = socialServiceClient.getFollowings(userId);
        return followingIds.stream().map(followingId -> {
            User following = userRepository.findById(followingId)
                    .orElseThrow(UserNotFoundException::new);
            return new FollowingResponseDto(
                    following.getUserId(),
                    following.getNickname(),
                    following.getProfileImage()
            );
        }).collect(Collectors.toList());
    }

    public Long getUserIdByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(UserNotFoundEmailException::new);
        return user.getUserId();
    }

    public String getEmailByNickname(String nickname) {
        User user = userRepository.findByNickname(nickname)
                .orElseThrow(UserNotFoundNicknameException::new);

        return user.getEmail();
    }

    public UserSimpleResponseDto getSimpleUserById(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        return UserSimpleResponseDto.builder()
                .userId(user.getUserId())
                .profileImage(user.getProfileImage())
                .nickname(user.getNickname())
                .summary(user.getSummary())
                .build();
    }

    public void updateUser(String email, UserModifyRequestDto userModifyRequestDto) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(UserNotFoundEmailException::new);

        if (userModifyRequestDto.getNickname() != null) {
            user.setNickname(userModifyRequestDto.getNickname());
        }
        if (userModifyRequestDto.getSummary() != null) {
            user.setSummary(userModifyRequestDto.getSummary());
        }

        userRepository.save(user);
    }

//    public RankResponseWrapperDto getUserRank(int pageSize, int pageNumber) {
//
//        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, Sort.by(Sort.Direction.DESC, "score"));
//        Page<User> usersPage = userRepository.findAll(pageable);
//
//        Long totalUserCount = userRepository.count();
//
//        List<RankResponseDto> rankResponseDtoList = usersPage.getContent().stream()
//                .map(user -> {
//                    RankResponseDto rankResponseDto = new RankResponseDto();
//                    rankResponseDto.setNickname(user.getNickname());
//                    rankResponseDto.setImage(user.getProfileImage());
//                    rankResponseDto.setScore(user.getScore());
//
//                    List<UserRecipeRegistResponseDto> userRecipes = recipeServiceClient.getUserRecipes(user.getUserId());
//                    rankResponseDto.setRecipeCount((long) userRecipes.size());
//
//                    List<UserRecipeLikeResponseDto> userRecipeLikes = recipeServiceClient.getUserLikeRecipes(user.getUserId());
//                    rankResponseDto.setLikeCount((long) userRecipeLikes.size());
//
//                    return rankResponseDto;
//                })
//                .toList();
//
//        return RankResponseWrapperDto.builder()
//                .totalUserCount(totalUserCount)
//                .rankList(rankResponseDtoList)
//                .build();
//    }

    public List<RankResponseDto> getUserRank() {

        // Fetch all users
        List<User> users = userRepository.findAll().stream()
                .sorted(Comparator.comparing(User::getScore).reversed()) // 점수를 기준으로 내림차순 정렬
                .toList();

        // 인덱스를 관리하는 AtomicInteger 선언
        AtomicInteger index = new AtomicInteger(1);

        // Convert each user to RankResponseDto and return the list
        return users.stream()
                .map(user -> {
                    RankResponseDto rankResponseDto = new RankResponseDto();

                    // AtomicInteger를 사용하여 순위 설정 후 증가
                    rankResponseDto.setRank((long) index.getAndIncrement());

                    rankResponseDto.setUserId(user.getUserId());
                    rankResponseDto.setNickname(user.getNickname());
                    rankResponseDto.setImage(user.getProfileImage());
                    rankResponseDto.setScore(user.getScore());

                    // Fetch user's recipe count and likes count using external services
                    List<UserRecipeRegistResponseDto> userRecipes = recipeServiceClient.getUserRecipes(user.getUserId());
                    rankResponseDto.setRecipeCount((long) userRecipes.size());

                    List<UserRecipeLikeResponseDto> userRecipeLikes = recipeServiceClient.getUserLikeRecipes(user.getUserId());
                    rankResponseDto.setLikeCount((long) userRecipeLikes.size());

                    return rankResponseDto;
                })
                .toList();
    }

    public void updateUserProfileImage(Long userId, String profileImageUrl) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        user.setProfileImage(profileImageUrl);
        userRepository.save(user);
    }

    public String getEmailById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);
        return user.getEmail();
    }


    public void plusUserScore(Long userId, Long points) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        user.plusScore(points);
        userRepository.save(user);
    }
}