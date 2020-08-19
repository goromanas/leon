package com.tietoevry.moon.chat.handler;

import com.google.gson.Gson;
import com.tietoevry.moon.classroom.ClassroomService;
import com.tietoevry.moon.classroom.model.Classroom;
import com.tietoevry.moon.lesson.LessonRepository;
import com.tietoevry.moon.lesson.model.Lesson;
import com.tietoevry.moon.user.model.User;
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
public class ChatWebSocketHandler extends TextWebSocketHandler {

    private static final List<WebSocketSession> webSocketSessions = new ArrayList<>();

    private String username;
    private Map messageContent;
    private String classroomFromMessage;
    private String role;

    @Autowired
    LessonRepository lessonRepository;

    @Autowired
    ClassroomService classroomService;


    public void handleTextMessage(WebSocketSession session, TextMessage message)
        throws InterruptedException, IOException {


        Map messageContent = new Gson().fromJson(message.getPayload(), Map.class);
        classroomFromMessage = String.valueOf(messageContent.get("classroom"));

        if (String.valueOf(messageContent.get("role")).contains("STUDENT")) {
            Classroom classroom = classroomService.findClassroomByName(classroomFromMessage);

        for (WebSocketSession webSocketSession : webSocketSessions) {
            username = webSocketSession.getPrincipal().getName();

            if (webSocketSession != session) {

                List<User> users = classroom.getUser();
                Boolean sendMessage = users.stream().anyMatch(student -> student.getUsername().equals(username));
                if (sendMessage) {
                    System.out.println("sending message");
                    webSocketSession.sendMessage(message);
                }
            }
        }
        }
        else if (String.valueOf(messageContent.get("role")).contains("TEACHER")) {
            for (WebSocketSession webSocketSession : webSocketSessions) {
                username = webSocketSession.getPrincipal().getName();

                if (webSocketSession != session) {
                    webSocketSession.sendMessage(message);
                }
            }
        }
    }


    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        webSocketSessions.remove(session);
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        webSocketSessions.add(session);
    }
}

