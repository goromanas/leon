package com.tietoevry.moon.schedule;

import com.tietoevry.moon.schedule.model.Schedule;
import com.tietoevry.moon.schedule.model.dto.ScheduleDto;

public class ScheduleMapper {

    public static ScheduleDto mapScheduleDto(Schedule schedule) {
        ScheduleDto scheduleDto = new ScheduleDto();
        scheduleDto.setId(schedule.getId());
        scheduleDto.setStartTime(schedule.getStartTime());
        scheduleDto.setEndTime(schedule.getEndTime());
        return scheduleDto;
    }
}
