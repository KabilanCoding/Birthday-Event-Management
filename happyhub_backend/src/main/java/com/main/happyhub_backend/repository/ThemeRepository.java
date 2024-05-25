package com.main.happyhub_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.main.happyhub_backend.model.ThemeModel;

public interface ThemeRepository extends JpaRepository<ThemeModel,Integer> {

}
