package com.tietoevry.moon.chat.handler;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {

    private static final List<WebSocketSession> webSocketSessions = new ArrayList<>();

    public void handleTextMessage(WebSocketSession session, TextMessage message)
        throws InterruptedException, IOException {
        System.out.println("Received a messaged");
        for (WebSocketSession webSocketSession: webSocketSessions) {
            webSocketSession.sendMessage(message);
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
        System.out.println("Someone connected to chat");
    }
}

