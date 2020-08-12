package com.tietoevry.moon.schedule;

import com.tietoevry.moon.authorization.SecurityContextService;
import com.tietoevry.moon.schedule.model.dto.ScheduleDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController

public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @Autowired
    public SecurityContextService securityContextService;

    @RequestMapping(path = "/schedule", method = RequestMethod.GET)
    public List<ScheduleDto> getSchedule() {
        return scheduleService.getSchedule();
    }

}
