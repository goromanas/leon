package com.tietoevry.moon.schedule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.concurrent.ConcurrentTaskScheduler;
import org.springframework.stereotype.Service;
import com.tietoevry.moon.websocket.handler.WebSocketHandler;
import org.springframework.web.socket.TextMessage;
import com.tietoevry.moon.schedule.ScheduleService;

@Service
public class SchedulerService {

    @Autowired
    private WebSocketHandler webSocketHandler;
    @Autowired
    private ScheduleService scheduleService;

    private String currentLesson;

    @Scheduled(fixedDelay = 1000 * 1)
    public void scheduleFixedDelayTask() throws Exception {
        currentLesson = Integer.toString(scheduleService.currentLessonNumber());
        webSocketHandler.handleTextMessage(new TextMessage(currentLesson));

    }

    @Bean
    public TaskScheduler taskScheduler() {
        return new ConcurrentTaskScheduler(); //single threaded by default
    }
}
