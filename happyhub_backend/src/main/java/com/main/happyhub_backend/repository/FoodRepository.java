package com.main.happyhub_backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.main.happyhub_backend.model.FoodModel;

public interface FoodRepository extends JpaRepository<FoodModel,Integer> {
    @Query("SELECT f FROM FoodModel f WHERE CONCAT('-', f.foodId, '-') LIKE %:foodIdPattern%")
    List<FoodModel> findByFoodIdPattern(@Param("foodIdPattern") String foodIdPattern);
}
