package com.main.happyhub_backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.main.happyhub_backend.model.AddonModel;
import com.main.happyhub_backend.model.AdminModel;
import com.main.happyhub_backend.model.FoodModel;
import com.main.happyhub_backend.model.ThemeModel;
import com.main.happyhub_backend.service.AdminService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;






@RestController
@CrossOrigin
public class AdminController {

    @Autowired
    AdminService adminService;

    @GetMapping("/get-admin/{id}")
    public Optional<AdminModel> getAdmin(@PathVariable int id) {
        return adminService.getAdmin(id);
    }

    @GetMapping("/admin/get-themes/{email}")
    public List<ThemeModel> getThemesByAdmin(@PathVariable String email) {
        return adminService.getThemesByAdmin(email);
   
    }

    @GetMapping("/admin/get-addons/{email}")
    public List<AddonModel> getAddonsByAdmin(@PathVariable String email) {
        return adminService.getAddOnsByAdmin(email);
   
    }
    
    @GetMapping("/admin/get-foods/{email}")
    public List<FoodModel> getFoodByAdmin(@PathVariable String email) {
        return adminService.getFoodByAdmin(email);
   
    }

    @GetMapping("/admin/get-all-themes")
    public List<ThemeModel> getAllThemes() {
        return adminService.getAllThemes();
    }
    
    @GetMapping("/admin/get-all-foods")
    public List<FoodModel> getAllFoods() {
        return adminService.getAllFoods();
    }
   
    @GetMapping("/admin/get-all-addons")
    public List<AddonModel> getAllAddons() {
        return adminService.getAllAddOnds();
    }
    
    @GetMapping("/admin/get-theme/{id}")
    public ThemeModel getThemeById(@PathVariable int id) {
        return adminService.getThemeById(id);
    }

    @GetMapping("/admin/get-addon/{id}")
    public AddonModel getAddonById(@PathVariable int id) {
        return adminService.getAddOnById(id);
    }
    
    @GetMapping("/admin/get-food/{id}")
    public FoodModel getFoodById(@PathVariable int id) {
        return adminService.getFoodById(id);
    }
    
    @GetMapping("/get-booked-food/{pattern}")
    public List<FoodModel> getMethodName(@PathVariable String pattern) {
        return adminService.getFoodById(pattern);
    }
    


    @PostMapping("/admin/add-theme/{email}")
    public String postTheme(@PathVariable String email,@RequestBody ThemeModel themeModel) {
        return adminService.addTheme(email, themeModel);
    }
    
    @PostMapping("/admin/add-addons/{email}")
    public String postAddons(@PathVariable String email,@RequestBody AddonModel addonModel) {
        return adminService.addAddOns(email, addonModel);
    }
    
    @PostMapping("/admin/add-foods/{email}")
    public String postFood(@PathVariable String email,@RequestBody FoodModel addonModel) {
        return adminService.addFood(email, addonModel);
    }
    

    @PutMapping("admin/update")
    public String putMethodName( @RequestBody AdminModel entity) {
        return adminService.updateAdmin(entity);
    }
    
    @PutMapping("admin/update-theme")
    public String updateTheme(@RequestBody ThemeModel entity) {
        return adminService.updateThemes(entity);
    }
    
    @PutMapping("admin/update-addon")
    public String updateAddons(@RequestBody AddonModel entity) {
        return adminService.updateAddon(entity);
    }
    
    @PutMapping("admin/update-food")
    public String updateFood(@RequestBody FoodModel entity) {
        return adminService.updateFood(entity);
    }

    @DeleteMapping("admin/delete-theme/{id}")
    public String deleteTheme(@PathVariable int id) {
        return adminService.deleteTheme(id);
    }

    @DeleteMapping("admin/delete-addon/{id}")
    public String deleteAddon(@PathVariable int id){
        return adminService.deleteAddon(id);
    }

    @DeleteMapping("admin/delete-food/{id}")
    public String deleteFood(@PathVariable int id){
        return adminService.deleteFood(id);
    }
}
