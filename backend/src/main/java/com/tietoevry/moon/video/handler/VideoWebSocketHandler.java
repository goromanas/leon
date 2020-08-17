package com.tietoevry.moon.video.handler;

import com.google.gson.Gson;
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

    private static final List<WebSocketSession> webSocketSessions = new ArrayList<>();

    private String username;
    private Map messageContent;
    private String lessonIdFromMessage;

    @Autowired
    LessonRepository lessonRepository;

    public void handleTextMessage(WebSocketSession session, TextMessage message)
        throws InterruptedException, IOException {
System.out.println("hello");
System.out.println(message.getPayload().toString());


//        Map messageContent = new Gson().fromJson(message.getPayload(), Map.class);
//
//        System.out.println(messageContent.get("classroom"));
//
//        lessonIdFromMessage = String.valueOf(messageContent.get("classroom"));
//
//        for (WebSocketSession webSocketSession : webSocketSessions) {
//
//            username = session.getPrincipal().getName();
//
//
//            if (webSocketSession != session) {
//////               Lesson lesson = lessonRepository.findById((long) 1)
////                    .orElseThrow(()-> new Error());
////               lesson.getClassroom().getUser().stream().filter(student ->
////               {
////                   if (student.getUsername().equals("ddd")){
////                       //
////                   }
////
////               });
//                webSocketSession.sendMessage(message);
//            }
//        }
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

