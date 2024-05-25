package com.main.happyhub_backend.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.main.happyhub_backend.model.AdminModel;
import com.main.happyhub_backend.model.User;


public interface AdminRepository extends CrudRepository<AdminModel, Integer>{
    Optional<AdminModel> findByUser(User user);
    Optional<AdminModel> findByUserEmail(String email);
}

