package com.tietoevry.moon.video;

import com.tietoevry.moon.video.handler.VideoWebSocketHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class VideoWebSocketConfig implements WebSocketConfigurer {
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new VideoWebSocketHandler(), "/ws/lessonQuiz")
            .setAllowedOrigins("*");
    }

//    @Bean
//    public WebSocketHandler getWebSocketHandler() {
//        return new WebSocketHandler();
//    }
}
