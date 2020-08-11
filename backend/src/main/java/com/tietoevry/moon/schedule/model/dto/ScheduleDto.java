package com.tietoevry.moon.schedule.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ScheduleDto {
    private Long id;
    private String startTime;
    private String endTime;
}
