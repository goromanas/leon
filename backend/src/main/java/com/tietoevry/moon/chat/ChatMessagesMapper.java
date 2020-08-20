package com.tietoevry.moon.chat;

import com.tietoevry.moon.chat.model.ChatMessages;
import com.tietoevry.moon.chat.model.Dto.ChatMessagesDto;

public class ChatMessagesMapper {

    public static ChatMessagesDto mapChatMessagesDto (ChatMessages chatMessages) {
        ChatMessagesDto chatMessagesDto = new ChatMessagesDto();
        chatMessagesDto.setId(chatMessages.getId());
        chatMessagesDto.setChannel(chatMessages.getChannel());
        chatMessagesDto.setClassname(chatMessages.getClassname());
        chatMessagesDto.setUsername(chatMessages.getUsername());
        chatMessagesDto.setContent(chatMessages.getContent());
        chatMessagesDto.setDate(chatMessages.getDate());
return chatMessagesDto;

    }
}
