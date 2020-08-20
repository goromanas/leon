package com.tietoevry.moon.video.handler;

import com.google.gson.Gson;
import com.tietoevry.moon.classroom.ClassroomService;
import com.tietoevry.moon.classroom.model.Classroom;
import com.tietoevry.moon.lesson.LessonRepository;
import com.tietoevry.moon.user.UserService;
import com.tietoevry.moon.user.model.User;
import com.tietoevry.moon.user.model.dto.UserDto;
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
    @Autowired
    UserService userService;
    private static final List<WebSocketSession> webSocketSessions = new ArrayList<>();

    public void handleTextMessage(WebSocketSession session, TextMessage message)
        throws InterruptedException, IOException {
        System.out.println(message.getPayload().toString());
        Map messageContent = new Gson().fromJson(message.getPayload(), Map.class);
        String type = String.valueOf(messageContent.get("type"));
        System.out.println(type);
        if (type.equals("question")) {
            handleQuestion(message, session);
        } else {
            handleAnswer(message, session);
        }

    }

    private void handleAnswer(TextMessage message, WebSocketSession session) throws IOException {
        Map messageContent = new Gson().fromJson(message.getPayload(), Map.class);
        String name = String.valueOf(messageContent.get("teacherUsername"));
        UserDto teacher = userService.findByUsername(name);
        for (WebSocketSession webSocketSession : webSocketSessions) {

            if (teacher.getUsername() == webSocketSession.getPrincipal().getName()) {//  if (webSocketSession != session) {
                System.out.println(teacher.getUsername());
                webSocketSession.sendMessage(message);
            }//}
        }

    }

    private void handleQuestion(TextMessage message, WebSocketSession session) throws IOException {
        Map messageContent = new Gson().fromJson(message.getPayload(), Map.class);
        String classroomName = String.valueOf(messageContent.get("classroom"));
        String username = session.getPrincipal().getName();

      //  System.out.println(username);
        Classroom classroom = classroomService.findClassroomByName(classroomName);
        for (WebSocketSession webSocketSession : webSocketSessions) {
            //  if (webSocketSession != session) {
            if (classroom
                .getUser()
                .stream()
                .anyMatch(student -> student
                    .getUsername()
                    .contains(webSocketSession.getPrincipal().getName()))) {
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
    //    System.out.println(session.getPrincipal().getName());
    //    System.out.println("Something happened");
    }
}
