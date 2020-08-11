package com.tietoevry.moon.websocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class CurrentLessonController {


    @SendTo("/currentLesson")
    public Greeting greeting(Greeting message) throws Exception {
        return message;
    }

}
