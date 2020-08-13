package com.tietoevry.moon.schedule.websocket;

import com.tietoevry.moon.schedule.websocket.handler.WebSocketHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new WebSocketHandler(), "/ws/currentLesson")
        .setAllowedOrigins("*");
    }

//    @Bean
//    public WebSocketHandler getWebSocketHandler() {
//        return new WebSocketHandler();
//    }
}
