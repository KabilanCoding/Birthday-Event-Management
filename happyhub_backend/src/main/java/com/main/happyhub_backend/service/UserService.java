package com.main.happyhub_backend.service;

import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.main.happyhub_backend.dto.response.EventResponse;
import com.main.happyhub_backend.model.AddonModel;
import com.main.happyhub_backend.model.EventModel;
import com.main.happyhub_backend.model.FoodModel;
import com.main.happyhub_backend.model.ThemeModel;
import com.main.happyhub_backend.model.User;
import com.main.happyhub_backend.model.UserModel;
import com.main.happyhub_backend.repository.AddonRepository;
import com.main.happyhub_backend.repository.EventRepository;
import com.main.happyhub_backend.repository.FoodRepository;
import com.main.happyhub_backend.repository.ThemeRepository;
import com.main.happyhub_backend.repository.UserModelRepository;
import com.main.happyhub_backend.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    UserModelRepository userRepository;
    @Autowired
    UserRepository userRepo;
    @Autowired
    EventRepository eventRepository;
    @Autowired
    ThemeRepository themeRepository;
    @Autowired
    AddonRepository addonRepository;
    @Autowired
    FoodRepository foodRepository;

    public String addUser(UserModel userModel) {
        userRepository.save(userModel);
        return "Successfully added";
    }

    public Optional<UserModel> getUser(String email){
        return userRepository.findByUserEmail(email);
    }

    public List<UserModel> getAllUser(){
        return userRepository.findAll();
    }

    public String updateUserModel(UserModel userModel){
        Optional<User> user = userRepo.findByEmail(userModel.getUser().getEmail());
        System.out.println(user);
        if(user.isEmpty()){
            return "User Not Found";
        }
        user.get().setName(userModel.getUser().getName());
        userRepo.save(user.get());
        Optional<UserModel> userModelRepo = userRepository.findByUser(user.get());
        userModelRepo.get().setMobileNumber(userModel.getMobileNumber());
        userRepository.save(userModelRepo.get());
        return "Updated Successfully";
    }

    public String addEvent(String email,EventModel event){
        Optional<UserModel> userModel = userRepository.findByUserEmail(email);
        if(userModel.isEmpty()){
            return "User not found";
        }
        event.setUserModel(userModel.get());
        eventRepository.save(event);
        return "Event Added Successfully";
    }

    public List<EventResponse> getEventsBookedByUser(String email) {
        Optional<UserModel> userOptional = userRepository.findByUserEmail(email);
            UserModel user = userOptional.get();
            List<EventResponse> events = new ArrayList<>();
            for(EventModel i : user.getEvents()){
                events.add(getEventById(i.getEventId()));
            }
        return events;
    }

    public EventResponse getEventById(int eventId){
        EventResponse eventResponse = new EventResponse();
        EventModel event = eventRepository.findById(eventId).get();
        eventResponse.setEvent(event);
        AddonModel addon = addonRepository.findById(event.getAddon()).get();
        eventResponse.setAddon(addon);
        ThemeModel theme = themeRepository.findById(event.getEventTheme()).get();
        eventResponse.setTheme(theme);
        List<FoodModel> food = new ArrayList<FoodModel>();
        for(String i : event.getEventFoodId().split("-")){
            food.add(foodRepository.findById(Integer.parseInt(i)).get());
        }
        eventResponse.setFood(food);
        eventResponse.setUser(event.getUserModel().getUser());
        return eventResponse;
    }

    public List<EventResponse> getEvents(){
        List<EventResponse> events = new ArrayList<EventResponse>();
        List<EventModel> event = eventRepository.findAll();
        for(EventModel i : event){
            events.add(getEventById(i.getEventId()));
        }
        return events;
    }

    public String updateEvent(EventModel eventModel){
        Optional<EventModel> event = eventRepository.findById(eventModel.getEventId());
        if(event.isEmpty()){
            return "Event does not exist";
        }
        event.get().setEventName(eventModel.getEventName());
        event.get().setApplicantAddress(eventModel.getApplicantAddress());
        event.get().setAttendees(eventModel.getAttendees());
        event.get().setApplicantMobile(eventModel.getApplicantMobile());
        event.get().setReference(eventModel.getReference());
        event.get().setEventAddress(eventModel.getEventAddress());
        event.get().setEventDescription(eventModel.getEventDescription());
        event.get().setEventDate(eventModel.getEventDate());
        event.get().setEventTime(eventModel.getEventTime());
        // event.get().setEventThemeId(eventModel.getEventThemeId());
        event.get().setEventFoodId(eventModel.getEventFoodId());
        // event.get().setAddonId(eventModel.getAddonId());
        event.get().setEventCost(eventModel.getEventCost());
        eventRepository.save(event.get());
        return "Event updated successfully";
    }
    

    public String deleteEvent(int id){
        eventRepository.deleteById(id);
        return "Event deleted successfully";
    }
}
