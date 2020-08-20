package com.tietoevry.moon.chat.handler;

import com.google.gson.Gson;
import com.tietoevry.moon.chat.ChatService;
import com.tietoevry.moon.chat.model.ChatMessages;
import com.tietoevry.moon.classroom.ClassroomService;
import com.tietoevry.moon.classroom.model.Classroom;
import com.tietoevry.moon.lesson.LessonRepository;
import com.tietoevry.moon.user.RoleRepository;
import com.tietoevry.moon.user.UserRepository;
import com.tietoevry.moon.user.UserService;
import com.tietoevry.moon.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import static java.lang.Math.round;

@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {

    private static final List<WebSocketSession> webSocketSessions = new ArrayList<>();

    private String username;
    private Map messageContent;
    private String classroomFromMessage;
    private int channelFromMessage;

    @Autowired
    LessonRepository lessonRepository;

    @Autowired
    ClassroomService classroomService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    ChatService chatService;

    public ChatWebSocketHandler() {
    }


    public void handleTextMessage(WebSocketSession session, TextMessage message)
        throws InterruptedException, IOException {

        Map messageContent = new Gson().fromJson(message.getPayload(), Map.class);
        channelFromMessage = Integer.parseInt(String.valueOf(round(Float.parseFloat(String.valueOf(messageContent.get("channel"))))));
        classroomFromMessage = String.valueOf(messageContent.get("classroom"));

        chatService.saveChatMessage(chatMessageToSave(
            channelFromMessage,
            classroomFromMessage,
            String.valueOf(messageContent.get("author")),
            String.valueOf(messageContent.get("text"))
        ));

        if (String.valueOf(messageContent.get("role")).contains("STUDENT")) {
            Classroom classroom = classroomService.findClassroomByName(classroomFromMessage);

        for (WebSocketSession webSocketSession : webSocketSessions) {
            username = webSocketSession.getPrincipal().getName();

            if (webSocketSession != session) {

                if (userService.findByUsername(username).getRole().contains("TEACHER")) {
                    webSocketSession.sendMessage(message);
                }

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

    private ChatMessages chatMessageToSave(int channel, String classname, String username, String content) {
        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date(System.currentTimeMillis());
        return ChatMessages.builder()
            .channel(channel)
            .classname(classname)
            .username(username)
            .content(content)
            .date(date)
            .build();
    }
}

