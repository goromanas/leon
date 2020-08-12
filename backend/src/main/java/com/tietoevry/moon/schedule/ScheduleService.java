package com.tietoevry.moon.schedule;

import com.tietoevry.moon.schedule.model.dto.ScheduleDto;
import com.tietoevry.moon.session.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
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

    public int currentLessonNumber() {

        String strDateFormat = "HH:mm:ss";
        List<ScheduleDto> schedule = getSchedule();

        DateFormat timeFormat = new SimpleDateFormat(strDateFormat);
        Date dateTenMinutesBack = new Date(System.currentTimeMillis() + 60 * 1000 * 10);
        Date date = new Date();

        for (ScheduleDto item: schedule) {
            try {
                java.sql.Time startTimeValue = new java.sql.Time(timeFormat.parse(item.startTime).getTime());
                java.sql.Time endTimeValue = new java.sql.Time(timeFormat.parse(item.endTime).getTime());
                String currentTimeValueForParseTenMinutesBack = timeFormat.format(dateTenMinutesBack);
                String currentTimeValueForParse = timeFormat.format(date);
                java.sql.Time currentTimeValueTenMinutesBack = new java.sql.Time(timeFormat.parse(currentTimeValueForParseTenMinutesBack).getTime());
                java.sql.Time currentTimeValue = new java.sql.Time(timeFormat.parse(currentTimeValueForParse).getTime());

                if (currentTimeValueTenMinutesBack.after(startTimeValue) && currentTimeValue.before(endTimeValue)) {
                    return Math.toIntExact(item.id);
               }
            } catch (ParseException e) {
                e.printStackTrace();
            }
        };

        return 0;
    }
}
