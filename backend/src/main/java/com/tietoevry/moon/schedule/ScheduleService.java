package com.tietoevry.moon.schedule;

import com.tietoevry.moon.schedule.model.dto.ScheduleDto;
import com.tietoevry.moon.session.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private SessionService sessionService;

    public List<ScheduleDto> getSchedule() {
        return scheduleRepository
            .findAll()
            .stream()
            .map(ScheduleMapper::mapScheduleDto)
            .collect(Collectors.toList());
    }
}
