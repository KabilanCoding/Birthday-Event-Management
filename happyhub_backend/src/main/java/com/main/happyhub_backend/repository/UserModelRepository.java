package com.main.happyhub_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.main.happyhub_backend.model.User;
import com.main.happyhub_backend.model.UserModel;


public interface UserModelRepository extends JpaRepository<UserModel,Integer> {
    Optional<UserModel> findByUser(User user);
    Optional<UserModel> findByUserEmail(String email);
}
