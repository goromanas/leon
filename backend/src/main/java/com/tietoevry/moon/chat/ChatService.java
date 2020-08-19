package com.tietoevry.moon.chat;

import com.tietoevry.moon.chat.model.ChatMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    @Autowired
    ChatMessagesRepository chatMessagesRepository;

    public void saveChatMessage (ChatMessages chatMessages) {
        chatMessagesRepository.save(chatMessages);

    }
}
