package com.tietoevry.moon.schedule.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ScheduleDto {
    public Long id;
    public String startTime;
    public String endTime;
}
