package com.tietoevry.moon.chat;

import com.tietoevry.moon.chat.model.ChatMessages;
import com.tietoevry.moon.chat.model.Dto.ChatMessagesDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {

    @Autowired
    ChatMessagesRepository chatMessagesRepository;

    public void saveChatMessage (ChatMessages chatMessages) {
        chatMessagesRepository.save(chatMessages);
    }

    public List<ChatMessagesDto> getChatMessages() {
        return chatMessagesRepository
            .findAll()
            .stream()
            .map(ChatMessagesMapper::mapChatMessagesDto)
            .collect(Collectors.toList());
    }
}
