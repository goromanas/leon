package com.tietoevry.moon.schedule;

import com.tietoevry.moon.authorization.SecurityContextService;
import com.tietoevry.moon.schedule.model.dto.ScheduleDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
