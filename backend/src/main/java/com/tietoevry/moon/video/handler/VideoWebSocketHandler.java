package com.tietoevry.moon.video.handler;

import com.google.gson.Gson;
import com.tietoevry.moon.classroom.ClassroomService;
import com.tietoevry.moon.classroom.model.Classroom;
import com.tietoevry.moon.lesson.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
public class VideoWebSocketHandler extends TextWebSocketHandler {
    @Autowired
    ClassroomService classroomService;
    private static final List<WebSocketSession> webSocketSessions = new ArrayList<>();

    private String username;
    private Map messageContent;
    private String classroomName;

    public void handleTextMessage(WebSocketSession session, TextMessage message)
        throws InterruptedException, IOException {
        Map messageContent = new Gson().fromJson(message.getPayload(), Map.class);
        classroomName = String.valueOf(messageContent.get("classroom"));
        username = session.getPrincipal().getName();

        System.out.println(username);
        Classroom classroom = classroomService.findClassroomByName(classroomName);
        System.out.println(classroom.getClassName());
        for (WebSocketSession webSocketSession : webSocketSessions) {


            //  if (webSocketSession != session) {
            if (classroom
                .getUser()
                .stream()
                .anyMatch(student -> student
                    .getUsername()
                    .contains(username))) {
                webSocketSession.sendMessage(message);
                //}
            }
        }
    }


    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("Remove session called");
        webSocketSessions.remove(session);
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        webSocketSessions.add(session);
        System.out.println(session.getPrincipal().getName());
        System.out.println("Something happened");
    }
}

