package com.main.happyhub_backend.dto.response;

import java.util.List;
import com.main.happyhub_backend.model.AddonModel;
import com.main.happyhub_backend.model.EventModel;
import com.main.happyhub_backend.model.FoodModel;
import com.main.happyhub_backend.model.ThemeModel;
import com.main.happyhub_backend.model.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventResponse {
    private User user;
    private EventModel event;
    private ThemeModel theme;
    private AddonModel addon;
    private List<FoodModel> food;
}
