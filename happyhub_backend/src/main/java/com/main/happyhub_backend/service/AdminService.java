package com.main.happyhub_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.main.happyhub_backend.model.AddonModel;
import com.main.happyhub_backend.model.AdminModel;
import com.main.happyhub_backend.model.FoodModel;
import com.main.happyhub_backend.model.ThemeModel;
import com.main.happyhub_backend.model.User;
import com.main.happyhub_backend.repository.AddonRepository;
import com.main.happyhub_backend.repository.AdminRepository;
import com.main.happyhub_backend.repository.FoodRepository;
import com.main.happyhub_backend.repository.ThemeRepository;
import com.main.happyhub_backend.repository.UserRepository;

@Service
public class AdminService {
    @Autowired
    AdminRepository adminRepository;
    @Autowired
    UserRepository userRepo;
    @Autowired
    ThemeRepository themeRepository;
    @Autowired
    AddonRepository addonRepository;
    @Autowired
    FoodRepository foodRepository;

    public Optional<AdminModel> getAdmin(int id){
        return adminRepository.findById(id);
    }

    public String updateAdmin(AdminModel adminModel){
        Optional<User> user = userRepo.findByEmail(adminModel.getUser().getEmail());
        if(user.isEmpty()){
            return "User not found";
        }
        user.get().setName(adminModel.getUser().getName());
        userRepo.save(user.get());
        Optional<AdminModel> admin  = adminRepository.findByUser(user.get());
        admin.get().setMobileNumber(adminModel.getMobileNumber());
        adminRepository.save(admin.get());
        return "Updated successfully";
    }

    public String addTheme(String email,ThemeModel themeModel){
        Optional<AdminModel> admin = adminRepository.findByUserEmail(email);
        if(admin.isEmpty()){
            return "User not found";
        }
        themeModel.setAdminModel(admin.get());
        themeRepository.save(themeModel);
        return "Theme added successfully";
    }

    public List<ThemeModel> getThemesByAdmin(String email){
        Optional<AdminModel> admin = adminRepository.findByUserEmail(email);
        if(admin.isEmpty()){
            return null;
        }
        return admin.get().getThemes();
    }

    public List<ThemeModel> getAllThemes(){
        return themeRepository.findAll();
    }

    public ThemeModel getThemeById(int id){
        return themeRepository.findById(id).get();
    }
    
    public String addAddOns(String email,AddonModel addonModel){
        Optional<AdminModel> admin = adminRepository.findByUserEmail(email);
        if(admin.isEmpty()){
            return "User not found";
        }
        addonModel.setAdminModel(admin.get());
        addonRepository.save(addonModel);
        return "Add-on added successfully";
    }

    public String updateThemes(ThemeModel themeModel){
        Optional<ThemeModel> themes = themeRepository.findById(themeModel.getThemeId());
        if(themes.isEmpty()){
            return "Themes not found";
        }
        ThemeModel themeToUpdate = themes.get();
        themeToUpdate.setThemeName(themeModel.getThemeName());
        themeToUpdate.setThemeImageURL(themeModel.getThemeImageURL());
        themeToUpdate.setThemeDescription(themeModel.getThemeDescription());
        themeToUpdate.setThemeCost(themeModel.getThemeCost());
        themeToUpdate.setThemePhotographer(themeModel.getThemePhotographer());
        themeToUpdate.setThemeReturnGift(themeModel.getThemeReturnGift());
        themeToUpdate.setThemeVideographer(themeModel.getThemeVideographer());
        themeToUpdate.setPublished(themeModel.isPublished());
        themeRepository.save(themeToUpdate);
        return "Updated Successfully";
    }

    public String updateAddon(AddonModel addonModel) {
        Optional<AddonModel> addon = addonRepository.findById(addonModel.getAddonId());
        if (addon.isEmpty()) {
            return "Addon not found";
        }
        AddonModel updateAddonModel = addon.get();
        updateAddonModel.setAddonName(addonModel.getAddonName());
        updateAddonModel.setAddonDescription(addonModel.getAddonDescription());
        updateAddonModel.setAddonPrice(addonModel.getAddonPrice());
        updateAddonModel.setAddonImageURL(addonModel.getAddonImageURL());
        updateAddonModel.setPublished(addonModel.isPublished());
        addonRepository.save(updateAddonModel);
        return "Addon updated successfully";
    }

    public String updateFood(FoodModel foodModel) {
        Optional<FoodModel> food = foodRepository.findById(foodModel.getFoodId());
        if (food.isEmpty()) {
            return "Food not found";
        }
        FoodModel updateFoodModel = food.get();
        updateFoodModel.setFoodName(foodModel.getFoodName());
        updateFoodModel.setFoodImageURL(foodModel.getFoodImageURL());
        updateFoodModel.setFoodDescription(foodModel.getFoodDescription());
        updateFoodModel.setFoodPrice(foodModel.getFoodPrice());
        updateFoodModel.setPublished(foodModel.isPublished());
        foodRepository.save(updateFoodModel);
        return "Food updated successfully";
    }

    public List<AddonModel> getAddOnsByAdmin(String email){
        Optional<AdminModel> admin = adminRepository.findByUserEmail(email);
        if(admin.isEmpty()){
            return null;
        }
        return admin.get().getAddons();
    }

    public List<AddonModel> getAllAddOnds(){
        return addonRepository.findAll();
    }

    public AddonModel getAddOnById(int id){
        return addonRepository.findById(id).get();
    }
    
    public String addFood(String email,FoodModel foodModel){
        Optional<AdminModel> admin = adminRepository.findByUserEmail(email);
        if(admin.isEmpty()){
            return "User not found";
        }
        foodModel.setAdminModel(admin.get());
        foodRepository.save(foodModel);
        return "Food added successfully";
    }

    public List<FoodModel> getFoodByAdmin(String email){
        Optional<AdminModel> admin = adminRepository.findByUserEmail(email);
        if(admin.isEmpty()){
            return null;
        }
        return admin.get().getFoods();
    }

    public List<FoodModel> getFoodById(String pattern){
        return foodRepository.findByFoodIdPattern(pattern);
    }

    public List<FoodModel> getAllFoods(){
        return foodRepository.findAll();
    }

    public FoodModel getFoodById(int id){
        return foodRepository.findById(id).get();
    }

    public String deleteTheme(int id){
        Optional<ThemeModel> theme = themeRepository.findById(id);
        if(theme.isEmpty()){
            return "Theme not found";
        }
        themeRepository.deleteById(id);
        return "Theme Deleted";
    }

    public String deleteAddon(int id){
        Optional<AddonModel> addon = addonRepository.findById(id);
        if(addon.isEmpty()){
            return "Addon not found";
        }
        addonRepository.deleteById(id);
        return "Addon Deleted";
    }

    public String deleteFood(int id){
        Optional<FoodModel> food = foodRepository.findById(id);
        if(food.isEmpty()){
            return "Food not found";
        }
        foodRepository.deleteById(id);
        return "Food Deleted";
    }
}
