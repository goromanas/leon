package com.tietoevry.moon.chat;

import com.tietoevry.moon.chat.model.ChatMessages;
import com.tietoevry.moon.chat.model.Dto.ChatMessagesDto;

public class ChatMessagesMapper {
    public static ChatMessagesDto chatMessagesDto (ChatMessages chatMessages) {
        ChatMessagesDto chatMessagesDto = new ChatMessagesDto();
        chatMessagesDto.setAuthor(chatMessages.getAuthor());
        chatMessagesDto.setContent(chatMessages.getContent());
        chatMessagesDto.setDate(chatMessages.getDate());
return chatMessagesDto;

    }
}
