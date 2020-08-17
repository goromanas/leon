package com.tietoevry.moon.schedule;

import com.tietoevry.moon.schedule.model.dto.ScheduleDto;
import com.tietoevry.moon.session.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
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

    public int currentLessonNumber(List<ScheduleDto> schedule) {

        LocalTime currentTime = LocalTime.now();
        for (ScheduleDto item : schedule) {
            LocalTime startTimeValue = LocalTime.parse(item.startTime).minus(10, ChronoUnit.MINUTES);
            LocalTime endTimeValue = LocalTime.parse(item.endTime);
            if (currentTime.isAfter(startTimeValue) && currentTime.isBefore(endTimeValue)) {
                return Math.toIntExact(item.id);
            }
        }


        return 0;
    }
}
